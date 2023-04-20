import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useDeleteGame from "../../hooks/games/useDeleteGame";
import { Game as GameClass } from "../../pages/api/graphql/features/games/game.model";
import { Team } from "../../pages/api/graphql/features/team/team.model";
import useAreYouSureDialog from "../../state/useAreYouSureDialog";

interface Props {
  game: GameClass;
  hideEdit?: boolean;
}

export default function Game({ game, hideEdit }: Props) {
  const router = useRouter();
  const { fire: fireAreYouSureDialog } = useAreYouSureDialog();
  const { deleteGame, isLoadingDeleteGame } = useDeleteGame();

  const homeTeam = game.homeTeam as Team;
  const awayTeam = game.awayTeam as Team;

  const handleDeleteClick = () => {
    fireAreYouSureDialog(
      {
        title: `Delete game`,
        description: "Are you sure? You can't undo this action afterwards.",
      },
      () => {
        deleteGame({ variables: { gameId: game._id } });
      }
    );
  };

  const handleEditClick = () => {
    router.push(`/admin/games/${game._id}`);
  };

  return (
    <Card align="center" size="sm" textAlign="center">
      <CardBody>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <VStack textAlign={"center"}>
            <Avatar size={"xl"} src={homeTeam.imageUrl} name={homeTeam.name} />
            <Heading fontSize={"2xl"}>{homeTeam.name}</Heading>
          </VStack>
          <VStack>
            <Heading>VS</Heading>
          </VStack>
          <VStack textAlign={"center"}>
            <Avatar size={"xl"} src={awayTeam.imageUrl} name={awayTeam.name} />
            <Heading fontSize={"2xl"}>{awayTeam.name}</Heading>
          </VStack>
        </Box>
        <Heading size="sm">
          {new Date(game.time).toLocaleString("he-IL")}
        </Heading>
      </CardBody>
      {!hideEdit && (
        <>
          <Divider />
          <CardFooter display="flex" gap={2}>
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
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
            >
              Edit
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
