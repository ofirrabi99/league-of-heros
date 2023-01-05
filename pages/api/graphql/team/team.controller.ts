import Team from "./team.model";
import { getModelForClass } from "@typegoose/typegoose";
import { Service } from "typedi";

@Service()
class TeamController {
  private TeamModel = getModelForClass(Team);

  async findAll(): Promise<Team[]> {
    return await this.TeamModel.find({});
  }

  async setTeam(id: string, name: string, imageUrl: string): Promise<Team> {
    let team = id ? await this.TeamModel.findById(id) : null;
    if (team) {
      team.name = name;
      team.imageUrl = imageUrl;
    }
    if (!team) team = new this.TeamModel({ name, imageUrl });

    return await team.save();
  }
}

export default TeamController;
