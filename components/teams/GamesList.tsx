import { Grid } from "@chakra-ui/react";
import GameModel from "../../pages/api/graphql/game/game.model";
import Game from "./Game";

interface Props {
  gamesList: GameModel[];
  onEditClick: (game: GameModel) => void;
  onAfterDeleteClick: (games: GameModel[]) => void;
}

export default function GamesList({
  gamesList,
  onEditClick,
  onAfterDeleteClick,
}: Props) {
  return (
    <Grid
      templateColumns="repeat(auto-fill, 25rem)"
      gap={4}
      justifyContent="space-around"
      mx={4}
    >
      {gamesList.map((game) => (
        <Game
          key={game._id.toString()}
          game={game}
          onEditClick={onEditClick}
          onAfterDeleteClick={onAfterDeleteClick}
        />
      ))}
    </Grid>
  );
}
