import { Query, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import User from "../entities/User";

@Resolver()
class UserResolver {
  @Query(() => [User])
  async userList() {
    const users = await User.find()
    if (users.length > 0) {
      return users;
    } else {
      throw new GraphQLError("Users not found");
    }
  }
}

export default UserResolver;
