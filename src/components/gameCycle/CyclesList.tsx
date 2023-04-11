import { Grid, Progress } from "@chakra-ui/react";
import { Cycle } from "../../pages/api/graphql/features/cycles/cycle.model";
import Alertify from "../_shared/Alertify";
import CyclePreview from "./CyclePreview";

interface Props {
  cycles: Cycle[];
  onDeleteCycle: (cycleId: Cycle["_id"]) => void;
}
export default function CyclesList({ cycles, onDeleteCycle }: Props) {
  if (!cycles.length) return <Alertify>No cycles yet created</Alertify>;
  else
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
