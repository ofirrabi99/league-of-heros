import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Service } from "typedi";
import TeamController from "../team/team.controller";
import GameController from "./game.controller";
import Game from "./game.model";
import { GameInput } from "./game.types";

@Service()
@Resolver(Game)
class GameResolver {
  constructor(
    private readonly gameController: GameController,
    private readonly teamController: TeamController
  ) {}

  @Query((_returns) => [Game])
  async games(): Promise<Game[]> {
    return await this.gameController.findAll();
  }

  @Mutation((_returns) => [Game])
  async setGame(@Arg("game") game: GameInput): Promise<Game[]> {
    const teams = await this.teamController.findByIds(game.teamsId);
    await this.gameController.setGame(game, teams);
    return await this.games();
  }

  // @Mutation((_returns) => [Team])
  // async deleteTeam(@Arg("teamId") teamId: String): Promise<Team[]> {
  //   await this.teamController.deleteTeam(teamId);
  //   return await this.teams();
  // }

  // @FieldResolver()
  // async teams(@Root("_doc") game: Game): Promise<Team[]> {
  //   const teams = [];
  //   game.teams.forEach(team => team.)
  //   return [];
  // }
}

export default GameResolver;
