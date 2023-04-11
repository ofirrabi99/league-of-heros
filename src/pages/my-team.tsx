import { Box } from "@chakra-ui/react";
import Image from "next/image";
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
  nextCycle: Cycle | null;
  currentCycle: Cycle | null;
}

interface GetUserResponse {
  user?: User;
}

export default function MyTeam() {
  const getNextGamesResponse = useMyQuery<GetNextGamesResponse>(GET_NEXT_GAMES);
  const getUserResponse = useMyQuery<GetUserResponse>(GET_USER);
  const isTransferWindowOpen = Boolean(
    !getNextGamesResponse.data?.currentCycle
  );

  const isThereGamesAvailable =
    (getNextGamesResponse.data?.nextGames.length ?? 0) > 0;

  const players = getAllPlayersFromGamesArray(
    getNextGamesResponse.data?.nextGames ?? []
  );

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
          cycleId={getNextGamesResponse.data?.nextCycle?._id}
          players={players}
          userChosenPlayers={
            getUserResponse.data?.user?.gameResults
              ?.find(
                (game) =>
                  game.cycle === getNextGamesResponse.data?.nextCycle?._id
              )
              ?.players.map((player) => player.playerId) ?? []
          }
          budget={getNextGamesResponse.data?.nextCycle?.budget ?? 0}
          isTransferWindowOpen={isTransferWindowOpen}
        />
      )}
    </Page>
  );
}

export const getServerSideProps = requireAuth({});
