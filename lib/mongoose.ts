import { connect } from "mongoose";

async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  await connect(MONGODB_URI);
}

export default dbConnect;
