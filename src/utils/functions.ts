import { User } from "../pages/api/graphql/features/user/user.model";

export function formatDate(date: Date) {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

export function calculateTotalScoreOfUser(user: User): number {
  return (
    user.gameResults?.reduce((prevGameResult, currentGameResult) => {
      return (
        prevGameResult +
        currentGameResult.players.reduce((prevPlayer, currentPlayer) => {
          return prevPlayer + currentPlayer.score;
        }, 0)
      );
    }, 0) ?? 0
  );
}
