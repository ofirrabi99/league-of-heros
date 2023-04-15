import { Button, useDisclosure } from "@chakra-ui/react";
import CyclesList from "../../components/gameCycle/CyclesList";
import GameCycleFormDialog from "../../components/gameCycle/GameCycleFormDialog";
import Page from "../../components/_layout/Page";
import useAddCycle from "../../hooks/cycles/useAddCycle";
import useDeleteCycle from "../../hooks/cycles/useDeleteCycle";
import useMyQuery from "../../hooks/useMyQuery";
import { requireAuth } from "../../lib/auth0";
import { GET_ALL_CYCLES } from "../../queries/cycle";
import { Cycle } from "../api/graphql/features/cycles/cycle.model";
import { CycleInput } from "../api/graphql/features/cycles/cycle.types";

interface GetCyclesResponse {
  cycles: Cycle[];
}

export default function GameCycle() {
  const { data, refetch } = useMyQuery<GetCyclesResponse>(GET_ALL_CYCLES);

  const gameCycleDialogProps = useDisclosure();
  const { addCycle, isLoadingAddCycle } = useAddCycle({
    onSuccessCallback: () => {
      refetch();
      gameCycleDialogProps.onClose();
    },
  });
  const onAddCycle = async (cycle: CycleInput) => {
    await addCycle({
      variables: { cycle },
    });
  };

  const { deleteCycle } = useDeleteCycle({
    onSuccessCallback: () => {
      refetch();
    },
  });
  const onDeleteCycle = async (cycleId: Cycle["_id"]) => {
    await deleteCycle({
      variables: { cycleId },
    });
  };

  return (
    <Page>
      <Button onClick={gameCycleDialogProps.onOpen} size="lg">
        ADD GAME CYCLE
      </Button>
      <GameCycleFormDialog
        onAddCycle={onAddCycle}
        isLoading={isLoadingAddCycle}
        {...gameCycleDialogProps}
      />

      <CyclesList cycles={data?.cycles ?? []} onDeleteCycle={onDeleteCycle} />
    </Page>
  );
}

export const getServerSideProps = requireAuth({});
