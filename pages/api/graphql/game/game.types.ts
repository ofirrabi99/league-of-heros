import { Types } from "mongoose";
import { InputType, Field, ID } from "type-graphql";
import Team from "../team/team.model";
import Game from "./game.model";

@InputType()
export class GameInput implements Partial<Game> {
  @Field((_type) => ID, { nullable: true })
  _id?: Types.ObjectId;

  @Field((_type) => [String])
  teamsId!: [Types.ObjectId];

  @Field()
  date!: string;
}
