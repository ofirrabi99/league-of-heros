import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Cycle } from "./cycle.model";
import { CycleInput } from "./cycle.types";
import { CycleService } from "./cycle.service";

@Service()
@Resolver((_of) => Cycle)
export class CycleResolver {
  constructor(private readonly cycleService: CycleService) {}

  @Query((_returns) => [Cycle])
  cycles() {
    return this.cycleService.getAllCycles();
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
}
