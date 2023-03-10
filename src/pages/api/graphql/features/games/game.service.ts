import { Service } from "typedi";
import { TeamModel } from "../team/team.model";
import { GameResult, UserModel } from "../user/user.model";
import { LineupInput } from "../user/user.types";
import { Game, GameModel } from "./game.model";
import { GameInput } from "./game.types";

@Service()
export class GameService {
  async getAll(): Promise<Game[]> {
    return await GameModel.find().populate(["homeTeam", "awayTeam"]);
  }

  async getById(gameId: string): Promise<Game | null> {
    return await GameModel.findOne({
      _id: gameId,
    }).populate(["homeTeam", "awayTeam"]);
  }

  async getNextGames(): Promise<Game[]> {
    const nextGames = await GameModel.find({
      time: { $gt: new Date() },
    }).populate(["homeTeam", "awayTeam"]);

    const today = new Date();
    let closestDayDiff = Infinity;
    let closestDays: Game[] = [];

    for (const game of nextGames) {
      const dayDiff =
        Math.abs(new Date(game.time).getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24);

      if (dayDiff < closestDayDiff) {
        closestDayDiff = dayDiff;
        closestDays = [game];
      } else if (dayDiff === closestDayDiff) {
        closestDays.push(game);
      }
    }

    return closestDays;
  }

  async setGame(input: GameInput): Promise<Game> {
    // TODO: Look best practices for exceptions
    if (input.awayTeam === input.homeTeam)
      throw new Error("Identical teams provided");

    const homeTeam = await TeamModel.findOne({ _id: input.homeTeam });
    const awayTeam = await TeamModel.findOne({ _id: input.awayTeam });

    // TODO: Look best practices for exceptions
    if (!homeTeam) throw new Error("homeTeam is not exists");
    if (!awayTeam) throw new Error("awayTeam is not exists");

    let game = (await GameModel.findOne({ _id: input._id })) ?? new GameModel();

    game.time = input.time;
    game.homeTeam = homeTeam._id;
    game.awayTeam = awayTeam._id;
    // [{ path: "homeTeam" }, { path: "awayTeam" }]
    return await game.save();
    // .populate([{ path: "homeTeam" }, { path: "awayTeam" }]);
  }

  async deleteGame(gameId: string): Promise<Game | null> {
    return await GameModel.findOneAndDelete({ _id: gameId });
  }

  async setGameResult(
    gameResult: LineupInput,
    gameId: string
  ): Promise<GameResult> {
    const game = await GameModel.findOne({ _id: gameId });
    // TODO: Look best practices for exceptions
    if (!game) throw new Error("game is not exists");

    game!.result = gameResult;
    await game.save();

    // TODO - change to one query only
    for (const playerScore of gameResult.players) {
      await UserModel.updateMany(
        {},
        {
          $set: {
            "gameResults.$[result].players.$[player].score": playerScore.score,
          },
        },
        {
          arrayFilters: [
            { "result.gameday": gameResult.gameday },
            {
              "player.playerId": playerScore.playerId,
            },
          ],
        }
      );
    }

    return game!.result;
  }
}

export default GameService;
