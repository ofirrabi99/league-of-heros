import { Service } from "typedi";
import { CycleInput } from "./cycle.types";
import { Cycle, CycleModel } from "./cycle.model";

@Service()
export class CycleService {
  async getAllCycles(): Promise<Cycle[]> {
    return await CycleModel.find();
  }

  async addCycle(cycle: CycleInput): Promise<Cycle> {
    const newCycle = new CycleModel();

    newCycle.name = cycle.name;
    newCycle.fromTime = cycle.fromTime;
    newCycle.toTime = cycle.toTime;

    return await newCycle.save();
  }
}
