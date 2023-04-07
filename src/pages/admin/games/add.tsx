import GameEdit from "../../../components/games/GameEdit";
import Page from "../../../components/_layout/Page";
import client from "../../../lib/apolloClient";
import { requireAuth } from "../../../lib/auth0";
import { GET_ALL_CYCLES } from "../../../queries/cycle";
import { GET_TEAMS } from "../../../queries/team";
import { Cycle } from "../../api/graphql/features/cycles/cycle.model";
import { Team as TeamClass } from "../../api/graphql/features/team/team.model";

interface GetCyclesResponse {
  cycles: Cycle[];
}

interface GetTeamsResponse {
  teams: TeamClass[];
}

interface Props {
  teams: GetTeamsResponse["teams"];
  cycles: GetCyclesResponse["cycles"];
}

export default function AdminGamesAdd({ teams, cycles }: Props) {
  return (
    <Page title="Create New League Games Effortlessly">
      <GameEdit teams={teams} cycles={cycles} />
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

    const {
      data: { cycles },
    } = await client.query<GetCyclesResponse>({
      query: GET_ALL_CYCLES,
    });

    return {
      props: { teams, cycles },
    };
  },
});
