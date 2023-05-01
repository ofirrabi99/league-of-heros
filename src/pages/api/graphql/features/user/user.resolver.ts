import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import CurrentUser from "../../decorators/currentUser";
import { User } from "./user.model";
import UserService from "./user.service";
import { LineupInput, UserInput } from "./user.types";

@Service()
@Resolver((_of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((_returns) => [User])
  async users() {
    const users = await this.userService.getAll();
    return users;
  }

  @Query((_returns) => User, { nullable: true })
  async user(@CurrentUser("id") userId: string): Promise<User | null> {
    return await this.userService.findById(userId);
  }

  @Mutation((_returns) => User)
  setLineup(
    @Arg("lineup") lineup: LineupInput,
    @CurrentUser("id") userId: string,
    @CurrentUser("name") userName: string
  ) {
    return this.userService.setLineup(userId, lineup, userName);
  }
}
