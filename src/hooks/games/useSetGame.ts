import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SET_GAME } from "../../queries/game";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import useMyMutation from "../useMyMutation";

interface Props {
  isInEditMode: Boolean;
}
export default function useSetGame({ isInEditMode }: Props) {
  const toast = useToast();
  const router = useRouter();
  const {
    action: setGame,
    options: { loading: isLoadingSetGame },
  } = useMyMutation(
    SET_GAME,
    (data) => {
      toast({
        title: "Game has been updated in the system!",
        status: "success",
      });
      // if (!isInEditMode) router.push(`/admin/teams/${data.setTeam._id}`);
    },
    () => toast(GENERAL_ERROR_TOAST)
  );

  return { setGame, isLoadingSetGame };
}
