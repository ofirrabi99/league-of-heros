import { InputType, Field, ID } from "type-graphql";
import { PlayerInput } from "../player/player.types";
import Team from "./team.model";

@InputType()
export class TeamInput implements Partial<Team> {
  @Field((_type) => ID, { nullable: true })
  _id?: string;

  @Field()
  name!: string;

  @Field()
  imageUrl!: string;

  @Field((_type) => [PlayerInput])
  teamPlayers?: PlayerInput[];
}
