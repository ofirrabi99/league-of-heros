import { useToast } from "@chakra-ui/react";
import { SET_GAME_RESULT } from "../../queries/game";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import useMyMutation from "../useMyMutation";

export default function useSetGameResult() {
  const toast = useToast();
  const {
    action: setGameResult,
    options: { loading: isLoadingSetGameResult },
  } = useMyMutation(
    SET_GAME_RESULT,
    (data) => {
      toast({
        title: "Game result has been updated in the system!",
        status: "success",
      });
    },
    // TODO - handle error
    () => toast(GENERAL_ERROR_TOAST)
  );

  return { setGameResult, isLoadingSetGameResult };
}
