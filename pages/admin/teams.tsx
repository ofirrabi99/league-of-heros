import client from "../../lib/apolloClient";
import { requireAuth } from "../../lib/auth0";
import { GET_TEAMS } from "../../queries/team";

export const getServerSideProps = requireAuth({
  async getServerSideProps(ctx) {
    const {
      data: { teams },
    } = await client.query({
      query: GET_TEAMS,
    });

    return {
      props: { data: teams },
    };
  },
});

export default function AdminTeams({ teams }: any) {
  console.log(teams);
  return <></>;
}
