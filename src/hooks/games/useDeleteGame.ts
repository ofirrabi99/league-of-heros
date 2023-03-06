import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { DELETE_GAME } from "../../queries/game";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import useMyMutation from "../useMyMutation";

export default function useDeleteGame() {
  const router = useRouter();
  const toast = useToast();
  const {
    action: deleteGame,
    options: { loading: isLoadingDeleteGame },
  } = useMyMutation(
    DELETE_GAME,
    (_data) => {
      router.replace(router.asPath);
    },
    () => toast(GENERAL_ERROR_TOAST)
  );

  return { deleteGame, isLoadingDeleteGame };
}
