import { useToast } from "@chakra-ui/react";
import { useCallback, useContext } from "react";
import { GamesContext } from "../../pages/admin/games";
import { DELETE_GAME } from "../../queries/game";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import useMyMutation from "../useMyMutation";

export default function useDeleteGame() {
  const toast = useToast();
  const { refetch } = useContext(GamesContext);

  const onSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const onError = useCallback(() => {
    toast(GENERAL_ERROR_TOAST);
  }, [toast]);

  const {
    action: deleteGame,
    options: { loading: isLoadingDeleteGame },
  } = useMyMutation(DELETE_GAME, onSuccess, onError);

  return { deleteGame, isLoadingDeleteGame };
}
