import { Types } from "mongoose";
import { InputType, Field, ID } from "type-graphql";
import Game from "./game.model";

@InputType()
export class GameInput implements Partial<Game> {
  @Field((_type) => ID, { nullable: true })
  _id?: string;

  @Field((_type) => [String])
  teamsId!: [string];

  @Field()
  date!: string;
}
