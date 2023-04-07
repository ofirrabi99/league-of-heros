import { Field, InputType } from "type-graphql";
import { GameResult, PlayerResultInput, User } from "./user.model";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  name!: string;
}

@InputType()
export class LineupInput implements Partial<GameResult> {
  @Field((_type) => String)
  cycle!: string;

  @Field((_type) => [PlayerResultInput])
  players!: PlayerResultInput[];
}
