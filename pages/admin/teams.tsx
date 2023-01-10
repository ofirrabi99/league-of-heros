import { useMutation } from "@apollo/client";
import { Box, Button, Grid, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TopPage from "../../components/shared/TopPage";
import AddOrEditTeamDialog, {
  FormData,
} from "../../components/teams/AddOrEditTeamDialog";
import Team from "../../components/teams/Team";
import client from "../../lib/apolloClient";
import { requireAuth } from "../../lib/auth0";
import { DELETE_TEAM, GET_TEAMS, SET_TEAM } from "../../queries/team";
import TeamModel from "../api/graphql/team/team.model";

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
  const [teamsList, setTeamsList] = useState<TeamModel[]>(teams);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [setTeam, setTeamState] = useMutation(SET_TEAM);
  const [deleteTeam, deleteTeamState] = useMutation(DELETE_TEAM);
  const toast = useToast();
  const [teamToUpdate, setTeamToUpdate] = useState<TeamModel>();

  const onSetTeam = ({ imageUrl, name }: FormData) => {
    setTeam({
      variables: { team: { name, imageUrl, _id: teamToUpdate?._id } },
    });
    handleCloseDialog();
  };

  const onDeleteTeam = (teamId: String) => {
    deleteTeam({
      variables: { teamId },
    });
  };

  const onStartUpdateTeam = (team: typeof teamToUpdate) => {
    setTeamToUpdate(team);
    onOpen();
  };

  const handleCloseDialog = () => {
    setTeamToUpdate(undefined);
    onClose();
  };

  useEffect(() => {
    if (!setTeamState.data) return;
    setTeamsList([...setTeamState.data.setTeam]);
    handleCloseDialog();
  }, [setTeamState.data]);

  useEffect(() => {
    if (!setTeamState.error) return;
    toast({
      title: "Oops... Something wrong happend.",
      description: "Please try again!",
      status: "error",
    });
  }, [setTeamState.error]);

  useEffect(() => {
    if (!deleteTeamState.data) return;
    setTeamsList([...deleteTeamState.data.deleteTeam]);
  }, [deleteTeamState.data]);

  useEffect(() => {
    if (!deleteTeamState.error) return;
    toast({
      title: "Oops... Something wrong happend.",
      description: "Please try again!",
      status: "error",
    });
  }, [deleteTeamState.error]);

  return (
    <>
      <TopPage header="Here you can add or edit teams in your system" />
      <Box m={4}>
        <Button width={"100%"} colorScheme="purple" onClick={onOpen}>
          ADD NEW TEAM
        </Button>
      </Box>
      <Grid
        templateColumns="repeat(auto-fill, 15rem)"
        gap={4}
        justifyContent="space-around"
        mx={4}
      >
        {teamsList.map((team) => (
          <Team
            key={team._id.toString()}
            imageUrl={team.imageUrl}
            name={team.name}
            onEditClick={() => onStartUpdateTeam(team)}
            onDeleteClick={() => onDeleteTeam(team._id.toString())}
          />
        ))}
      </Grid>
      <br />
      <AddOrEditTeamDialog
        isOpen={isOpen}
        onClose={handleCloseDialog}
        onSubmit={onSetTeam}
        loading={setTeamState.loading}
        teamToUpdate={teamToUpdate}
      />
    </>
  );
}
