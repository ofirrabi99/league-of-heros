import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Game from "../components/games/Game";
import LineupBuilder from "../components/myTeam/LineupBuilder";
import Page from "../components/_layout/Page";
import DynamicList from "../components/_shared/DynamicList";
import useMyQuery from "../hooks/useMyQuery";
import { requireAuth } from "../lib/auth0";
import { GET_NEXT_GAMES } from "../queries/game";
import { GET_USER } from "../queries/user";
import { getAllPlayersFromGamesArray } from "../utils/functions";
import { Cycle } from "./api/graphql/features/cycles/cycle.model";
import { Game as GameClass } from "./api/graphql/features/games/game.model";
import { User } from "./api/graphql/features/user/user.model";

interface GetNextGamesResponse {
  nextGames: GameClass[];
  currentCycle: Cycle | null;
}

interface GetUserResponse {
  user?: User;
}

export default function MyTeam() {
  const getNextGamesResponse = useMyQuery<GetNextGamesResponse>(GET_NEXT_GAMES);
  const getUserResponse = useMyQuery<GetUserResponse>(GET_USER);
  const [isTransferWindowOpen, setIsTransferWindowOpen] = useState(false);

  const isThereGamesAvailable =
    (getNextGamesResponse.data?.nextGames.length ?? 0) > 0;

  const players = getAllPlayersFromGamesArray(
    getNextGamesResponse.data?.nextGames ?? []
  );

  useEffect(() => {
    if (getNextGamesResponse.data?.currentCycle?.fromTime) {
      setIsTransferWindowOpen(
        new Date() < new Date(getNextGamesResponse.data?.currentCycle?.fromTime)
      );
    }
  }, [
    getNextGamesResponse.data?.currentCycle?.fromTime,
    setIsTransferWindowOpen,
  ]);

  return (
    <Page
      title="MY TEAM"
      subTitle={
        isThereGamesAvailable
          ? "It's game time: Use our Team Selection page to put together the ultimate team for victory."
          : "Sorry, there are no scheduled games at the moment. Please check back later for updates. Thank you."
      }
    >
      {isThereGamesAvailable && (
        <DynamicList maxSize="40rem">
          {getNextGamesResponse.data?.nextGames.map((game) => (
            <Game key={game._id} game={game} hideEdit={true} />
          ))}
        </DynamicList>
      )}
      <br />
      {!isThereGamesAvailable && (
        <Box display="flex" justifyContent="center">
          <Image
            src="/empty-seats.jpg"
            alt="Picture of the empty stadium seats"
            width={500}
            height={500}
          />
        </Box>
      )}
      {isThereGamesAvailable && (
        <LineupBuilder
          cycleId={getNextGamesResponse.data?.currentCycle?._id ?? ""}
          players={players}
          userChosenPlayers={
            getUserResponse.data?.user?.gameResults
              ?.find(
                (game) =>
                  game.cycle === getNextGamesResponse.data?.currentCycle?._id
              )
              ?.players.map((player) => player.playerId) ?? []
          }
          isTransferWindowOpen={isTransferWindowOpen}
        />
      )}
    </Page>
  );
}

export const getServerSideProps = requireAuth({});
