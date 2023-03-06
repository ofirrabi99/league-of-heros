import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { DELETE_TEAM } from "../../queries/team";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import useMyMutation from "../useMyMutation";

export default function useDeleteTeam() {
  const router = useRouter();
  const toast = useToast();
  const {
    action: deleteTeam,
    options: { loading: isLoadingDeleteTeam },
  } = useMyMutation(
    DELETE_TEAM,
    (_data) => {
      router.replace(router.asPath);
    },
    () => toast(GENERAL_ERROR_TOAST)
  );

  return { deleteTeam, isLoadingDeleteTeam };
}
