import { readFileSync } from "fs";
import { createYoga, createSchema } from "graphql-yoga";

const typeDefs = readFileSync("pages/api/schemas/schema.graphql", {
  encoding: "utf-8",
});

const resolvers = {
  Query: {
    articles() {
      return [{ title: "Nextjs" }];
    },
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
});
