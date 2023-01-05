import { NextApiRequest, NextApiResponse } from "next";

export default interface ContextType {
  req: NextApiRequest;
  res: NextApiResponse;
}
