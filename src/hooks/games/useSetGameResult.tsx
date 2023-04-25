import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { useIntl } from "react-intl";
import { SET_GAME_RESULT } from "../../queries/game";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import useMyMutation from "../useMyMutation";

export default function useSetGameResult() {
  const toast = useToast();
  const intl = useIntl();

  const onSuccess = useCallback(() => {
    toast({
      title: intl.formatMessage({ id: "general.success-action" }),
      status: "success",
    });
  }, [toast, intl]);

  const onError = useCallback(() => {
    toast(GENERAL_ERROR_TOAST);
  }, [toast]);

  const {
    action: setGameResult,
    options: { loading: isLoadingSetGameResult },
  } = useMyMutation(SET_GAME_RESULT, onSuccess, onError);

  return { setGameResult, isLoadingSetGameResult };
}
