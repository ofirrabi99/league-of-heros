import useMyMutation from "../../hooks/useMyMutation";
import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import TopPage from "../../components/shared/TopPage";
import client from "../../lib/apolloClient";
import { requireAuth } from "../../lib/auth0";
import TeamModel from "../api/graphql/team/team.model";
import GameModel from "../api/graphql/game/game.model";
import {
  GENERAL_ERROR_TOAST,
  GENERAL_SUCCESS_TOAST,
} from "../../utils/constants";
import { GET_GAMES_AND_TEAMS, SET_GAME } from "../../queries/game";
import AddOrEditGameDialog, {
  FormData,
} from "../../components/games/AddOrEditGameDialog";
import GamesList from "../../components/teams/GamesList";

export const getServerSideProps = requireAuth({
  async getServerSideProps(ctx) {
    const {
      data: { teams, games },
    } = await client.query({
      query: GET_GAMES_AND_TEAMS,
    });

    return {
      props: { teams, games },
    };
  },
});

interface Props {
  teams: TeamModel[];
  games: GameModel[];
}

export default function AdminGames({ teams, games }: Props) {
  const toast = useToast();
  const [gamesList, setGamesList] = useState<GameModel[]>(games);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    action: setTeam,
    options: { loading: isLoadingSetTeam },
  } = useMyMutation(
    SET_GAME,
    (data) => {
      setGamesList([...data.setGame]);
      handleCloseDialog();
      toast(GENERAL_SUCCESS_TOAST);
    },
    () => toast(GENERAL_ERROR_TOAST)
  );
  const [gameToUpdate, setGameToUpdate] = useState<GameModel>();

  const onSetGame = ({ date, homeTeam, awayTeam }: FormData) => {
    setTeam({
      variables: {
        game: { date, teamsId: [homeTeam, awayTeam], _id: gameToUpdate?._id },
      },
    });
  };

  const onAfterDeleteGame = useCallback(
    (games: GameModel[]) => {
      setGamesList([...games]);
    },
    [setGamesList]
  );

  const onBeforeUpdateGame = useCallback(
    (team: typeof gameToUpdate) => {
      setGameToUpdate(team);
      onOpen();
    },
    [setGameToUpdate, onOpen]
  );

  const handleCloseDialog = useCallback(() => {
    setGameToUpdate(undefined);
    onClose();
  }, [setGameToUpdate, onClose]);

  return (
    <>
      <TopPage header="Here you can add or edit games in your system" />
      <Box m={4}>
        <Button width={"100%"} colorScheme="purple" onClick={onOpen}>
          ADD NEW GAME
        </Button>
      </Box>
      <GamesList
        gamesList={gamesList}
        onEditClick={onBeforeUpdateGame}
        onAfterDeleteClick={onAfterDeleteGame}
      />
      <br />
      <AddOrEditGameDialog
        isOpen={isOpen}
        onClose={handleCloseDialog}
        onSubmit={onSetGame}
        loading={isLoadingSetTeam}
        gameToUpdate={gameToUpdate}
        teams={teams}
      />
    </>
  );
}
