import Container from "typedi";
import { CycleModel } from "..";
import { Player, PlayerModel } from "../player/player.model";
import { UserModel } from "./user.model";
import { Cycle } from "../cycles/cycle.model";
import UserService from "./user.service";
import { TeamModel } from "../team/team.model";
import { Types } from "mongoose";

describe("user service", () => {
  let userService: UserService;
  const userId = "123";
  const user = { subId: userId, name: "name" };

  beforeEach(() => {
    userService = Container.get(UserService);
  });

  describe("getAll", () => {
    it("should return empty array without users", async () => {
      const users = await userService.getAll();
      expect(Array.isArray(users)).toBe(true);
      expect(users).toHaveLength(0);
    });

    it("should return array with all created users ordered by total score", async () => {
      await UserModel.create({
        subId: "google-oauth2|100213131064061169944",
        gameResults: [
          {
            cycle: "6441700056f4fa7cc44b7632",
            players: [
              {
                playerId: "64416c95bc54ea9de1285b61",
                score: 1,
              },
              {
                playerId: "64416c47bc54ea9de1285b32",
                score: 1,
              },
            ],
          },
          {
            cycle: "6441700056f4fa7cc44b7633",
            players: [
              {
                playerId: "64416c95bc54ea9de1285b61",
                score: 0,
              },
              {
                playerId: "64416c47bc54ea9de1285b32",
                score: 1,
              },
            ],
          },
        ],
        name: "user",
      });
      await UserModel.create({
        subId: "google-oauth2|100213131064061169942",
        gameResults: [
          {
            cycle: "6441700056f4fa7cc44b7632",
            players: [
              {
                playerId: "64416c95bc54ea9de1285b61",
                score: 15,
              },
              {
                playerId: "64416c47bc54ea9de1285b32",
                score: 11,
              },
            ],
          },
          {
            cycle: "6441700056f4fa7cc44b7633",
            players: [
              {
                playerId: "64416c95bc54ea9de1285b61",
                score: 17,
              },
              {
                playerId: "64416c47bc54ea9de1285b32",
                score: 16,
              },
            ],
          },
        ],
        name: "Ofir Rabi",
      });
      await UserModel.create({
        subId: "google-oauth2|100213131064061169943",
        gameResults: [
          {
            cycle: "6441700056f4fa7cc44b7632",
            players: [
              {
                playerId: "64416c95bc54ea9de1285b61",
                score: 2,
              },
              {
                playerId: "64416c47bc54ea9de1285b32",
                score: 1,
              },
            ],
          },
          {
            cycle: "6441700056f4fa7cc44b7633",
            players: [
              {
                playerId: "64416c95bc54ea9de1285b61",
                score: 3,
              },
              {
                playerId: "64416c47bc54ea9de1285b32",
                score: 4,
              },
            ],
          },
        ],
        name: "Dorin Lev",
      });
      const users = await userService.getAll();
      expect(users[0].totalScore).toBe(59);
      expect(users[1].totalScore).toBe(10);
      expect(users[2].totalScore).toBe(3);
    });
  });

  describe("findById", () => {
    it("should not find unentered user", async () => {
      const user = await userService.findById("123");
      expect(user).toBeNull();
    });

    it("should find entered user", async () => {
      await UserModel.create(user);

      const findUser = await userService.findById("123");
      expect(findUser).not.toBeNull();
      expect(findUser).toEqual(expect.objectContaining(user));
    });
  });

  // subId: string,
  // input: LineupInput,
  // userName: string
  describe("setLineup", () => {
    let cycle: Cycle;
    let player1: Player, player2: Player;

    beforeEach(async () => {
      cycle = await CycleModel.create({
        name: "cycle",
        budget: 100,
        fromTime: "2123-05-19T17:00:00.000+00:00",
        toTime: "2123-05-19T17:00:00.000+00:00",
      });

      const team = await TeamModel.create({ name: "name", imageUrl: "image" });
      player1 = await PlayerModel.create({
        name: "player1",
        imageUrl: "image",
        team: team._id,
        price: 56,
      });
      player2 = await PlayerModel.create({
        name: "player2",
        imageUrl: "image",
        team: team._id,
        price: 57,
      });
    });

    it("should fail if wrong cycle entered", async () => {
      await UserModel.create({
        subId: "google-oauth2|100213131064061169942",
        name: "Ofir Rabi",
      });

      await expect(
        userService.setLineup(
          "google-oauth2|100213131064061169942",
          {
            cycle: new Types.ObjectId().toString(),
            players: [{ playerId: player1._id, score: 123 }],
          },
          "Ofir Rabi"
        )
      ).rejects.toThrow("cycle is not exists");
    });

    it("should fail if budget too low", async () => {
      await UserModel.create({
        subId: "google-oauth2|100213131064061169942",
        name: "Ofir Rabi",
      });

      await expect(
        userService.setLineup(
          "google-oauth2|100213131064061169942",
          {
            cycle: cycle._id,
            players: [
              { playerId: player1._id, score: 123 },
              { playerId: player2._id, score: 123 },
            ],
          },
          "Ofir Rabi"
        )
      ).rejects.toThrow("players cost over budget");
    });

    it("should set lineup of the next cycle", async () => {
      await UserModel.create({
        subId: "google-oauth2|100213131064061169942",
        name: "Ofir Rabi",
      });

      const user = await userService.setLineup(
        "google-oauth2|100213131064061169942",
        { cycle: cycle._id, players: [{ playerId: player1._id, score: 123 }] },
        "Ofir Rabi"
      );

      expect(user.gameResults?.find((game) => game.cycle === cycle._id))
        .toBeDefined;
    });
  });
});
