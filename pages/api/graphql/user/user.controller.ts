import User from "./user.model";
import { getModelForClass } from "@typegoose/typegoose";
import { Service } from "typedi";

@Service()
class UserController {
  async findById(id: string) {
    const UserModel = getModelForClass(User);
    return await UserModel.findOne({ id });
  }

  async addUser(id: string, coachName: string, teamName: string) {
    const UserModel = getModelForClass(User);
    return await UserModel.create({ id, coachName, teamName });
  }
}

export default UserController;
