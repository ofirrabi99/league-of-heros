import { Resolver, Query, Mutation, Arg, InputType, Field } from "type-graphql";
import { Service } from "typedi";
import CurrentUser from "../_helpers/decorators/CurrentUser";
import UserController from "./user.controller";
import User from "./user.model";

@InputType()
class NewUserInput implements Partial<User> {
  @Field()
  coachName!: string;

  @Field()
  teamName!: string;
}

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
    @Arg("user") user: NewUserInput,
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
