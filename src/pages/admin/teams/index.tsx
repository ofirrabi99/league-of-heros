import { Team as TeamClass } from "../../api/graphql/features/team/team.model";
import Team from "../../../components/teams/Team";
import { requireAuth } from "../../../lib/auth0";
import client from "../../../lib/apolloClient";
import { GET_TEAMS } from "../../../queries/team";
import DynamicList from "../../../components/_shared/DynamicList";
import Page from "../../../components/_layout/Page";

interface GetTeamsResponse {
  teams: TeamClass[];
}

interface Props {
  teams: GetTeamsResponse["teams"];
}

export default function AdminTeams({ teams }: Props) {
  return (
    <Page title="Control Your Teams with Ease">
      <DynamicList maxSize="20rem">
        {teams.map((team) => (
          <Team key={team._id} team={team} />
        ))}
      </DynamicList>
    </Page>
  );
}

export const getServerSideProps = requireAuth({
  async getServerSideProps(_ctx) {
    // TOOD: Handle error
    const {
      data: { teams },
    } = await client.query<GetTeamsResponse>({
      query: GET_TEAMS,
    });

    return {
      props: { teams },
    };
  },
});
