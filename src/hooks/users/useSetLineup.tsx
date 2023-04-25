import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { useIntl } from "react-intl";
import { SET_LINEUP } from "../../queries/user";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import useMyMutation from "../useMyMutation";

export default function useSetLineup() {
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
    action: setLineup,
    options: { loading: isLoadingSetLineup },
  } = useMyMutation(SET_LINEUP, onSuccess, onError);

  return { setLineup, isLoadingSetLineup };
}
