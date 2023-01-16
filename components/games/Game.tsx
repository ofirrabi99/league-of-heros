import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import useMyMutation from "../../hooks/useMyMutation";
import GameModel from "../../pages/api/graphql/game/game.model";
import { DELETE_GAME } from "../../queries/game";
import useAreYouSureDialog from "../../state/useAreYouSureDialog";
import { GENERAL_ERROR_TOAST } from "../../utils/constants";

interface Props {
  game: GameModel;
  onEditClick: (game: GameModel) => void;
  onAfterDeleteClick: (games: GameModel[]) => void;
}
function Game({ game, onEditClick, onAfterDeleteClick }: Props) {
  const toast = useToast();
  const [date, setDate] = useState<Date>();
  const { fire: fireAreYouSureDialog } = useAreYouSureDialog();
  const {
    action: deleteGame,
    options: { loading: isLoadingDeleteGame },
  } = useMyMutation(
    DELETE_GAME,
    (data) => onAfterDeleteClick(data.deleteGame),
    () => toast(GENERAL_ERROR_TOAST)
  );

  const onDelete = () => {
    deleteGame({ variables: { gameId: game._id } });
  };

  useEffect(() => {
    setDate(new Date(game.date));
  }, [game.date]);

  return (
    <VStack
      bg={useColorModeValue("gray.200", "gray.700")}
      rounded={"lg"}
      p={6}
      textAlign={"center"}
      justifyContent="space-between"
    >
      <HStack spacing={4}>
        <Box flex={1}>
          <Avatar size={"xl"} src={game.teams[0].imageUrl} />
          <Heading fontSize={"2xl"}>{game.teams[0].name}</Heading>
        </Box>
        <Box>VS</Box>
        <Box flex={1}>
          <Avatar size={"xl"} src={game.teams[1].imageUrl} />
          <Heading fontSize={"2xl"}>{game.teams[1].name}</Heading>
        </Box>
      </HStack>

      <Box>{date?.toLocaleString()}</Box>

      <HStack mt={8} spacing={4}>
        <Button
          onClick={() =>
            fireAreYouSureDialog(
              {
                title: `Delete game`,
                description:
                  "Are you sure? You can't undo this action afterwards.",
              },
              onDelete
            )
          }
          colorScheme="red"
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
          isLoading={isLoadingDeleteGame}
        >
          Delete
        </Button>
        <Button
          onClick={() => onEditClick(game)}
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

export default memo(Game);
