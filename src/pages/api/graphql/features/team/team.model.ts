import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field as GQLField, ID, ObjectType as GQLType } from "type-graphql";
import { Player } from "../player/player.model";

@GQLType()
export class Team {
  @GQLField((_type) => ID)
  readonly _id!: string;

  @GQLField()
  @Property({ required: true, unique: true })
  name!: string;

  @GQLField()
  @Property({ required: true })
  imageUrl!: string;

  @GQLField((_type) => [Player])
  players?: Player[];
}

export const TeamModel = getModelForClass(Team, {
  schemaOptions: {
    versionKey: false,
  },
});
