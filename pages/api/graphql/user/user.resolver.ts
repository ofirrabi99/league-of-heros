import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Service } from "typedi";
import CurrentUser from "../_helpers/decorators/CurrentUser";
import UserController from "./user.controller";
import User from "./user.model";
import { UserInput } from "./user.types";

@Service()
@Resolver(User)
class UserResolver {
  constructor(private readonly userController: UserController) {}

  @Query((_returns) => User, { nullable: true })
  async user(@CurrentUser("id") userId: string): Promise<User | null> {
    const user = await this.userController.findById(userId);
    return user;
  }

  @Mutation((_returns) => User)
  async setUser(
    @Arg("user") user: UserInput,
    @CurrentUser("id") userId: string
  ): Promise<User> {
    return await this.userController.setUser(
      userId,
      user.coachName,
      user.teamName
    );
  }
}

export default UserResolver;
