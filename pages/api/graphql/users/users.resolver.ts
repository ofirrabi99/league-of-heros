import { Resolvers, User } from "../../../../types/graphql-types";

const users: User[] = [];

const resolvers: Resolvers = {
  Query: {
    user: (_root, args, _context, _info) => {
      return users.find((user) => user.id === args.id) ?? null;
    },
  },
  Mutation: {
    user: (_root, args, _context, _info) => {
      const newUser = args;
      users.push(newUser);
      return newUser;
    },
  },
};

export default resolvers;
