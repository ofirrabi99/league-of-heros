import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field as GQLField, ID, ObjectType as GQLType } from "type-graphql";
import { Game } from "../games/game.model";

@GQLType()
export class Cycle {
  @GQLField((_type) => ID)
  readonly _id!: string;

  @GQLField()
  @Property({ required: true })
  name!: string;

  @GQLField()
  @Property({ required: true })
  budget!: number;

  @GQLField((_type) => Date)
  @Property({ required: true })
  fromTime!: Date;

  @GQLField((_type) => Date)
  @Property({ required: true })
  toTime!: Date;

  @GQLField((_type) => [Game])
  games?: Game[];
}
