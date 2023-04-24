import GameEdit from "../../../components/games/GameEdit";
import Page from "../../../components/_layout/Page";
import useMyQuery from "../../../hooks/useMyQuery";
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

export default function AdminGamesAdd() {
  const teamsResponse = useMyQuery<GetTeamsResponse>(GET_TEAMS);
  const cyclesResponse = useMyQuery<GetCyclesResponse>(GET_ALL_CYCLES);
  return (
    <Page title="Create New League Games Effortlessly">
      <GameEdit
        teams={teamsResponse.data?.teams ?? []}
        cycles={cyclesResponse.data?.cycles ?? []}
      />
    </Page>
  );
}

export const getServerSideProps = requireAuth({ roles: ["Admin"] });
