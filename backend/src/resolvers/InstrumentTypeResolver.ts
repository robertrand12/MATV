import { Query, Resolver, Authorized } from "type-graphql";
import { GraphQLError } from "graphql";
import User, { UserRoleEnum } from "../entities/User";
import InstrumentType from "../entities/InstrumentType";

@Resolver()
class InstrumentTypeResolver {
  @Authorized([UserRoleEnum.Admin])
  @Query(() => [InstrumentType])
  async instrumentTypes() {
    const instrumentsTypes = await InstrumentType.find();
    if (instrumentsTypes.length > 0) {
      return instrumentsTypes;
    } else {
      throw new GraphQLError("Instruments types not found");
    }
  }
}

export default InstrumentTypeResolver;
