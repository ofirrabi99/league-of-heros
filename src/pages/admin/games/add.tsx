import GameEdit from "../../../components/games/GameEdit";
import Page from "../../../components/_layout/Page";
import client from "../../../lib/apolloClient";
import { requireAuth } from "../../../lib/auth0";
import { GET_TEAMS } from "../../../queries/team";
import { Team as TeamClass } from "../../api/graphql/features/team/team.model";

interface GetTeamsResponse {
  teams: TeamClass[];
}

interface Props {
  teams: GetTeamsResponse["teams"];
}

export default function AdminGamesAdd({ teams }: Props) {
  return (
    <Page title="Create New League Games Effortlessly">
      <GameEdit teams={teams} />
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
