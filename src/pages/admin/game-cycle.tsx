import { Button, useDisclosure } from "@chakra-ui/react";
import GameCycleFormDialog from "../../components/gameCycle/GameCycleFormDialog";
import Page from "../../components/_layout/Page";
import { requireAuth } from "../../lib/auth0";

export default function GameCycle() {
  const gameCycleDialogProps = useDisclosure();
  return (
    <Page>
      <Button colorScheme="purple" onClick={gameCycleDialogProps.onOpen}>
        ADD GAME CYCLE
      </Button>
      <GameCycleFormDialog {...gameCycleDialogProps} />
    </Page>
  );
}

export const getServerSideProps = requireAuth({});
