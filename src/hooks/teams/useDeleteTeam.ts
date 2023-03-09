import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { DELETE_TEAM } from "../../queries/team";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import useMyMutation from "../useMyMutation";

export default function useDeleteTeam() {
  const router = useRouter();
  const toast = useToast();

  const onSuccess = useCallback(() => {
    router.replace(router.asPath);
  }, [router]);

  const onError = useCallback(() => {
    toast(GENERAL_ERROR_TOAST);
  }, [toast]);

  const {
    action: deleteTeam,
    options: { loading: isLoadingDeleteTeam },
  } = useMyMutation(DELETE_TEAM, onSuccess, onError);

  return { deleteTeam, isLoadingDeleteTeam };
}
