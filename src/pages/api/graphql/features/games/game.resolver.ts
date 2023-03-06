import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { GameResult } from "../user/user.model";
import { LineupInput } from "../user/user.types";
import { Game } from "./game.model";
import GameService from "./game.service";
import { GameInput } from "./game.types";

@Service()
@Resolver((_of) => Game)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Query((_returns) => [Game])
  games() {
    return this.gameService.getAll();
  }

  @Query((_returns) => Game)
  game(@Arg("gameId") gameId: string) {
    return this.gameService.getById(gameId);
  }

  @Query((_returns) => [Game])
  nextGames() {
    return this.gameService.getNextGames();
  }

  @Mutation((_returns) => Game)
  setGame(@Arg("game") game: GameInput) {
    return this.gameService.setGame(game);
  }

  @Mutation((_returns) => Game, { nullable: true })
  deleteGame(@Arg("gameId") gameId: string): Promise<Game | null> {
    return this.gameService.deleteGame(gameId);
  }

  @Mutation((_returns) => GameResult)
  setGameResult(
    @Arg("gameResult") gameResult: LineupInput,
    @Arg("gameId") gameId: string
  ) {
    return this.gameService.setGameResult(gameResult, gameId);
  }
}
