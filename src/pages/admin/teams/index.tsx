import { Team as TeamClass } from "../../api/graphql/features/team/team.model";
import Team from "../../../components/teams/Team";
import { requireAuth } from "../../../lib/auth0";
import { GET_TEAMS } from "../../../queries/team";
import DynamicList from "../../../components/_shared/DynamicList";
import Page from "../../../components/_layout/Page";
import useMyQuery from "../../../hooks/useMyQuery";
import EmptyState from "../../../components/_shared/EmptyState";

interface GetTeamsResponse {
  teams: TeamClass[];
}

export default function AdminTeams() {
  const { data } = useMyQuery<GetTeamsResponse>(GET_TEAMS);
  return (
    <Page>
      <EmptyState />
      <DynamicList maxSize="20rem">
        {data?.teams.map((team) => (
          <Team key={team._id} team={team} />
        ))}
      </DynamicList>
    </Page>
  );
}

export const getServerSideProps = requireAuth({});
