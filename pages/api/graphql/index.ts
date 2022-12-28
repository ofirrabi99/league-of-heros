import { createYoga, createSchema } from "graphql-yoga";
import {
  typeDefs as usersTypeDefs,
  resolvers as usersResolvers,
} from "./users";

const initialTypeDefs = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const schema = createSchema({
  typeDefs: [initialTypeDefs, usersTypeDefs],
  resolvers: [usersResolvers],
});

export default createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
});
