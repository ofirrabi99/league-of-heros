import { Field, InputType } from "type-graphql";
import { Player } from "./player.model";

@InputType()
export class PlayerInput implements Partial<Player> {
  @Field({ nullable: true })
  _id?: string;

  @Field()
  name!: string;

  @Field()
  imageUrl!: string;

  @Field()
  price!: number;

  @Field({ nullable: true })
  team?: string;
}
