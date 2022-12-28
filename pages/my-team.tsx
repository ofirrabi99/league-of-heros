import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import client from "../lib/apolloClient";
import { GET_USER } from "../queries/user";
import { UserCredentials } from "../types/auth0-types";
import { getUserFromSession } from "../utils/commonFunctions";
import { User } from "../types/graphql-types";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);
    const user = await getUserFromSession(session);

    return {
      props: { data: user },
      ...(!user && { redirect: { destination: "/profile", permanent: false } }),
    };
  },
});

interface Props {
  user: UserCredentials;
  data: User;
}

export default function MyTeam({ data: user }: Props) {
  return <div></div>;
}
