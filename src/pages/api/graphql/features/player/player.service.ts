import { Service } from "typedi";
import { TeamModel } from "../team/team.model";
import { Player, PlayerModel } from "./player.model";
import { PlayerInput } from "./player.types";

@Service()
export class PlayerService {
  async getAll(): Promise<Player[]> {
    return await PlayerModel.find();
  }

  async getByTeam(teamId: string): Promise<Player[]> {
    return await PlayerModel.find({ team: teamId });
  }

  async setPlayer(input: PlayerInput): Promise<Player> {
    const team = await TeamModel.findOne({ _id: input.team });

    // TODO: Look best practices for exceptions
    if (!team) throw new Error("Team is not exists");

    let player =
      (await PlayerModel.findOne({ _id: input._id })) ?? new PlayerModel();

    player.name = input.name;
    player.imageUrl = input.imageUrl;
    player.price = input.price;
    player.team = team._id;

    return await await player.save();
  }
}

export default PlayerService;
