import { Arg, Mutation, Query, Resolver, Ctx, Authorized } from "type-graphql";
import { GraphQLError } from "graphql";
import User, {
  LoginInput,
  NewUserInput,
  ResetPasswordInput,
  ResetPasswordRequestInput,
  UserRoleEnum,
} from "../entities/User";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Context } from "../types";
import { verify, hash } from "argon2";
import mailer from "../mailer";
import env from "../env";
import { In } from "typeorm";

@Resolver()
class UserResolver {
  @Authorized([UserRoleEnum.Admin])
  @Query(() => [User])
  async musicians(
    @Arg("instrumentTypeId", { nullable: true }) instrumentTypeIds?: string
  ) {
    const users = await User.find({
      relations: { instrumentTypes: true },
      where: {
        instrumentTypes: {
          id:
            typeof instrumentTypeIds === "string" &&
            instrumentTypeIds.length > 0
              ? In(instrumentTypeIds.split(",").map((t) => parseInt(t, 10)))
              : undefined,
        },
      },
    });
    if (users.length > 0) {
      return users;
    } else {
      throw new GraphQLError("Users not found");
    }
  }

  @Authorized([UserRoleEnum.Admin])
  @Mutation(() => User)
  async createUser(
    @Arg("data", { validate: true }) data: NewUserInput,
  ) {
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser !== null) throw new GraphQLError("EMAIL_ALREADY_TAKEN");

    const newUser = new User();
    Object.assign(newUser, data);

    const token = crypto.randomBytes(20).toString("hex");
    newUser.passwordInitializeToken = token;

    await mailer.sendMail({
      from: env.EMAIL_FROM,
      to: newUser.email,
      subject: "Création de compte Musique à tout va",
      text: `Salut ${newUser.firstName} ! Je viens de créer ton compte sur Musique à tout va. Pour initialiser ton mot de passe, clique sur ce lien: ${env.FRONTEND_URL}?passwordToken=${token}`,
    });

    const newUserWithId = await newUser.save();
    return newUserWithId;
  }

  @Mutation(() => String)
  async login(@Arg("data") data: LoginInput, @Ctx() ctx: Context) {
    let findUser = await User.findOneBy({ email: data.email });
    if (findUser === null) throw new GraphQLError("Invalid Credentials");
    if (!findUser.isPasswordInitialized)
      throw new GraphQLError("Password not initialized");
    const passwordVerified = await verify(
      findUser.hashedPassword,
      data.password
    );
    if (!passwordVerified) throw new GraphQLError("Invalid Credentials");

    const token = jwt.sign(
      {
        userId: findUser.id,
        role: findUser.role,
      },
      env.JWT_PRIVATE_KEY,
      { expiresIn: "30d" }
    );

    ctx.res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: env.NODE_ENV === "development",
    });

    return token;
  }

  @Mutation(() => String)
  async logout(@Ctx() ctx: Context) {
    ctx.res.clearCookie("token");
    return "ok";
  }

  @Mutation(() => Boolean)
  async initializePassword(
    @Arg("data", { validate: true }) data: ResetPasswordInput,
    @Arg("passwordToken") token: string
  ) {
    const user = await User.findOneBy({ passwordInitializeToken: token });
    if (!user) throw new GraphQLError("Invalid Token");
    user.hashedPassword = await hash(data.password);
    user.passwordInitializeToken = null;
    user.isPasswordInitialized = true;
    return user.save().then(() => true);
  }

  @Mutation(() => Boolean)
  async resetPasswordRequest(@Arg("data") data: ResetPasswordRequestInput) {
    const user = await User.findOneBy({ email: data.email });
    if (!user) throw new GraphQLError("Invalid email address");
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.save();

    await mailer.sendMail({
      from: env.EMAIL_FROM,
      to: user.email,
      subject: "Musique à tout va : mot de passe oublié",
      text: `Pour réinitialiser ton mot de passe, merci de cliquer sur le lien suivant : ${env.FRONTEND_URL}?resetPasswordToken=${user.resetPasswordToken}`,
    });

    return true;
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Arg("data", { validate: true }) data: ResetPasswordInput,
    @Arg("resetPasswordToken") token: string
  ) {
    const user = await User.findOneBy({ resetPasswordToken: token });
    if (!user) throw new GraphQLError("Invalid Token");
    user.hashedPassword = await hash(data.password);
    user.resetPasswordToken = null;
    return user.save().then(() => true);
  }
}

export default UserResolver;
