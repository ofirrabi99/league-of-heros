import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { ObjectType, Field, ID } from "type-graphql";
import Team from "../team/team.model";

@ObjectType()
class Player {
  @Field((_type) => ID)
  _id!: string;

  @Field()
  @prop({ required: true })
  name!: string;

  @Field()
  @prop()
  imageUrl!: string;

  @Field()
  @prop()
  price!: number;

  @Field((_type) => String)
  @prop({ ref: () => Team })
  team!: Ref<Team>;
}

export default Player;
