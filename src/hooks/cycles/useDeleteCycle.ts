import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import { DELETE_CYCLE } from "../../queries/cycle";
import { useMutation } from "@apollo/client";

interface Props {
  onSuccessCallback: () => void;
}
export default function useDeleteCycle({ onSuccessCallback }: Props) {
  const toast = useToast();

  const onCompleted = useCallback(() => {
    toast({
      title: "Cycle has been deleted from the system!",
      status: "success",
    });
    onSuccessCallback();
  }, [toast, onSuccessCallback]);

  const onError = useCallback(() => {
    toast(GENERAL_ERROR_TOAST);
  }, [toast]);

  const [deleteCycle, { loading: isLoadingDeleteCycle }] = useMutation(
    DELETE_CYCLE,
    {
      onCompleted,
      onError,
    }
  );

  return { deleteCycle, isLoadingDeleteCycle };
}
