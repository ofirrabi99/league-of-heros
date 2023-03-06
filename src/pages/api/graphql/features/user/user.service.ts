import { Service } from "typedi";
import { User, UserModel } from "./user.model";
import { LineupInput, UserInput } from "./user.types";

@Service()
export class UserService {
  async getAll(): Promise<User[]> {
    return await UserModel.find();
  }

  async findById(id: string): Promise<User | null> {
    return await UserModel.findOne({ subId: id });
  }

  async setUser(subId: string, input: UserInput): Promise<User> {
    let user = (await UserModel.findOne({ subId })) ?? new UserModel({ subId });

    user.name = input.name;
    user.teamName = input.teamName;

    return user.save();
  }

  async setLineup(subId: string, input: LineupInput): Promise<User> {
    let user = (await UserModel.findOne({ subId })) ?? new UserModel({ subId });

    if (!user.gameResults) user.gameResults = [];
    user.gameResults = user.gameResults.filter(
      (game) => game.gameday !== input.gameday
    );

    user.gameResults.push({ gameday: input.gameday, players: input.players });
    user.name = "a";
    user.teamName = "b";

    return user.save();
  }
}

export default UserService;
