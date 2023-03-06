import { useToast } from "@chakra-ui/react";
import { SET_LINEUP } from "../../queries/user";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";
import useMyMutation from "../useMyMutation";

export default function useSetLineup() {
  const toast = useToast();
  const {
    action: setLineup,
    options: { loading: isLoadingSetLineup },
  } = useMyMutation(
    SET_LINEUP,
    (data) => {
      toast({
        title: "Lineup has been updated in the system!",
        status: "success",
      });
    },
    // TODO - handle error
    () => toast(GENERAL_ERROR_TOAST)
  );

  return { setLineup, isLoadingSetLineup };
}
