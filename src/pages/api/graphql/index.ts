import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { createYoga } from "graphql-yoga";
import { Container } from "typedi";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./features/user/user.resolver";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { TeamResolver } from "./features/team/team.resolver";
import { GameResolver } from "./features/games/game.resolver";
import { CheckRole } from "./middlewares/CheckRole";
import { CycleResolver } from "./features/cycles/cycle.resolver";

async function dbConnect() {
  console.time("db");
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  mongoose.set("strictQuery", false);
  mongoose.set("runValidators", true);

  if (mongoose.connections[0].readyState) {
    console.timeEnd("db");
    return;
  } else {
    await mongoose.connect(MONGODB_URI);
    console.timeEnd("db");
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  console.time("schema");
  const schema = await buildSchema({
    container: Container,
    resolvers: [UserResolver, TeamResolver, GameResolver, CycleResolver],
    validate: {
      forbidUnknownValues: false,
    },
    authChecker: CheckRole,
  });
  console.timeEnd("schema");

  await createYoga({
    schema,
    graphqlEndpoint: "/api/graphql",
  })(req, res);
}

// export default withApiAuthRequired(handler);

export default handler;
