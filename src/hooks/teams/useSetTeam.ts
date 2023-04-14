import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { SET_TEAM } from "../../queries/team";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import useMyMutation from "../useMyMutation";

interface Props {
  isInEditMode: Boolean;
}
export default function useSetTeam({ isInEditMode }: Props) {
  const toast = useToast();
  const router = useRouter();

  const onSuccess = useCallback(
    (data: any) => {
      toast({
        title: "Team has been updated in the system!",
        status: "success",
      });
      router.push(`/admin/teams`);
    },
    [toast, isInEditMode, router]
  );

  const onError = useCallback(() => {
    toast(GENERAL_ERROR_TOAST);
  }, [toast]);

  const {
    action: setTeam,
    options: { loading: isLoadingSetTeam },
  } = useMyMutation(SET_TEAM, onSuccess, onError);

  return { setTeam, isLoadingSetTeam };
}
