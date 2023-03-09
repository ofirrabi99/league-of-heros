import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { SET_GAME_RESULT } from "../../queries/game";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import useMyMutation from "../useMyMutation";

export default function useSetGameResult() {
  const toast = useToast();

  const onSuccess = useCallback(() => {
    toast({
      title: "Game result has been updated in the system!",
      status: "success",
    });
  }, [toast]);

  const onError = useCallback(() => {
    toast(GENERAL_ERROR_TOAST);
  }, [toast]);

  const {
    action: setGameResult,
    options: { loading: isLoadingSetGameResult },
  } = useMyMutation(
    SET_GAME_RESULT,
    onSuccess,
    // TODO - handle error
    onError
  );

  return { setGameResult, isLoadingSetGameResult };
}
