import { prop } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import Player from "../player/player.model";

@ObjectType()
class Team {
  @Field((_type) => ID)
  _id!: string;

  @Field()
  @prop({ required: true, unique: true })
  name!: string;

  @Field()
  @prop({ required: true })
  imageUrl!: string;
}

export default Team;
