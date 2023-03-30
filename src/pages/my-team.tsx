import { Button, Heading, Progress } from "@chakra-ui/react";
import { useState } from "react";
import Game from "../components/games/Game";
import Page from "../components/_layout/Page";
import Alertify from "../components/_shared/Alertify";
import DynamicList from "../components/_shared/DynamicList";
import PlayerPreview from "../components/_shared/PlayerPreview";
import Progressify from "../components/_shared/Progressify";
import useSetLineup from "../hooks/users/useSetLineup";
import client from "../lib/apolloClient";
import { requireAuth } from "../lib/auth0";
import { GET_NEXT_GAMES } from "../queries/game";
import { GET_USER } from "../queries/user";
import { formatDate } from "../utils/functions";
import { Game as GameClass } from "./api/graphql/features/games/game.model";
import { Player } from "./api/graphql/features/player/player.model";
import { Team } from "./api/graphql/features/team/team.model";
import { User } from "./api/graphql/features/user/user.model";

interface GetNextGamesResponse {
  nextGames: GameClass[];
}

interface GetUserResponse {
  user?: User;
}

interface Props {
  nextGames: GetNextGamesResponse["nextGames"];
  user?: GetUserResponse["user"];
  players: Player[];
}
export default function MyTeam({ nextGames, players, user }: Props) {
  const { setLineup, isLoadingSetLineup } = useSetLineup();
  const gameday = nextGames[0] ? formatDate(new Date(nextGames[0].time)) : null;
  const [chosenPlayersId, setChosenPlayersId] = useState<Set<Player["_id"]>>(
    new Set(
      user?.gameResults
        ?.find((game) => game.gameday === gameday)
        ?.players.map((player) => player.playerId)
    )
  );

  const chosenPlayers = players.filter((player) =>
    chosenPlayersId.has(player._id)
  );

  const maxLineupCost = 100;
  const lineupCost = chosenPlayers.reduce(
    (prev, current) => prev + current.price,
    0
  );

  // TODO - Check on server also
  const isOutOfMoney = maxLineupCost < lineupCost;

  const addPlayer = (playerId: Player["_id"]) => {
    setChosenPlayersId((prev) => new Set([...prev, playerId]));
  };

  const removePlayer = (playerId: Player["_id"]) => {
    setChosenPlayersId((prev) => {
      const newSet = new Set(prev);
      newSet.delete(playerId);
      return newSet;
    });
  };
  return (
    <Page>
      <Heading>Upcoming Games:</Heading>
      <br />
      <DynamicList maxSize="40rem">
        {nextGames.map((game) => (
          <Game key={game._id} game={game} hideEdit={true} />
        ))}
      </DynamicList>
      <br />
      <Heading>Your Lineup:</Heading>
      <br />
      {Boolean(chosenPlayers.length) && (
        <>
          <Alertify>
            Choose as many players as you want, as long as you stay within your
            budget.
          </Alertify>
          <br />
          <DynamicList maxSize="30rem">
            <Progressify
              value={lineupCost}
              max={maxLineupCost}
              colorScheme={isOutOfMoney ? "red" : "yellow"}
            >
              {isOutOfMoney &&
                `Money's tight, it's time to cut some players and set things right`}
              {!isOutOfMoney && `${maxLineupCost - lineupCost}$ left`}
            </Progressify>
          </DynamicList>
          <br />
        </>
      )}
      {Boolean(!chosenPlayers.length) && (
        <>
          <Alertify status="warning">No players selected yet</Alertify>
          <br />
        </>
      )}
      <DynamicList maxSize="10rem">
        {chosenPlayers.map((player) => (
          <PlayerPreview
            key={player._id}
            player={player}
            onClick={removePlayer}
          />
        ))}
      </DynamicList>
      <DynamicList maxSize="30rem">
        <Button
          colorScheme="purple"
          isDisabled={isOutOfMoney}
          isLoading={isLoadingSetLineup}
          width="100%"
          onClick={() => {
            setLineup({
              variables: {
                lineup: {
                  gameday,
                  players: Array.from(chosenPlayersId).map((player) => ({
                    playerId: player,
                    score: 0,
                  })),
                },
              },
            });
          }}
        >
          SAVE LINEUP
        </Button>
      </DynamicList>
      <br />
      <br />
      <Heading>Available Players:</Heading>
      <DynamicList maxSize="10rem">
        {players.map((player) => (
          <PlayerPreview
            key={player._id}
            player={player}
            onClick={addPlayer}
            picked={chosenPlayersId.has(player._id)}
          />
        ))}
      </DynamicList>
    </Page>
  );
}

export const getServerSideProps = requireAuth({
  async getServerSideProps(_ctx) {
    // TOOD: Handle error
    const {
      data: { nextGames },
    } = await client.query<GetNextGamesResponse>({
      query: GET_NEXT_GAMES,
    });

    const {
      data: { user },
    } = await client.query<GetUserResponse>({
      query: GET_USER,
    });

    const players = nextGames.flatMap((game) =>
      (game.homeTeam as Team).players?.concat(
        (game.awayTeam as Team).players ?? []
      )
    );

    return {
      props: { nextGames, players, user },
    };
  },
});
