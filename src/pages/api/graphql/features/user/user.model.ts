import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import {
  Field as GQLField,
  ID,
  InputType,
  ObjectType as GQLType,
} from "type-graphql";
import { Player } from "../player/player.model";

@GQLType()
export class User {
  @GQLField((_type) => String)
  readonly _id!: string;

  @GQLField((_type) => ID)
  @Property({ required: true, unique: true })
  subId!: string;

  @GQLField((_type) => String)
  @Property()
  name!: string;

  @GQLField((_type) => String)
  @Property()
  teamName!: string;

  @GQLField((_type) => [GameResult])
  @Property({ required: true })
  gameResults?: GameResult[];
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    versionKey: false,
  },
});

@GQLType()
export class GameResult {
  @GQLField((_type) => String)
  @Property({ required: true })
  gameday!: string;

  @GQLField((_type) => [PlayerResult])
  @Property({ required: true })
  players!: PlayerResult[];
}

@GQLType()
export class PlayerResult {
  @GQLField((_type) => String)
  @Property({ required: true })
  playerId!: Player["_id"];

  @GQLField((_type) => Number)
  @Property({ required: true })
  score!: number;
}

@InputType()
export class PlayerResultInput {
  @GQLField((_type) => String)
  @Property({ required: true, unique: true })
  playerId!: Player["_id"];

  @GQLField((_type) => Number)
  @Property({ required: true })
  score!: number;
}
