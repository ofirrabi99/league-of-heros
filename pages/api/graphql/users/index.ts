import { readFileSync } from "fs";
import resolvers from "./users.resolver";

const typeDefs = readFileSync(
  "./pages/api/graphql/users/users.schema.graphql",
  {
    encoding: "utf-8",
  }
);

export { typeDefs, resolvers };
