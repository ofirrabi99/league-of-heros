import { isDocument } from "@typegoose/typegoose";
import { TeamModel } from "../team/team.model";
import { PlayerModel } from "./player.model";
import PlayerService from "./player.service";

describe("player service", () => {
  const service = new PlayerService();
  const player = { name: "name", imageUrl: "image", price: 2 };

  describe("getAll", () => {
    it("should return empty array without players", async () => {
      const players = await service.getAll();
      expect(Array.isArray(players)).toBe(true);
      expect(players.length).toEqual(0);
    });

    it("should return array with all created players", async () => {
      const team = await TeamModel.create({ name: "aaa", imageUrl: "sadf" });

      await PlayerModel.create({
        ...player,
        team: team._id,
      });
      const players = await service.getAll();
      expect(players.length).toEqual(1);
      expect(players[0]).toStrictEqual(expect.objectContaining(player));
      expect(team._id).toStrictEqual(players[0].team);
    });
  });

  describe("setPlayer", () => {
    it("should create new player", async () => {
      const team = await TeamModel.create({ name: "name", imageUrl: "image" });
      const newPlayer = await service.setPlayer({ ...player, team: team._id });
      expect(newPlayer).toStrictEqual(expect.objectContaining(player));
      const findPlayer = await PlayerModel.findOne({ _id: newPlayer._id });
      expect(findPlayer).toStrictEqual(expect.objectContaining(player));
      expect(team._id).toStrictEqual(newPlayer.team);
    });

    it("should fail on new player with low price", async () => {
      const team = await TeamModel.create({ name: "name", imageUrl: "image" });
      await expect(
        service.setPlayer({ ...player, price: 0, team: team._id })
      ).rejects.toThrowError();
      const players = await PlayerModel.find();
      expect(players.length).toEqual(0);
    });

    it("should fail on new player with wrong team", async () => {
      const team = await TeamModel.create({ name: "name", imageUrl: "image" });
      await expect(
        service.setPlayer({
          ...player,
          team: team._id.toString().replace("6", "4"),
        })
      ).rejects.toThrowError();
      const players = await PlayerModel.find();
      expect(players.length).toEqual(0);
    });

    it("should fail on new player with bad inputs", async () => {
      await expect(
        service.setPlayer({ name: "", imageUrl: "", price: 0, team: "" })
      ).rejects.toThrowError();
      const players = await PlayerModel.find();
      expect(players.length).toEqual(0);
    });

    it("should fail on existing player with bad inputs", async () => {
      const team = await TeamModel.create({ name: "name", imageUrl: "image" });
      const newPlayer = await PlayerModel.create({ ...player, team: team._id });
      await expect(
        service.setPlayer({
          _id: newPlayer._id,
          imageUrl: "",
          name: "",
          price: 0,
          team: "",
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
      const changedPlayer = await service.setPlayer({
        _id: newPlayer._id,
        name: "aaaaa",
        imageUrl: "dddd",
        price: 3,
        team: newTeam._id,
      });
      expect(newPlayer._id).toEqual(changedPlayer._id);
      expect(newPlayer.name).not.toEqual(changedPlayer.name);
      expect(newPlayer.imageUrl).not.toEqual(changedPlayer.imageUrl);
      expect(newPlayer.price).not.toEqual(changedPlayer.price);
      expect(newPlayer.team).not.toEqual(changedPlayer.team);
    });
  });
});
