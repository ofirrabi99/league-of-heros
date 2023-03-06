import { UserModel } from "./user.model";
import UserService from "./user.service";

describe("user service", () => {
  const service = new UserService();
  const userId = "123";
  const user = { subId: userId, name: "name", teamName: "team" };

  describe("getAll", () => {
    it("should return empty array without users", async () => {
      const users = await service.getAll();
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toEqual(0);
    });

    it("should return array with all created users", async () => {
      await UserModel.create(user);
      const users = await service.getAll();
      expect(users.length).toEqual(1);
    });
  });

  describe("findById", () => {
    it("should not find unentered user", async () => {
      const user = await service.findById("123");
      expect(user).toBeNull();
    });

    it("should find entered user", async () => {
      await UserModel.create(user);

      const findUser = await service.findById("123");
      expect(findUser).not.toBeNull();
      expect(findUser).toEqual(expect.objectContaining(user));
    });
  });

  describe("setUser", () => {
    it("should create new user", async () => {
      const newUser = await service.setUser(userId, user);
      expect(newUser).toStrictEqual(expect.objectContaining(user));
      const findUser = await UserModel.findOne({ subId: newUser.subId });
      expect(findUser).toStrictEqual(expect.objectContaining(user));
    });

    it("should fail on new user with bad inputs", async () => {
      await expect(
        service.setUser(userId, { name: "", teamName: "" })
      ).rejects.toThrowError();
      const findUser = await UserModel.findOne({ subId: userId });
      expect(findUser).toStrictEqual(null);
    });

    it("should fail on existing user with bad inputs", async () => {
      await UserModel.create(user);
      await expect(
        service.setUser(userId, { name: "", teamName: "" })
      ).rejects.toThrowError();
      const findUser = await UserModel.findOne({ subId: userId });
      expect(findUser).toStrictEqual(expect.objectContaining(user));
    });

    it("change existing user", async () => {
      const newUser = await UserModel.create(user);
      const changedUser = await service.setUser(userId, {
        ...user,
        name: "ofir",
      });
      expect(newUser.subId).toEqual(changedUser.subId);
      expect(newUser.name).not.toEqual(changedUser.name);
    });
  });
});
