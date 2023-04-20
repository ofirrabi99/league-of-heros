import { getModelForClass } from "@typegoose/typegoose";
import { Cycle } from "./cycles/cycle.model";
import { Game } from "./games/game.model";
import { Player } from "./player/player.model";
import { Team } from "./team/team.model";
import { User } from "./user/user.model";

export const CycleModel = getModelForClass(Cycle, {
  schemaOptions: {
    versionKey: false,
  },
});

export const GameModel = getModelForClass(Game, {
  schemaOptions: {
    versionKey: false,
  },
});

export const TeamModel = getModelForClass(Team, {
  schemaOptions: {
    versionKey: false,
  },
});

export const PlayerModel = getModelForClass(Player, {
  schemaOptions: {
    versionKey: false,
  },
});

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    versionKey: false,
  },
});
