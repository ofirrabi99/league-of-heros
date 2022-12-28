import { Session } from "@auth0/nextjs-auth0";
import client from "../lib/apolloClient";
import { GET_USER } from "../queries/user";
import { UserCredentials } from "../types/auth0-types";

export const getUserFromSession = async (
  session: Session | null | undefined
) => {
  const userCredentials = session?.user as UserCredentials;

  if (userCredentials) {
    const { data } = await client.query({
      query: GET_USER,
      variables: { id: userCredentials.sub },
    });
    return data.user;
  }

  return null;
};
