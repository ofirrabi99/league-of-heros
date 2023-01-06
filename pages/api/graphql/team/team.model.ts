import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
class Team {
  @Field((_type) => String)
  _id!: Types.ObjectId;

  @Field()
  @prop({ required: true, unique: true })
  name!: string;

  @Field()
  @prop({ required: true })
  imageUrl!: string;
}

export default Team;
