import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { SET_LINEUP } from "../../queries/user";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import useMyMutation from "../useMyMutation";

export default function useSetLineup() {
  const toast = useToast();

  const onSuccess = useCallback(() => {
    toast({
      title: "Lineup has been updated in the system!",
      status: "success",
    });
  }, [toast]);

  const onError = useCallback(() => {
    toast(GENERAL_ERROR_TOAST);
  }, [toast]);

  const {
    action: setLineup,
    options: { loading: isLoadingSetLineup },
  } = useMyMutation(SET_LINEUP, onSuccess, onError);

  return { setLineup, isLoadingSetLineup };
}
