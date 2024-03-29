import { AddIcon } from "@chakra-ui/icons";
import { Button, useDisclosure, VStack } from "@chakra-ui/react";
import CyclesList from "../../../components/gameCycle/CyclesList";
import GameCycleFormDialog from "../../../components/gameCycle/GameCycleFormDialog";
import Page from "../../../components/_layout/Page";
import EmptyPageState from "../../../components/_shared/EmptyPageState";
import useAddCycle from "../../../hooks/cycles/useAddCycle";
import useDeleteCycle from "../../../hooks/cycles/useDeleteCycle";
import useMyQuery from "../../../hooks/useMyQuery";
import useBreakpointsAlign from "../../../hooks/_shared/useBreakpointsAlign";
import { requireAuth } from "../../../lib/auth0";
import { GET_ALL_CYCLES } from "../../../queries/cycle";
import { Cycle } from "../../api/graphql/features/cycles/cycle.model";
import { CycleInput } from "../../api/graphql/features/cycles/cycle.types";
import { createContext } from "react";
import { FormattedMessage } from "react-intl";

interface GamesContextProps {
  refetch: () => void;
}

export const GamesContext = createContext<GamesContextProps>({
  refetch: () => {},
});

interface GetCyclesResponse {
  cycles: Cycle[];
}

export default function GameCycle() {
  const { data, refetch } = useMyQuery<GetCyclesResponse>(GET_ALL_CYCLES);
  const { alignItems } = useBreakpointsAlign();

  const isEmptyState = data?.cycles.length === 0;

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
    <Page
      title="page.admin.games.title"
      subTitle="page.admin.games.description"
      hideHeader={isEmptyState}
    >
      {isEmptyState && (
        <EmptyPageState
          title="page.admin.games.empty-state.title"
          description="page.admin.games.empty-state.description"
          action="page.admin.games.empty-state.action"
          onClick={gameCycleDialogProps.onOpen}
        />
      )}
      {!isEmptyState && (
        <VStack alignItems={alignItems} gap={4}>
          <Button
            onClick={gameCycleDialogProps.onOpen}
            size="lg"
            leftIcon={<AddIcon />}
            variant="solid"
          >
            <FormattedMessage id="page.admin.games.create" />
          </Button>
          <GamesContext.Provider value={{ refetch: refetch }}>
            <CyclesList
              cycles={data?.cycles ?? []}
              onDeleteCycle={onDeleteCycle}
            />
          </GamesContext.Provider>
        </VStack>
      )}

      <GameCycleFormDialog
        onAddCycle={onAddCycle}
        isLoading={isLoadingAddCycle}
        {...gameCycleDialogProps}
      />
    </Page>
  );
}

export const getServerSideProps = requireAuth({ roles: ["Admin"] });
