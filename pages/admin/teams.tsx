import useMyMutation from "../../hooks/useMyMutation";
import { Box, Button, Grid, useDisclosure, useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import TopPage from "../../components/shared/TopPage";
import AddOrEditTeamDialog, {
  FormData,
} from "../../components/teams/AddOrEditTeamDialog";
import Team from "../../components/teams/Team";
import client from "../../lib/apolloClient";
import { requireAuth } from "../../lib/auth0";
import { DELETE_TEAM, GET_TEAMS, SET_TEAM } from "../../queries/team";
import TeamModel from "../api/graphql/team/team.model";
import TeamsList from "../../components/teams/TeamsList";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";

export const getServerSideProps = requireAuth({
  async getServerSideProps(ctx) {
    const {
      data: { teams },
    } = await client.query({
      query: GET_TEAMS,
    });

    return {
      props: { teams },
    };
  },
});

interface Props {
  teams: TeamModel[];
}

export default function AdminTeams({ teams }: Props) {
  const toast = useToast();
  const [teamsList, setTeamsList] = useState<TeamModel[]>(teams);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    action: setTeam,
    options: { loading: isLoadingSetTeam },
  } = useMyMutation(
    SET_TEAM,
    (data) => {
      setTeamsList([...data.setTeam]);
      handleCloseDialog();
      toast({ status: "success", title: "Your changes has been saved!" });
    },
    () => toast(GENERAL_ERROR_TOAST)
  );
  const [teamToUpdate, setTeamToUpdate] = useState<TeamModel>();

  const onSetTeam = ({ imageUrl, name }: FormData) => {
    setTeam({
      variables: { team: { name, imageUrl, _id: teamToUpdate?._id } },
    });
  };

  const onAfterDeleteTeam = useCallback(
    (teams: TeamModel[]) => {
      setTeamsList([...teams]);
    },
    [setTeamsList]
  );

  const onBeforeUpdateTeam = useCallback(
    (team: typeof teamToUpdate) => {
      setTeamToUpdate(team);
      onOpen();
    },
    [setTeamToUpdate, onOpen]
  );

  const handleCloseDialog = useCallback(() => {
    setTeamToUpdate(undefined);
    onClose();
  }, [setTeamToUpdate, onClose]);

  return (
    <>
      <TopPage header="Here you can add or edit teams in your system" />
      <Box m={4}>
        <Button width={"100%"} colorScheme="purple" onClick={onOpen}>
          ADD NEW TEAM
        </Button>
      </Box>
      <TeamsList
        teamsList={teamsList}
        onEditClick={onBeforeUpdateTeam}
        onAfterDeleteClick={onAfterDeleteTeam}
      />
      <br />
      <AddOrEditTeamDialog
        isOpen={isOpen}
        onClose={handleCloseDialog}
        onSubmit={onSetTeam}
        loading={isLoadingSetTeam}
        teamToUpdate={teamToUpdate}
      />
    </>
  );
}
