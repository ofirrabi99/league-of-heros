import { Game } from "../pages/api/graphql/features/games/game.model";
import { Player } from "../pages/api/graphql/features/player/player.model";
import { Team } from "../pages/api/graphql/features/team/team.model";

export function getAllPlayersFromGamesArray(games: Game[]): Player[] {
  return (
    games.flatMap((game) =>
      ((game.homeTeam as Team).players ?? []).concat(
        (game.awayTeam as Team).players ?? []
      )
    ) ?? []
  );
}
