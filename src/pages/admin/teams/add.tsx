import TeamEdit from "../../../components/teams/TeamEdit";
import Page from "../../../components/_layout/Page";
import { requireAuth } from "../../../lib/auth0";

export default function AdminTeamsAdd() {
  return (
    <Page title="Add New Team" subTitle="Set team name, logo and players">
      <TeamEdit />
    </Page>
  );
}

export const getServerSideProps = requireAuth({ roles: ["Admin"] });
