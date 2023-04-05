import { Avatar, Button, Heading, HStack, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { memo, useCallback } from "react";
import useDeleteGame from "../../hooks/games/useDeleteGame";
import useCard from "../../hooks/_shared/useCard";
import { Game as GameClass } from "../../pages/api/graphql/features/games/game.model";
import { Team } from "../../pages/api/graphql/features/team/team.model";
import useAreYouSureDialog from "../../state/useAreYouSureDialog";

interface Props {
  game: GameClass;
  hideEdit?: boolean;
}

function Game({ game, hideEdit }: Props) {
  const router = useRouter();
  const card = useCard();
  const { fire: fireAreYouSureDialog } = useAreYouSureDialog();
  const { deleteGame, isLoadingDeleteGame } = useDeleteGame();

  const homeTeam = game.homeTeam as Team;
  const awayTeam = game.awayTeam as Team;

  const handleDeleteClick = useCallback(() => {
    fireAreYouSureDialog(
      {
        title: `Delete game`,
        description: "Are you sure? You can't undo this action afterwards.",
      },
      () => {
        deleteGame({ variables: { gameId: game._id } });
      }
    );
  }, [fireAreYouSureDialog, game._id, deleteGame]);

  const handleEditClick = useCallback(() => {
    router.push(`/admin/games/${game._id}`);
  }, [game._id, router]);

  return (
    <VStack {...card}>
      <HStack>
        <VStack textAlign={"center"}>
          <Avatar size={"xl"} src={homeTeam.imageUrl} />
          <Heading fontSize={"2xl"}>{homeTeam.name}</Heading>
        </VStack>
        <VStack>
          <Heading>VS</Heading>
        </VStack>
        <VStack textAlign={"center"}>
          <Avatar size={"xl"} src={awayTeam.imageUrl} />
          <Heading fontSize={"2xl"}>{awayTeam.name}</Heading>
        </VStack>
      </HStack>
      <Heading size="sm">{new Date(game.time).toLocaleString("he-IL")}</Heading>
      {!hideEdit && (
        <HStack width="100%">
          <Button
            onClick={handleDeleteClick}
            colorScheme="red"
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            isLoading={isLoadingDeleteGame}
          >
            Delete
          </Button>
          <Button
            onClick={handleEditClick}
            colorScheme="purple"
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
          >
            Edit
          </Button>
        </HStack>
      )}
    </VStack>
  );
}

export default memo(Game);
