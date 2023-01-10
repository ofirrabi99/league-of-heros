import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Service } from "typedi";
import TeamController from "./team.controller";
import Team from "./team.model";
import { TeamInput } from "./team.types";

@Service()
@Resolver(Team)
class TeamResolver {
  constructor(private readonly teamController: TeamController) {}

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
