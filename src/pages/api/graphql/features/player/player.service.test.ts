import Container from "typedi";
import { TeamModel } from "../team/team.model";
import { PlayerModel, Player } from "./player.model";
import PlayerService from "./player.service";

describe("player service", () => {
  let playerService: PlayerService;

  beforeEach(() => {
    playerService = Container.get(PlayerService);
  });

  describe("getAll", () => {
    it("should return an array of players", async () => {
      const team = await TeamModel.create({ name: "name", imageUrl: "image" });
      await PlayerModel.create({
        name: "name",
        imageUrl: "image",
        team: team._id,
        price: 12,
      });
      await PlayerModel.create({
        name: "name",
        imageUrl: "image",
        team: team._id,
        price: 12,
      });
      const players = await playerService.getAll();
      expect(players.length).toEqual(2);
    });

    it("should return an empty array of players if not players exists", async () => {
      const players = await playerService.getAll();
      expect(Array.isArray(players)).toBe(true);
      expect(players.length).toEqual(0);
    });
  });

  describe("getByTeam", () => {
    it("should return an array of players of a given team", async () => {
      const team1 = await TeamModel.create({
        name: "team1",
        imageUrl: "image",
      });
      const team2 = await TeamModel.create({
        name: "team2",
        imageUrl: "image",
      });
      const player1 = await PlayerModel.create({
        name: "player1",
        imageUrl: "image",
        team: team1._id,
        price: 12,
        isHidden: false,
      });
      await PlayerModel.create({
        name: "player2",
        imageUrl: "image",
        team: team2._id,
        price: 12,
        isHidden: false,
      });
      const result = await playerService.getByTeam(team1._id, false);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe(player1.name);
    });

    it("should return an array of players of a given team without hidden players", async () => {
      const team1 = await TeamModel.create({
        name: "team1",
        imageUrl: "image",
      });
      const team2 = await TeamModel.create({
        name: "team2",
        imageUrl: "image",
      });
      await PlayerModel.create({
        name: "player1",
        imageUrl: "image",
        team: team1._id,
        price: 12,
        isHidden: true,
      });
      await PlayerModel.create({
        name: "player2",
        imageUrl: "image",
        team: team2._id,
        price: 12,
        isHidden: false,
      });
      const result = await playerService.getByTeam(team1._id, true);

      expect(result).toHaveLength(0);
    });
  });

  describe("setPlayer", () => {
    const player = {
      name: "player",
      imageUrl: "image",
      price: 12,
      isHidden: true,
    };

    it("should create a new player if it doesn't exist", async () => {
      const team = await TeamModel.create({ name: "team", imageUrl: "image" });
      const newPlayer = await playerService.setPlayer({
        ...player,
        team: team._id,
      });
      expect(newPlayer).toStrictEqual(expect.objectContaining(player));
      const findPlayer = await PlayerModel.findOne({ _id: newPlayer._id });
      expect(findPlayer).toStrictEqual(expect.objectContaining(player));
      expect(team._id).toStrictEqual(newPlayer.team);
    });

    it("should fail on new player with low price", async () => {
      const team = await TeamModel.create({ name: "name", imageUrl: "image" });
      await expect(
        playerService.setPlayer({ ...player, price: 0, team: team._id })
      ).rejects.toThrowError();
      const players = await PlayerModel.find();
      expect(players).toHaveLength(0);
    });

    it("should fail on new player with wrong team", async () => {
      const team = await TeamModel.create({ name: "name", imageUrl: "image" });
      await expect(
        playerService.setPlayer({
          ...player,
          team: team._id.toString().replace("6", "4"),
        })
      ).rejects.toThrowError();
      const players = await PlayerModel.find();
      expect(players).toHaveLength(0);
    });

    it("should fail on new player with bad inputs", async () => {
      await expect(
        playerService.setPlayer({
          name: "",
          imageUrl: "",
          price: 0,
          team: "",
          isHidden: false,
        })
      ).rejects.toThrowError();
      const players = await PlayerModel.find();
      expect(players).toHaveLength(0);
    });

    it("should fail on existing player with bad inputs", async () => {
      const team = await TeamModel.create({ name: "name", imageUrl: "image" });
      const newPlayer = await PlayerModel.create({ ...player, team: team._id });
      await expect(
        playerService.setPlayer({
          _id: newPlayer._id,
          imageUrl: "",
          name: "",
          price: 0,
          team: "",
          isHidden: false,
        })
      ).rejects.toThrowError();
      const findPlayer = await PlayerModel.findOne({ _id: newPlayer._id });
      expect(findPlayer).toStrictEqual(expect.objectContaining(player));
    });

    it("change existing player", async () => {
      const team = await TeamModel.create({ name: "name", imageUrl: "image" });
      const newTeam = await TeamModel.create({
        name: "nameee",
        imageUrl: "image",
      });
      const newPlayer = await PlayerModel.create({ ...player, team: team._id });
      const changedPlayer = await playerService.setPlayer({
        _id: newPlayer._id,
        name: "aaaaa",
        imageUrl: "dddd",
        price: 3,
        team: newTeam._id,
        isHidden: false,
      });
      expect(newPlayer._id).toEqual(changedPlayer._id);
      expect(newPlayer.name).not.toEqual(changedPlayer.name);
      expect(newPlayer.imageUrl).not.toEqual(changedPlayer.imageUrl);
      expect(newPlayer.price).not.toEqual(changedPlayer.price);
      expect(newPlayer.team).not.toEqual(changedPlayer.team);
    });
  });
});
