import User from "./user.model";
import { getModelForClass } from "@typegoose/typegoose";
import { Service } from "typedi";

@Service()
class UserController {
  async findById(id: string): Promise<User | null> {
    const UserModel = getModelForClass(User);
    return await UserModel.findOne({ id });
  }

  async setUser(
    id: string,
    coachName: string,
    teamName: string
  ): Promise<User> {
    const UserModel = getModelForClass(User);
    const user = new UserModel({ id, coachName, teamName });
    return await user.save();
  }
}

export default UserController;
