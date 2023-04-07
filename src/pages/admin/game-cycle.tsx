import { useQuery } from "@apollo/client";
import { Button, useDisclosure } from "@chakra-ui/react";
import CyclePreview from "../../components/gameCycle/CyclePreview";
import GameCycleFormDialog from "../../components/gameCycle/GameCycleFormDialog";
import Page from "../../components/_layout/Page";
import useAddCycle from "../../hooks/cycles/useAddCycle";
import { requireAuth } from "../../lib/auth0";
import { GET_ALL_CYCLES } from "../../queries/cycle";
import { Cycle } from "../api/graphql/features/cycles/cycle.model";
import { CycleInput } from "../api/graphql/features/cycles/cycle.types";

interface GetCyclesResponse {
  cycles: Cycle[];
}

export default function GameCycle() {
  const { data, loading, error } = useQuery<GetCyclesResponse>(GET_ALL_CYCLES);

  const gameCycleDialogProps = useDisclosure();
  const { addCycle, isLoadingAddCycle } = useAddCycle({
    onSuccessCallback: gameCycleDialogProps.onClose,
  });
  const onAddCycle = async (cycle: CycleInput) => {
    await addCycle({
      variables: { cycle },
    });
  };

  return (
    <Page>
      <Button
        colorScheme="purple"
        onClick={gameCycleDialogProps.onOpen}
        size="lg"
      >
        ADD GAME CYCLE
      </Button>
      <GameCycleFormDialog
        onAddCycle={onAddCycle}
        isLoading={isLoadingAddCycle}
        {...gameCycleDialogProps}
      />

      {data?.cycles.map((cycle) => (
        <CyclePreview key={cycle._id} cycle={cycle} />
      ))}
    </Page>
  );
}

export const getServerSideProps = requireAuth({});
