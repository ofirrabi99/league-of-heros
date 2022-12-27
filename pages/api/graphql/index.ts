import { readFileSync } from "fs";
import { createYoga, createSchema } from "graphql-yoga";

const typeDefs = readFileSync("pages/api/graphql/schemas/schema.graphql", {
  encoding: "utf-8",
});

const resolvers = {
  // Query: {
  //   articles() {
  //     return articles;
  //   },
  //   article(_: any, { id }: { id: string }) {
  //     return articles.find((article) => article.id === id);
  //   },
  // },
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
