import {
  Avatar,
  Button,
  Heading,
  HStack,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { memo } from "react";
import useMyMutation from "../../hooks/useMyMutation";
import TeamModel from "../../pages/api/graphql/team/team.model";
import { DELETE_TEAM } from "../../queries/team";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";

interface Props {
  team: TeamModel;
  onEditClick: (team: TeamModel) => void;
  onAfterDeleteClick: (teams: TeamModel[]) => void;
}
function Team({ team, onEditClick, onAfterDeleteClick }: Props) {
  const toast = useToast();
  const {
    action: deleteTeam,
    options: { loading: isLoadingDeleteTeam },
  } = useMyMutation(
    DELETE_TEAM,
    (data) => onAfterDeleteClick(data.deleteTeam),
    () => toast(GENERAL_ERROR_TOAST)
  );

  const onDeleteClick = () => {
    deleteTeam({ variables: { teamId: team._id } });
  };

  return (
    <VStack
      bg={useColorModeValue("gray.200", "gray.700")}
      rounded={"lg"}
      p={6}
      textAlign={"center"}
      justifyContent="space-between"
    >
      <Avatar size={"xl"} src={team.imageUrl} />
      <Heading fontSize={"2xl"}>{team.name}</Heading>

      <HStack mt={8} spacing={4}>
        <Button
          onClick={onDeleteClick}
          colorScheme="red"
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
          isLoading={isLoadingDeleteTeam}
        >
          Delete
        </Button>
        <Button
          onClick={() => onEditClick(team)}
          colorScheme="purple"
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
        >
          Edit
        </Button>
      </HStack>
    </VStack>
  );
}

export default memo(Team);
