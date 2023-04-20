import { Grid } from "@chakra-ui/react";
import { Cycle } from "../../pages/api/graphql/features/cycles/cycle.model";
import CyclePreview from "./CyclePreview";

interface Props {
  cycles: Cycle[];
  onDeleteCycle: (cycleId: Cycle["_id"]) => void;
}
export default function CyclesList({ cycles, onDeleteCycle }: Props) {
  return (
    <Grid gap={2} gridTemplateColumns="repeat(auto-fit, minmax(20rem, 1fr))">
      {cycles.map((cycle) => (
        <CyclePreview
          key={cycle._id}
          cycle={cycle}
          onDeleteCycle={onDeleteCycle}
        />
      ))}
    </Grid>
  );
}
