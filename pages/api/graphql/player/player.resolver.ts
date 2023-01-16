import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Service } from "typedi";
import Player from "./player.model";
import PlayerController from "./player.controller";
import { PlayerInput } from "./player.types";

@Service()
@Resolver(Player)
class PlayerResolver {
  constructor(private readonly playerController: PlayerController) {}

  @Query((_returns) => [Player])
  async players(@Arg("teamId") teamId: string): Promise<Player[]> {
    return await this.playerController.findByTeamId(teamId);
  }

  // @Mutation((_returns) => [Player])
  // async setPlayer(@Arg("player") player: PlayerInput): Promise<Player[]> {
  //   await this.playerController.setPlayer(player);
  //   return await this.players(player.team);
  // }
}

export default PlayerResolver;
