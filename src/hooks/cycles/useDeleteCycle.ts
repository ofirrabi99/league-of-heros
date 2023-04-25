import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import { DELETE_CYCLE } from "../../queries/cycle";
import { useMutation } from "@apollo/client";
import { Cycle } from "../../pages/api/graphql/features/cycles/cycle.model";
import { useIntl } from "react-intl";

interface DeleteDataProps {
  deleteCycle: Cycle | null;
}

interface Props {
  onSuccessCallback: () => void;
}
export default function useDeleteCycle({ onSuccessCallback }: Props) {
  const toast = useToast();
  const intl = useIntl();

  const onCompleted = useCallback(
    (data: DeleteDataProps) => {
      if (data.deleteCycle)
        toast({
          title: intl.formatMessage({ id: "general.success-action" }),
          status: "success",
        });
      else
        toast({
          title: intl.formatMessage({
            id: "page.admin.games.delete-cycle-with-games",
          }),
          status: "error",
        });
      onSuccessCallback();
    },
    [toast, onSuccessCallback, intl]
  );

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
