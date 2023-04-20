import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { DELETE_TEAM } from "../../queries/team";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import useMyMutation from "../useMyMutation";

interface Props {
  afterSuccess: () => void;
}
export default function useDeleteTeam({ afterSuccess }: Props) {
  const toast = useToast();

  const onSuccess = afterSuccess;

  const onError = useCallback(() => {
    toast(GENERAL_ERROR_TOAST);
  }, [toast]);

  const {
    action: deleteTeam,
    options: { loading: isLoadingDeleteTeam },
  } = useMyMutation(DELETE_TEAM, onSuccess, onError);

  return { deleteTeam, isLoadingDeleteTeam };
}
