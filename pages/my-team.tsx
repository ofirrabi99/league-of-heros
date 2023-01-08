import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { UserCredentials } from "../types/auth0-types";
import type User from "./api/graphql/user/user.model";
import client, { injectCookies } from "../lib/apolloClient";
import { GET_USER } from "../queries/user";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    injectCookies(ctx.req.headers.cookie);

    const {
      data: { user },
    } = await client.query({
      query: GET_USER,
    });

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
  return (
    <></>
    // <Page title="MY TEAM">
    //   <h2 className={styles.mainPrimary}>Hey, {user.coachName}!</h2>
    //   <p className={styles.mainPrimary}>
    //     This is your team for the upcoming game day:
    //   </p>
    //   <br />
    //   <h2 className={styles.headerPrimary}>{user.teamName}</h2>
    //   <br />
    //   <Lineup />
    // </Page>
  );
}
