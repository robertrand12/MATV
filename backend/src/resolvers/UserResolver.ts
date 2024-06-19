import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import User, { NewUserInput } from "../entities/User";
import crypto from "crypto";

@Resolver()
class UserResolver {
  @Query(() => [User])
  async userList() {
    const users = await User.find({ relations: { instrumentTypes: true, events: true } });
    if (users.length > 0) {
      return users;
    } else {
      throw new GraphQLError("Users not found");
    }
  }

  @Mutation(() => User)
  async createUser(@Arg("data", { validate: true }) data: NewUserInput) {
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser !== null) throw new GraphQLError("EMAIL_ALREADY_TAKEN");

    const newUser = new User();
    Object.assign(newUser, data);

    const tmpPassword = crypto.randomBytes(8).toString("hex");
    console.log(tmpPassword);
    newUser.password = tmpPassword;

    const newUserWithId = await newUser.save();
    return newUserWithId;
  }
}

export default UserResolver;
