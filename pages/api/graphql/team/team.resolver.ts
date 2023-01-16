import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import PlayerController from "../player/player.controller";
import Player from "../player/player.model";
import TeamController from "./team.controller";
import Team from "./team.model";
import { TeamInput } from "./team.types";

@Service()
@Resolver(Team)
class TeamResolver {
  constructor(
    private readonly teamController: TeamController,
    private readonly playerController: PlayerController
  ) {}

  @Query((_returns) => [Team])
  async teams(): Promise<Team[]> {
    return await this.teamController.findAll();
  }

  @Mutation((_returns) => [Team])
  async setTeam(@Arg("team") team: TeamInput): Promise<Team[]> {
    await this.teamController.setTeam(team);
    return await this.teams();
  }

  @Mutation((_returns) => [Team])
  async deleteTeam(@Arg("teamId") teamId: String): Promise<Team[]> {
    await this.teamController.deleteTeam(teamId);
    return await this.teams();
  }
}

export default TeamResolver;
