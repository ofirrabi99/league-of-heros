import { Team as TeamClass } from "../../api/graphql/features/team/team.model";
import Team from "../../../components/teams/Team";
import { requireAuth } from "../../../lib/auth0";
import { GET_TEAMS } from "../../../queries/team";
import DynamicList from "../../../components/_shared/DynamicList";
import Page from "../../../components/_layout/Page";
import useMyQuery from "../../../hooks/useMyQuery";
import EmptyPageState from "../../../components/_shared/EmptyPageState";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

interface GetTeamsResponse {
  teams: TeamClass[];
}

export default function AdminTeams() {
  const router = useRouter();
  const { data } = useMyQuery<GetTeamsResponse>(GET_TEAMS);

  const goToTeamAdd = useCallback(() => {
    router.push("/admin/teams/add");
  }, [router]);
  return (
    <Page title="Teams" subTitle="Create and manage teams.">
      {data?.teams.length === 0 && (
        <EmptyPageState
          title="Start building your teams!"
          description="Before we can create games, we will first need to add all our league
        teams to the system."
          action="Add Your First Team"
          onClick={goToTeamAdd}
        />
      )}
      {data?.teams.length !== 0 && (
        <>
          <Button
            size="lg"
            leftIcon={<AddIcon />}
            colorScheme="purple"
            variant="solid"
            onClick={goToTeamAdd}
          >
            Create New Team
          </Button>
          <DynamicList maxSize="20rem">
            {data?.teams.map((team) => (
              <Team key={team._id} team={team} />
            ))}
          </DynamicList>
        </>
      )}
    </Page>
  );
}

export const getServerSideProps = requireAuth({});
