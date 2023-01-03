import "reflect-metadata";
import { createYoga } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import UserResolver from "./user/user.resolver";

export default createYoga({
  schema: await buildSchema({
    resolvers: [UserResolver],
    container: Container,
    validate: {
      forbidUnknownValues: false,
    },
  }),
  graphqlEndpoint: "/api/graphql",
});
