import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import { Cycle } from "./cycle.model";
import { CycleInput } from "./cycle.types";
import { CycleService } from "./cycle.service";
import { Game } from "../games/game.model";
import GameService from "../games/game.service";

@Service()
@Resolver((_of) => Cycle)
export class CycleResolver {
  constructor(
    private readonly cycleService: CycleService,
    private readonly gameService: GameService
  ) {}

  @Query((_returns) => [Cycle])
  cycles() {
    return this.cycleService.getAllCycles();
  }

  @Query((_returns) => Cycle, { nullable: true })
  nextCycle() {
    return this.cycleService.getNextCycle();
  }

  @Query((_returns) => Cycle, { nullable: true })
  currentCycle() {
    return this.cycleService.getCurrentCycle();
  }

  @Authorized("Admin")
  @Mutation((_returns) => Cycle)
  addCycle(@Arg("cycle") cycle: CycleInput): Promise<Cycle> {
    return this.cycleService.addCycle(cycle);
  }

  @Authorized("Admin")
  @Mutation((_returns) => Cycle, { nullable: true })
  deleteCycle(@Arg("cycleId") cycleId: string): Promise<Cycle | null> {
    return this.cycleService.deleteCycle(cycleId);
  }

  @FieldResolver((_returns) => [Game])
  async games(@Root("_doc") cycle: Cycle): Promise<Game[]> {
    return await this.gameService.getByCycle(cycle._id);
  }
}
