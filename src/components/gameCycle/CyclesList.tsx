import { Grid } from "@chakra-ui/react";
import { Cycle } from "../../pages/api/graphql/features/cycles/cycle.model";
import DynamicList from "../_shared/DynamicList";
import CyclePreview from "./CyclePreview";

interface Props {
  cycles: Cycle[];
  onDeleteCycle: (cycleId: Cycle["_id"]) => void;
}
export default function CyclesList({ cycles, onDeleteCycle }: Props) {
  return (
    <DynamicList maxSize="25rem">
      {cycles.map((cycle) => (
        <CyclePreview
          key={cycle._id}
          cycle={cycle}
          onDeleteCycle={onDeleteCycle}
        />
      ))}
    </DynamicList>
  );
}
