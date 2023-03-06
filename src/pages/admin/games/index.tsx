import { Game as GameClass } from "../../api/graphql/features/games/game.model";
import Game from "../../../components/games/Game";
import { requireAuth } from "../../../lib/auth0";
import client from "../../../lib/apolloClient";
import DynamicList from "../../../components/_shared/DynamicList";
import Page from "../../../components/_layout/Page";
import { GET_GAMES } from "../../../queries/game";

interface GetGamesResponse {
  games: GameClass[];
}

interface Props {
  games: GetGamesResponse["games"];
}

export default function AdminGames({ games }: Props) {
  return (
    <Page title="Control Your Games with Ease">
      <DynamicList maxSize="20rem">
        {games.map((game) => (
          <Game key={game._id} game={game} />
        ))}
      </DynamicList>
    </Page>
  );
}

export const getServerSideProps = requireAuth({
  async getServerSideProps(_ctx) {
    // TOOD: Handle error
    const {
      data: { games },
    } = await client.query<GetGamesResponse>({
      query: GET_GAMES,
    });

    return {
      props: { games },
    };
  },
});
