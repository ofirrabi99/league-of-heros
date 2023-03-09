import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { DELETE_GAME } from "../../queries/game";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import useMyMutation from "../useMyMutation";

export default function useDeleteGame() {
  const router = useRouter();
  const toast = useToast();

  const onSuccess = useCallback(() => {
    router.replace(router.asPath);
  }, [router]);

  const onError = useCallback(() => {
    toast(GENERAL_ERROR_TOAST);
  }, [toast, GENERAL_ERROR_TOAST]);

  const {
    action: deleteGame,
    options: { loading: isLoadingDeleteGame },
  } = useMyMutation(DELETE_GAME, onSuccess, onError);

  return { deleteGame, isLoadingDeleteGame };
}
