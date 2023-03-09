import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { SET_GAME } from "../../queries/game";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import useMyMutation from "../useMyMutation";

interface Props {
  isInEditMode: Boolean;
}
export default function useSetGame({ isInEditMode }: Props) {
  const toast = useToast();

  const onSuccess = useCallback(() => {
    toast({
      title: "Game has been updated in the system!",
      status: "success",
    });
  }, [toast]);

  const onError = useCallback(() => {
    toast(GENERAL_ERROR_TOAST);
  }, [toast, GENERAL_ERROR_TOAST]);

  const {
    action: setGame,
    options: { loading: isLoadingSetGame },
  } = useMyMutation(SET_GAME, onSuccess, onError);

  return { setGame, isLoadingSetGame };
}
