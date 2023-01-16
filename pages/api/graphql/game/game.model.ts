import { prop, PropType } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { ObjectType, Field, ID } from "type-graphql";
import Team from "../team/team.model";

@ObjectType()
class Game {
  @Field((_type) => ID)
  _id!: Types.ObjectId;

  @Field()
  @prop({ required: true })
  date!: string;

  @Field((_type) => [Team])
  @prop({ type: () => [Team] }, PropType.ARRAY)
  teams!: Team[];
}

export default Game;
