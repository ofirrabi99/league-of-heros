import "reflect-metadata";
import { createYoga } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import UserResolver from "./user/user.resolver";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "../../../lib/mongoose";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import TeamResolver from "./team/team.resolver";
import GameResolver from "./game/game.resolver";
import PlayerResolver from "./player/player.resolver";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Connect to mongodb
  await mongoose();

  // Create yoga server
  await createYoga({
    schema: await buildSchema({
      resolvers: [UserResolver, TeamResolver, GameResolver, PlayerResolver],
      container: Container,
      validate: {
        forbidUnknownValues: false,
      },
    }),
    graphqlEndpoint: "/api/graphql",
  })(req, res);
});
