import { useRouter } from "next/router";
import TeamEdit from "../../../components/teams/TeamEdit";
import Page from "../../../components/_layout/Page";
import useMyQuery from "../../../hooks/useMyQuery";
import { requireAuth } from "../../../lib/auth0";
import { GET_TEAM } from "../../../queries/team";
import { Team as TeamClass } from "../../api/graphql/features/team/team.model";

interface GetTeamResponse {
  team: TeamClass;
}

export default function AdminTeamsEdit() {
  const router = useRouter();
  const { data } = useMyQuery<GetTeamResponse>(GET_TEAM, {
    variables: { teamId: router.query.id },
  });
  return (
    <Page title="Make Quick and Easy Changes to Your Basketball Teams">
      <TeamEdit team={data?.team} />
    </Page>
  );
}

export const getServerSideProps = requireAuth({});
