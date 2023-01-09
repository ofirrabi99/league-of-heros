import { useMutation } from "@apollo/client";
import { Button, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TopPage from "../../components/shared/TopPage";
import AddOrEditTeamDialog, {
  FormData,
} from "../../components/teams/AddOrEditTeamDialog";
import client from "../../lib/apolloClient";
import { requireAuth } from "../../lib/auth0";
import { GET_TEAMS, SET_TEAM } from "../../queries/team";
import Team from "../api/graphql/team/team.model";

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
  teams: Team[];
}

export default function AdminTeams({ teams }: Props) {
  const [teamsList, setTeamsList] = useState<Team[]>(teams);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [setTeam, { data, loading, error }] = useMutation(SET_TEAM);
  const toast = useToast();

  const onSetTeam = ({ imageUrl, name }: FormData) => {
    setTeam({ variables: { team: { name, imageUrl } } });
  };

  useEffect(() => {
    if (!data) return;
    setTeamsList([...data.setTeam]);
    onClose();
  }, [data]);

  useEffect(() => {
    if (!error) return;
    toast({
      title: "Oops... Something wrong happend.",
      description: "Please try again!",
      status: "error",
    });
  }, [error]);

  return (
    <>
      <TopPage header="Here you can add or edit teams in your system" />
      <VStack mx={4} spacing={4}>
        <Button width={"100%"} colorScheme="purple" onClick={onOpen}>
          ADD NEW TEAM
        </Button>
        {teamsList.map((team) => (
          <div>{team.name}</div>
        ))}
      </VStack>
      <AddOrEditTeamDialog
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSetTeam}
        loading={loading}
      />
    </>
  );
}
