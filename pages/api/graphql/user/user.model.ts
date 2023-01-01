import { prop } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
class User {
  @Field((_type) => ID)
  @prop({ required: true, unique: true })
  id!: string;

  @Field()
  @prop({ required: true })
  coachName!: string;

  @Field()
  @prop({ required: true })
  teamName!: string;
}

export default User;
