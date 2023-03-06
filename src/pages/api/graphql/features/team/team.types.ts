import { Field, InputType } from "type-graphql";
import { PlayerInput } from "../player/player.types";
import { Team } from "./team.model";

@InputType()
export class TeamInput {
  @Field({ nullable: true })
  _id?: string;

  @Field()
  name!: string;

  @Field()
  imageUrl!: string;

  @Field((_type) => [PlayerInput])
  players!: PlayerInput[];
}
