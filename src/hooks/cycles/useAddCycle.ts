import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import { ADD_CYCLE } from "../../queries/cycle";
import { useMutation } from "@apollo/client";

interface Props {
  onSuccessCallback: () => void;
}
export default function useAddCycle({ onSuccessCallback }: Props) {
  const toast = useToast();

  const onCompleted = useCallback(() => {
    toast({
      title: "Cycle has been added to the system!",
      status: "success",
    });
    onSuccessCallback();
  }, [toast, onSuccessCallback]);

  const onError = useCallback(() => {
    toast(GENERAL_ERROR_TOAST);
  }, [toast]);

  const [addCycle, { loading: isLoadingAddCycle }] = useMutation(ADD_CYCLE, {
    onCompleted,
    onError,
  });

  return { addCycle, isLoadingAddCycle };
}
