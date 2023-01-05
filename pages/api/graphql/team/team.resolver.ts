import { Resolver, Query, Mutation, Arg, InputType, Field } from "type-graphql";
import { Service } from "typedi";
import TeamController from "./team.controller";
import Team from "./team.model";

@InputType()
class NewTeamInput implements Partial<Team> {
  @Field({ nullable: true })
  id?: string;

  @Field()
  name!: string;

  @Field()
  imageUrl!: string;
}

@Service()
@Resolver(Team)
class TeamResolver {
  constructor(private readonly teamController: TeamController) {}

  @Query((_returns) => [Team])
  async teams(): Promise<Team[] | null> {
    return await this.teamController.findAll();
  }

  @Mutation((_returns) => Team)
  async setTeam(@Arg("team") team: NewTeamInput): Promise<Team> {
    return await this.teamController.setTeam(
      team.id || "",
      team.name,
      team.imageUrl
    );
  }
}

export default TeamResolver;
