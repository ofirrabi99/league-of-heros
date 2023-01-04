import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import styles from "../styles/pages/my-team.module.scss";
import { UserCredentials } from "../types/auth0-types";
import { getUserFromSession } from "../utils/commonFunctions";
import Page from "../components/layout/page/Page";
import type User from "./api/graphql/user/user.model";
import Lineup from "../components/player/lineup/Lineup";

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
  return (
    <Page title="MY TEAM">
      <h2 className={styles.mainPrimary}>Hey, {user.coachName}!</h2>
      <p className={styles.mainPrimary}>
        This is your team for the upcoming game day:
      </p>
      <br />
      <h2 className={styles.headerPrimary}>{user.teamName}</h2>
      <br />
      <Lineup />
    </Page>
  );
}
