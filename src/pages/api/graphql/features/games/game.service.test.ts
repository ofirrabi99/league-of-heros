import { isDocument } from "@typegoose/typegoose";
import { TeamModel } from "../team/team.model";
import { GameModel } from "./game.model";
import GameService from "./game.service";

describe("game service", () => {
  const service = new GameService();
  const game = { time: new Date("2100-01-01T13:30") };

  describe("getAll", () => {
    it("should return empty array without games", async () => {
      const games = await service.getAll();
      expect(Array.isArray(games)).toBe(true);
      expect(games.length).toEqual(0);
    });

    it("should return array with all created games", async () => {
      const homeTeam = await TeamModel.create({
        name: "aaa",
        imageUrl: "sadf",
      });
      const awayTeam = await TeamModel.create({
        name: "bbb",
        imageUrl: "sadf",
      });

      await GameModel.create({
        ...game,
        homeTeam: homeTeam._id,
        awayTeam: awayTeam._id,
      });
      const games = await service.getAll();
      expect(games.length).toEqual(1);
      expect(games[0]).toStrictEqual(expect.objectContaining(game));
      if (isDocument(games[0].homeTeam))
        expect(homeTeam.name).toStrictEqual(games[0].homeTeam.name);
      else throw Error();
      if (isDocument(games[0].awayTeam))
        expect(awayTeam.name).toStrictEqual(games[0].awayTeam.name);
      else throw Error();
    });
  });

  describe("setGame", () => {
    it("should create new game", async () => {
      const homeTeam = await TeamModel.create({
        name: "aaa",
        imageUrl: "sadf",
      });
      const awayTeam = await TeamModel.create({
        name: "bbb",
        imageUrl: "sadf",
      });
      const newGame = await service.setGame({
        ...game,
        homeTeam: homeTeam._id,
        awayTeam: awayTeam._id,
      });
      expect(newGame).toStrictEqual(expect.objectContaining(game));
      const findGame = await GameModel.findOne({ _id: newGame._id });
      expect(findGame).toStrictEqual(expect.objectContaining(game));
      if (isDocument(newGame.homeTeam))
        expect(homeTeam.name).toStrictEqual(newGame.homeTeam.name);
      else throw Error();
      if (isDocument(newGame.awayTeam))
        expect(awayTeam.name).toStrictEqual(newGame.awayTeam.name);
      else throw Error();
    });

    it("should fail on new game with same team", async () => {
      const team = await TeamModel.create({ name: "name", imageUrl: "image" });

      await expect(
        service.setGame({
          ...game,
          homeTeam: team._id,
          awayTeam: team._id,
        })
      ).rejects.toThrowError();
      const games = await GameModel.find();
      expect(games.length).toEqual(0);
    });

    it("should fail on new game with bad inputs", async () => {
      await expect(
        service.setGame({ time: new Date(), homeTeam: "", awayTeam: "" })
      ).rejects.toThrowError();
      const games = await GameModel.find();
      expect(games.length).toEqual(0);
    });

    it("should fail on existing game with bad inputs", async () => {
      const homeTeam = await TeamModel.create({
        name: "name",
        imageUrl: "image",
      });
      const awayTeam = await TeamModel.create({
        name: "nameee",
        imageUrl: "image",
      });
      const newGame = await GameModel.create({
        ...game,
        homeTeam: homeTeam._id,
        awayTeam: awayTeam._id,
      });
      await expect(
        service.setGame({
          _id: newGame._id,
          time: new Date(),
          homeTeam: homeTeam._id,
          awayTeam: homeTeam._id,
        })
      ).rejects.toThrowError();
      const findGame = await GameModel.findOne({ _id: newGame._id });
      expect(findGame).toStrictEqual(expect.objectContaining(game));
    });

    it("change existing game", async () => {
      const homeTeam = await TeamModel.create({
        name: "name",
        imageUrl: "image",
      });
      const awayTeam = await TeamModel.create({
        name: "nameee",
        imageUrl: "image",
      });
      const newGame = await GameModel.create({
        ...game,
        homeTeam: homeTeam._id,
        awayTeam: awayTeam._id,
      });
      const changedGame = await service.setGame({
        _id: newGame._id,
        time: new Date(),
        homeTeam: awayTeam._id,
        awayTeam: homeTeam._id,
      });
      expect(newGame._id).toEqual(changedGame._id);
      expect(newGame.awayTeam).not.toEqual(changedGame.awayTeam);
      expect(newGame.homeTeam).not.toEqual(changedGame.homeTeam);
      expect(newGame.time).not.toEqual(changedGame.time);
    });
  });
});
