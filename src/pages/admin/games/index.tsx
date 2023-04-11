import { Game as GameClass } from "../../api/graphql/features/games/game.model";
import Game from "../../../components/games/Game";
import { requireAuth } from "../../../lib/auth0";
import DynamicList from "../../../components/_shared/DynamicList";
import Page from "../../../components/_layout/Page";
import { GET_GAMES } from "../../../queries/game";
import { Heading } from "@chakra-ui/react";
import useMyQuery from "../../../hooks/useMyQuery";

interface GetGamesResponse {
  games: GameClass[];
}

export default function AdminGames() {
  const { data } = useMyQuery<GetGamesResponse>(GET_GAMES);
  const games = data?.games ?? [];
  const nextGames = games.filter(
    (game) => new Date(game.time).getTime() > new Date().getTime()
  );
  const historyGames = games.filter(
    (game) => new Date(game.time).getTime() <= new Date().getTime()
  );
  return (
    <Page title="Control Your Games with Ease">
      <Heading>Upcoming Games:</Heading>
      <br />
      <DynamicList maxSize="20rem">
        {nextGames.map((game) => (
          <Game key={game._id} game={game} />
        ))}
      </DynamicList>

      <br />
      <br />

      <Heading>History Games:</Heading>
      <br />
      <DynamicList maxSize="20rem">
        {historyGames.map((game) => (
          <Game key={game._id} game={game} />
        ))}
      </DynamicList>
    </Page>
  );
}

export const getServerSideProps = requireAuth({});
