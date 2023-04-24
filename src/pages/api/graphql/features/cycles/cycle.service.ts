import { Service } from "typedi";
import { CycleInput } from "./cycle.types";
import { Cycle } from "./cycle.model";
import { CycleModel, GameModel } from "..";

@Service()
export class CycleService {
  async getAllCycles(): Promise<Cycle[]> {
    return await CycleModel.find();
  }

  async getNextCycle(): Promise<Cycle | null> {
    const nextCycle = await CycleModel.findOne({
      fromTime: { $gt: new Date() },
    }).sort("fromTime");

    return nextCycle;
  }

  async getCurrentCycle(): Promise<Cycle | null> {
    const currentCycle = await CycleModel.findOne({
      $and: [
        { fromTime: { $lt: new Date() } },
        { toTime: { $gt: new Date() } },
      ],
    });

    return currentCycle;
  }

  async addCycle(cycle: CycleInput): Promise<Cycle> {
    const newCycle = new CycleModel();

    newCycle.name = cycle.name;
    newCycle.budget = cycle.budget;
    newCycle.fromTime = cycle.fromTime;
    newCycle.toTime = cycle.toTime;

    return await newCycle.save();
  }

  async deleteCycle(cycleId: string): Promise<Cycle | null> {
    const gamesOfCycle = await GameModel.find({ cycle: cycleId });
    // Cant delete cycle with games attached to it
    if (gamesOfCycle.length > 0) {
      return null;
    }

    return await CycleModel.findOneAndDelete({ _id: cycleId });
  }
}
