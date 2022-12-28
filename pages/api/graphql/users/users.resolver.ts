import {
  MutationUserArgs,
  QueryUserArgs,
  User,
} from "../../../../__generated__/resolvers-types";

const users: User[] = [];

const resolvers = {
  Query: {
    user: (_root: any, args: QueryUserArgs, _context: any, _info: any) => {
      return users.find((user) => user.id === args.id);
    },
  },
  Mutation: {
    user: (_root: any, args: MutationUserArgs, _context: any, _info: any) => {
      const newUser = args;
      users.push(newUser);
      return newUser;
    },
  },
};

export default resolvers;
