import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import { authChecker } from "./auth";
import InstrumentTypeResolver from "./resolvers/InstrumentTypeResolver";

export default buildSchema({
  resolvers: [UserResolver, InstrumentTypeResolver],
  authChecker,
}
);
