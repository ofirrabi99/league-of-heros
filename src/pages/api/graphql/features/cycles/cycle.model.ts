import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { Field as GQLField, ID, ObjectType as GQLType } from "type-graphql";

@GQLType()
export class Cycle {
  @GQLField((_type) => ID)
  readonly _id!: string;

  @GQLField()
  @Property({ required: true })
  name!: string;

  @GQLField((_type) => Date)
  @Property({ required: true })
  fromTime!: Date;

  @GQLField((_type) => Date)
  @Property({ required: true })
  toTime!: Date;
}

export const CycleModel = getModelForClass(Cycle, {
  schemaOptions: {
    versionKey: false,
  },
});
