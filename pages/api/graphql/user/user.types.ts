import { Field, InputType } from "type-graphql";
import User from "./user.model";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  coachName!: string;

  @Field()
  teamName!: string;
}
