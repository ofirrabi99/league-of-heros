import { Button, useDisclosure } from "@chakra-ui/react";
import GameCycleFormDialog from "../../components/gameCycle/GameCycleFormDialog";
import Page from "../../components/_layout/Page";
import useAddCycle from "../../hooks/cycles/useAddCycle";
import { requireAuth } from "../../lib/auth0";
import { CycleInput } from "../api/graphql/features/cycles/cycle.types";

export default function GameCycle() {
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
    </Page>
  );
}

export const getServerSideProps = requireAuth({});
