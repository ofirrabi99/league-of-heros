import Container from "typedi";
import { CycleModel, GameModel } from "..";
import { TeamModel } from "../team/team.model";
import GameService from "./game.service";

describe("game service", () => {
  let gameService: GameService;

  beforeEach(() => {
    gameService = Container.get(GameService);
  });
  describe("getNextGames", () => {
    it("should return empty array without games", async () => {
      const games = await gameService.getNextGames();
      expect(Array.isArray(games)).toBe(true);
      expect(games).toHaveLength(0);
    });

    it("should return games from next cycle", async () => {
      const team1 = await TeamModel.create({
        name: "team1",
        imageUrl: "image",
      });
      const team2 = await TeamModel.create({
        name: "team2",
        imageUrl: "image",
      });
      const firstCycle = await CycleModel.create({
        name: "cycle1",
        budget: 100,
        fromTime: "2123-05-19T17:00:00.000+00:00",
        toTime: "2123-05-20T17:00:00.000+00:00",
      });
      const secondCycle = await CycleModel.create({
        name: "cycle2",
        budget: 100,
        fromTime: "2124-05-19T17:00:00.000+00:00",
        toTime: "2124-05-20T17:00:00.000+00:00",
      });

      const game1ForFirstCycle = await GameModel.create({
        homeTeam: team1._id,
        awayTeam: team2._id,
        cycle: firstCycle._id,
        time: "2123-05-19T17:00:00.000+00:00",
      });
      const game2ForFirstCycle = await GameModel.create({
        homeTeam: team1._id,
        awayTeam: team2._id,
        cycle: firstCycle._id,
        time: "2123-05-20T17:00:00.000+00:00",
      });

      const game1ForSecondCycle = await GameModel.create({
        homeTeam: team1._id,
        awayTeam: team2._id,
        cycle: secondCycle._id,
        time: "2124-05-19T17:00:00.000+00:00",
      });

      const games = await gameService.getNextGames();
      expect(Array.isArray(games)).toBe(true);
      expect(games).toHaveLength(2);
    });
  });
});
