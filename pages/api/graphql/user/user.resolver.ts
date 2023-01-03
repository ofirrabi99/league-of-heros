import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  ID,
} from "type-graphql";
import { Service } from "typedi";
import mongoose from "../../../../lib/mongoose";
import UserController from "./user.controller";
import User from "./user.model";

@InputType()
class NewUserInput implements Partial<User> {
  @Field((_type) => ID)
  id!: string;

  @Field()
  coachName!: string;

  @Field()
  teamName!: string;
}

@Service()
@Resolver(User)
class UserResolver {
  constructor(private userController: UserController) {}

  @Query((_returns) => User, { nullable: true })
  async user(@Arg("id", (_type) => ID) id: string): Promise<User | null> {
    await mongoose();
    const user = await this.userController.findById(id);
    return user;
  }

  @Mutation((_returns) => User)
  async setUser(@Arg("user") user: NewUserInput): Promise<User> {
    return await this.userController.setUser(
      user.id,
      user.coachName,
      user.teamName
    );
  }
}

export default UserResolver;
