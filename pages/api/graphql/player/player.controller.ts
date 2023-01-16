import Player from "./player.model";
import { getModelForClass } from "@typegoose/typegoose";
import { Service } from "typedi";
import { PlayerInput } from "./player.types";
@Service()
class PlayerController {
  private PlayerModel = getModelForClass(Player);

  // async findAll(): Promise<Player[]> {
  //   return await this.PlayerModel.find({});
  // }

  async findByTeamId(teamId: string): Promise<Player[]> {
    return await this.PlayerModel.find({ team: teamId });
  }

  async setPlayer(teamInput: PlayerInput): Promise<Player> {
    let { _id, ...rest } = teamInput;
    const player = new this.PlayerModel({
      _id,
      ...rest,
    });

    player.isNew = !_id;

    return await player.save();
  }

  // async deleteTeam(teamId: String): Promise<Team | null> {
  //   return await this.TeamModel.findOneAndDelete({ _id: teamId });
  // }
}

export default PlayerController;
