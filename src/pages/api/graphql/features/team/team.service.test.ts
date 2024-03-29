import { TeamModel } from "./team.model";
import TeamService from "./team.service";
import Container from "typedi";

describe("team service", () => {
  const team = { name: "name", imageUrl: "image", players: [] };
  let teamService: TeamService;

  beforeEach(() => {
    teamService = Container.get(TeamService);
  });

  describe("getAll", () => {
    it("should return empty array without teams", async () => {
      const teams = await teamService.getAll();
      expect(Array.isArray(teams)).toBe(true);
      expect(teams.length).toEqual(0);
    });

    it("should return array with all created teams", async () => {
      await TeamModel.create(team);
      const teams = await teamService.getAll();
      expect(teams.length).toEqual(1);
    });
  });

  describe("setTeam", () => {
    it("should create new team", async () => {
      const newTeam = await teamService.setTeam(team);
      expect(newTeam).toStrictEqual(
        expect.objectContaining({ name: team.name, imageUrl: team.imageUrl })
      );
      const findTeam = await TeamModel.findOne({ _id: newTeam._id });
      expect(findTeam).toStrictEqual(
        expect.objectContaining({ name: team.name, imageUrl: team.imageUrl })
      );
    });

    it("should fail on new team with bad inputs", async () => {
      await expect(
        teamService.setTeam({ name: "", imageUrl: "", players: [] })
      ).rejects.toThrowError();
      const teams = await TeamModel.find();
      expect(teams.length).toEqual(0);
    });

    it("should fail on existing team with bad inputs", async () => {
      const newTeam = await TeamModel.create(team);
      await expect(
        teamService.setTeam({
          _id: newTeam._id,
          imageUrl: "",
          name: "",
          players: [],
        })
      ).rejects.toThrowError();
      const findTeam = await TeamModel.findOne({ _id: newTeam._id });
      expect(findTeam).toStrictEqual(
        expect.objectContaining({ name: team.name, imageUrl: team.imageUrl })
      );
    });

    it("change existing team", async () => {
      const newTeam = await TeamModel.create(team);
      const changedTeam = await teamService.setTeam({
        _id: newTeam._id,
        name: "aaaaa",
        imageUrl: "dddd",
        players: [],
      });
      expect(newTeam._id).toEqual(changedTeam._id);
      expect(newTeam.name).not.toEqual(changedTeam.name);
      expect(newTeam.imageUrl).not.toEqual(changedTeam.imageUrl);
    });
  });

  describe("deleteTeam", () => {
    it("should return null when delete non existing team", async () => {
      const newTeam = await TeamModel.create(team);
      await teamService.deleteTeam(newTeam._id);
      const deletedTeam = await teamService.deleteTeam(newTeam._id);
      expect(deletedTeam).toStrictEqual(null);
    });

    it("should delete and return team", async () => {
      const newTeam = await TeamModel.create(team);
      let teams = await TeamModel.find({});
      expect(teams.length).toEqual(1);

      const deletedTeam = await teamService.deleteTeam(newTeam._id);
      teams = await TeamModel.find({});
      expect(teams.length).toEqual(0);
      expect(deletedTeam).toStrictEqual(
        expect.objectContaining({ name: team.name, imageUrl: team.imageUrl })
      );
    });
  });
});
