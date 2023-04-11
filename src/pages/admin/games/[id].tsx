import Page from "../../../components/_layout/Page";
import DynamicList from "../../../components/_shared/DynamicList";
import PlayerPreview from "../../../components/_shared/PlayerPreview";
import { requireAuth } from "../../../lib/auth0";
import { GET_GAME } from "../../../queries/game";
import { Game } from "../../api/graphql/features/games/game.model";
import { Team } from "../../api/graphql/features/team/team.model";
import GamePreview from "../../../components/games/Game";
import { useState } from "react";
import { PlayerResultInput } from "../../api/graphql/features/user/user.model";
import { Button } from "@chakra-ui/react";
import useSetGameResult from "../../../hooks/games/useSetGameResult";
import { Cycle } from "../../api/graphql/features/cycles/cycle.model";
import useMyQuery from "../../../hooks/useMyQuery";
import { useRouter } from "next/router";

interface GetGameResponse {
  game: Game;
}

export default function AdminGamesEdit() {
  const router = useRouter();
  const { data } = useMyQuery<GetGameResponse>(GET_GAME, {
    variables: { gameId: router.query.id },
  });
  const game = data?.game;
  const players = game
    ? [game].flatMap((game) =>
        (game.homeTeam as Team).players!.concat(
          (game.awayTeam as Team).players ?? []
        )
      )
    : [];
  const { isLoadingSetGameResult, setGameResult } = useSetGameResult();
  const [playerResults, setPlayerResults] = useState<
    Map<PlayerResultInput["playerId"], PlayerResultInput["score"]>
  >(
    new Map(
      game?.result?.players.map(({ playerId, score }) => [playerId, score])
    )
  );

  if (!game) return <></>;

  return (
    <Page title="Edit game">
      <GamePreview game={game!} hideEdit={true} />
      <DynamicList maxSize="10rem">
        {players.map((player) => (
          <PlayerPreview
            key={player._id}
            player={player}
            inEditGame
            score={playerResults.get(player._id)}
            onEditScore={(playerId, score) => {
              setPlayerResults(new Map(playerResults.set(playerId, score)));
            }}
          />
        ))}
      </DynamicList>
      <Button
        colorScheme="purple"
        isLoading={isLoadingSetGameResult}
        width="100%"
        onClick={() => {
          setGameResult({
            variables: {
              gameId: game._id,
              gameResult: {
                cycle: (game.cycle as Cycle)._id,
                players: Array.from(playerResults).map(([playerId, score]) => ({
                  playerId,
                  score: score || 0,
                })),
              },
            },
          });
        }}
      >
        SAVE GAME
      </Button>
    </Page>
  );
}

export const getServerSideProps = requireAuth({});
