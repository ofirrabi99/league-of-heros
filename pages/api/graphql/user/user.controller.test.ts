import { getModelForClass } from "@typegoose/typegoose";
import UserController from "./user.controller";
import User from "./user.model";

describe("user controller", () => {
  const controller = new UserController();
  const UserModel = getModelForClass(User);
  describe("findById", () => {
    it("should not find unentered user", async () => {
      const user = await controller.findById("123");
      expect(user).toBeNull();
    });

    it("should find entered user", async () => {
      const newUser = await UserModel.create({
        id: "123",
        teamName: "hapoel holon",
        coachName: "ofir rabi",
      });

      const user = await controller.findById("123");
      expect(user).not.toBeNull();
      expect(user?.id).toBe(newUser.id);
      expect(user?.teamName).toBe(newUser.teamName);
      expect(user?.coachName).toBe(newUser.coachName);
    });
  });

  describe("setUser", () => {
    it("should create new user", async () => {
      expect((await UserModel.find({})).length).toBe(0);
      const user = await controller.setUser("123", "ofir rabi", "hapoel holon");
      expect(user).not.toBeNull();
      expect((await UserModel.find({})).length).toBe(1);
    });

    it("should change existing user", async () => {
      const before = await UserModel.create({
        id: "123",
        teamName: "hapoel holon",
        coachName: "ofir rabi",
      });
      expect((await UserModel.find({})).length).toBe(1);
      expect(before.coachName).toBe("ofir rabi");

      const after = await controller.setUser(
        "123",
        "dorin lev",
        "hapoel holon"
      );

      expect((await UserModel.find({})).length).toBe(1);
      expect(after.coachName).toBe("dorin lev");
      expect(before.id).toBe(after.id);
    });
  });
});
