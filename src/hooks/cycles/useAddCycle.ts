import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import { ADD_CYCLE } from "../../queries/cycle";
import { useMutation } from "@apollo/client";
import { useIntl } from "react-intl";

interface Props {
  onSuccessCallback: () => void;
}
export default function useAddCycle({ onSuccessCallback }: Props) {
  const toast = useToast();
  const intl = useIntl();

  const onCompleted = useCallback(() => {
    toast({
      title: intl.formatMessage({ id: "general.success-action" }),
      status: "success",
    });
    onSuccessCallback();
  }, [toast, onSuccessCallback, intl]);

  const onError = useCallback(() => {
    toast(GENERAL_ERROR_TOAST);
  }, [toast]);

  const [addCycle, { loading: isLoadingAddCycle }] = useMutation(ADD_CYCLE, {
    onCompleted,
    onError,
  });

  return { addCycle, isLoadingAddCycle };
}
