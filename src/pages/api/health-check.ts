import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "./graphql";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  return res.status(200).send("Success");
}
