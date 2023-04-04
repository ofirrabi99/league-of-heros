import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import { Player } from "../player/player.model";
import PlayerService from "../player/player.service";
import { Team } from "./team.model";
import TeamService from "./team.service";
import { TeamInput } from "./team.types";

@Service()
@Resolver((_of) => Team)
export class TeamResolver {
  constructor(
    private readonly teamService: TeamService,
    private readonly playerService: PlayerService
  ) {}

  @Query((_returns) => [Team])
  teams() {
    return this.teamService.getAll();
  }

  @Query((_returns) => Team)
  team(@Arg("teamId") teamId: string) {
    return this.teamService.getOne(teamId);
  }

  @Authorized("Admin")
  @Mutation((_returns) => Team)
  setTeam(@Arg("team") team: TeamInput) {
    return this.teamService.setTeam(team);
  }

  @Authorized("Admin")
  @Mutation((_returns) => Team, { nullable: true })
  async deleteTeam(@Arg("teamId") teamId: string): Promise<Team | null> {
    return await this.teamService.deleteTeam(teamId);
  }

  @FieldResolver((_returns) => [Player])
  async players(
    @Root("_doc") team: Team,
    @Arg("withoutHiddenPlayers", { nullable: true })
    withoutHiddenPlayers: boolean
  ): Promise<Player[]> {
    return await this.playerService.getByTeam(team._id, !!withoutHiddenPlayers);
  }
}
