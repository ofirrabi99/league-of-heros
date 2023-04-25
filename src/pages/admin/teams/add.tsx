import TeamEdit from "../../../components/teams/TeamEdit";
import Page from "../../../components/_layout/Page";
import { requireAuth } from "../../../lib/auth0";

export default function AdminTeamsAdd() {
  return (
    <Page title="page.admin.teams.create">
      <TeamEdit />
    </Page>
  );
}

export const getServerSideProps = requireAuth({ roles: ["Admin"] });
