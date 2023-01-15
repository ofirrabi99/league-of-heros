import Game from "./game.model";
import { getModelForClass } from "@typegoose/typegoose";
import { Service } from "typedi";
import { GameInput } from "./game.types";
import Team from "../team/team.model";

@Service()
class GameController {
  private GameModel = getModelForClass(Game);

  async findAll(): Promise<Game[]> {
    return await this.GameModel.find({});
  }

  async setGame(gameInput: GameInput, teams: Team[]): Promise<Game> {
    let { _id, date } = gameInput;
    const team = new this.GameModel({
      _id,
      teams,
      date,
    });

    team.isNew = !_id;

    return await team.save();
  }

  async deleteGame(gameId: string): Promise<Game | null> {
    return await this.GameModel.findOneAndDelete({ _id: gameId });
  }
}

export default GameController;
