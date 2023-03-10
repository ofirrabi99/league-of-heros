import { Field, InputType } from "type-graphql";
import {
  GameResult,
  PlayerResult,
  PlayerResultInput,
  User,
} from "./user.model";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  name!: string;

  @Field()
  teamName!: string;
}

@InputType()
export class LineupInput implements Partial<GameResult> {
  @Field((_type) => String)
  gameday!: string;

  @Field((_type) => [PlayerResultInput])
  players!: PlayerResultInput[];
}
