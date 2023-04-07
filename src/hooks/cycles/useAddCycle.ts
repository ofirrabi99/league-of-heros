import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import useMyMutation from "../useMyMutation";
import { ADD_CYCLE } from "../../queries/cycle";

interface Props {
  onSuccessCallback: () => void;
}
export default function useAddCycle({ onSuccessCallback }: Props) {
  const toast = useToast();

  const onSuccess = useCallback(() => {
    toast({
      title: "Cycle has been added to the system!",
      status: "success",
    });
    onSuccessCallback();
  }, [toast, onSuccessCallback]);

  const onError = useCallback(() => {
    toast(GENERAL_ERROR_TOAST);
  }, [toast]);

  const {
    action: addCycle,
    options: { loading: isLoadingAddCycle },
  } = useMyMutation(ADD_CYCLE, onSuccess, onError);

  return { addCycle, isLoadingAddCycle };
}
