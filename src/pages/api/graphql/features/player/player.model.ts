import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { Field as GQLField, ID, ObjectType as GQLType } from "type-graphql";
import type { Team } from "../team/team.model";

@GQLType()
export class Player {
  @GQLField((_type) => ID)
  readonly _id!: string;

  @GQLField()
  @Property({ required: true })
  name!: string;

  @GQLField()
  @Property()
  imageUrl!: string;

  @GQLField()
  @Property({ required: true, default: 1, min: 1 })
  price!: number;

  @GQLField((_type) => String)
  @Property({ ref: "Team", required: true })
  team!: Ref<Team, string>;
}

export const PlayerModel = getModelForClass(Player, {
  schemaOptions: {
    versionKey: false,
  },
});
