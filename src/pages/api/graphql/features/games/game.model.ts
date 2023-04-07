import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { Field as GQLField, ID, ObjectType as GQLType } from "type-graphql";
import { Team } from "../team/team.model";
import { GameResult } from "../user/user.model";
import { Cycle } from "../cycles/cycle.model";

@GQLType()
export class Game {
  @GQLField((_type) => ID)
  readonly _id!: string;

  @GQLField((_type) => Team)
  @Property({ ref: () => Team, required: true })
  homeTeam!: Ref<Team, string>;

  @GQLField((_type) => Team)
  @Property({ ref: () => Team, required: true })
  awayTeam!: Ref<Team, string>;

  @GQLField((_type) => Cycle)
  @Property({ ref: () => Cycle, required: true })
  cycle!: Ref<Cycle, Cycle["_id"]>;

  @GQLField((_type) => Date)
  @Property({ required: true })
  time!: Date;

  @GQLField((_type) => Team)
  homeTeamData!: Team;

  @GQLField((_type) => Team)
  awayTeamData!: Team;

  @GQLField((_type) => GameResult, { nullable: true })
  @Property({ _id: false })
  result?: GameResult;
}

export const GameModel = getModelForClass(Game, {
  schemaOptions: {
    versionKey: false,
  },
});
