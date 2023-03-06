import TeamEdit from "../../../components/teams/TeamEdit";
import Page from "../../../components/_layout/Page";
import client from "../../../lib/apolloClient";
import { requireAuth } from "../../../lib/auth0";
import { GET_TEAM } from "../../../queries/team";
import { Team as TeamClass } from "../../api/graphql/features/team/team.model";

interface GetTeamResponse {
  team: TeamClass;
}

interface Props {
  team: GetTeamResponse["team"];
}
export default function AdminTeamsEdit({ team }: Props) {
  return (
    <Page title="Make Quick and Easy Changes to Your Basketball Teams">
      <TeamEdit team={team} />
    </Page>
  );
}

export const getServerSideProps = requireAuth({
  async getServerSideProps(ctx) {
    const { id } = ctx.query;

    // TOOD: Handle error
    const {
      data: { team },
    } = await client.query<GetTeamResponse>({
      query: GET_TEAM,
      variables: { teamId: id },
    });

    return {
      props: { team },
    };
  },
});
