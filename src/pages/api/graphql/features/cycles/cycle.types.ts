import { Field, InputType } from "type-graphql";
import { Cycle } from "./cycle.model";

@InputType()
export class CycleInput implements Partial<Cycle> {
  @Field({ nullable: true })
  _id?: string;

  @Field()
  name!: string;

  @Field()
  fromTime!: Date;

  @Field()
  toTime!: Date;
}
