import { Field, InputType } from "type-graphql";
import { Game } from "./game.model";

@InputType()
export class GameInput implements Partial<Game> {
  @Field({ nullable: true })
  _id?: string;

  @Field()
  homeTeam!: string;

  @Field()
  awayTeam!: string;

  @Field()
  time!: Date;
}
