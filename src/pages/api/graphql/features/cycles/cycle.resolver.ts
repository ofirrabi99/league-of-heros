import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Cycle } from "./cycle.model";
import { CycleInput } from "./cycle.types";
import { CycleService } from "./cycle.service";

@Service()
@Resolver((_of) => Cycle)
export class CycleResolver {
  constructor(private readonly cycleService: CycleService) {}

  @Authorized("Admin")
  @Mutation((_returns) => Cycle)
  addCycle(@Arg("cycle") cycle: CycleInput) {
    return this.cycleService.addCycle(cycle);
  }
}
