import { Types } from "mongoose";
import { InputType, Field, ID } from "type-graphql";
import Team from "./team.model";

@InputType()
export class TeamInput implements Partial<Team> {
  @Field((_type) => ID, { nullable: true })
  _id?: Types.ObjectId;

  @Field()
  name!: string;

  @Field()
  imageUrl!: string;
}
