import Team from "./team.model";
import { getModelForClass } from "@typegoose/typegoose";
import { Service } from "typedi";
import { TeamInput } from "./team.types";

@Service()
class TeamController {
  private TeamModel = getModelForClass(Team);

  async findAll(): Promise<Team[]> {
    return await this.TeamModel.find({});
  }

  async findByIds(teamIds: string[]): Promise<Team[]> {
    return await this.TeamModel.find({ _id: teamIds });
  }

  async setTeam(teamInput: TeamInput): Promise<Team> {
    let { _id, ...rest } = teamInput;
    const team = new this.TeamModel({
      _id,
      ...rest,
    });

    team.isNew = !_id;

    return await team.save();
  }

  async deleteTeam(teamId: String): Promise<Team | null> {
    return await this.TeamModel.findOneAndDelete({ _id: teamId });
  }
}

export default TeamController;
