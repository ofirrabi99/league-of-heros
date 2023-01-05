import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import styles from "../../styles/pages/admin/teams.module.scss";
import { UserCredentials } from "../../types/auth0-types";
import Page from "../../components/layout/page/Page";
import type User from "../api/graphql/user/user.model";
import client, { injectCookies } from "../../lib/apolloClient";
import { GET_USER } from "../../queries/user";
import EditOrAddTeamForm from "../../components/admin/editOrAddTeamForm/EditOrAddTeamForm";

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

export default function AdminTeams({ data: user }: Props) {
  return (
    <Page title="ADMIN - TEAMS">
      <h2 className={styles.mainPrimary}>Hey, {user.coachName}!</h2>
      <p className={styles.mainPrimary}>
        Here you can edit or add teams to the system.
      </p>
      <br />
      <EditOrAddTeamForm />
    </Page>
  );
}
