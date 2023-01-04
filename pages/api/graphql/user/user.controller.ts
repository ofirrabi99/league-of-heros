import User from "./user.model";
import { getModelForClass } from "@typegoose/typegoose";
import { Service } from "typedi";

@Service()
class UserController {
  private UserModel = getModelForClass(User);

  async findById(id: string): Promise<User | null> {
    return await this.UserModel.findOne({ id });
  }

  async setUser(
    id: string,
    coachName: string,
    teamName: string
  ): Promise<User> {
    let user = await this.UserModel.findOne({ id });
    if (user) {
      user.coachName = coachName;
      user.teamName = teamName;
    }
    if (!user) user = new this.UserModel({ id, coachName, teamName });

    return await user.save();
  }
}

export default UserController;
