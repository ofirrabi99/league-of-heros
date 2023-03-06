import { Service } from "typedi";
import PlayerService from "../player/player.service";
import { Team, TeamModel } from "./team.model";
import { TeamInput } from "./team.types";

@Service()
export class TeamService {
  constructor(private readonly playerService: PlayerService) {}

  async getAll(): Promise<Team[]> {
    return await TeamModel.find();
  }

  async getOne(teamId: string): Promise<Team | null> {
    return await TeamModel.findOne({ _id: teamId });
  }

  async setTeam(input: TeamInput): Promise<Team> {
    let team = (await TeamModel.findOne({ _id: input._id })) ?? new TeamModel();

    team.name = input.name;
    team.imageUrl = input.imageUrl;

    await team.save();

    input.players.forEach(async (player) => {
      await this.playerService.setPlayer({ ...player, team: team._id });
    });

    return team;
  }

  async deleteTeam(teamId: string): Promise<Team | null> {
    return await TeamModel.findOneAndDelete({ _id: teamId });
  }
}

export default TeamService;
