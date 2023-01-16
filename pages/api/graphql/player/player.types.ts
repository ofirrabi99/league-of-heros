import { Types } from "mongoose";
import { InputType, Field, ID } from "type-graphql";
import Player from "./player.model";

@InputType()
export class PlayerInput implements Partial<Player> {
  @Field((_type) => ID, { nullable: true })
  _id?: string;

  @Field()
  name!: string;

  @Field()
  imageUrl!: string;

  @Field()
  price!: number;

  @Field((_type) => String)
  team!: string;
}
