import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { memo, useCallback } from "react";
import useDeleteTeam from "../../hooks/teams/useDeleteTeam";
import { Team as TeamClass } from "../../pages/api/graphql/features/team/team.model";
import useAreYouSureDialog from "../../state/useAreYouSureDialog";

interface Props {
  team: TeamClass;
}

function Team({ team }: Props) {
  const router = useRouter();
  const { fire: fireAreYouSureDialog } = useAreYouSureDialog();
  const { deleteTeam, isLoadingDeleteTeam } = useDeleteTeam();

  const handleDeleteClick = useCallback(() => {
    fireAreYouSureDialog(
      {
        title: `Delete ${team.name}`,
        description: "Are you sure? You can't undo this action afterwards.",
      },
      () => {
        deleteTeam({ variables: { teamId: team._id } });
      }
    );
  }, [fireAreYouSureDialog, team.name, deleteTeam, team._id]);

  const handleEditClick = useCallback(() => {
    router.push(`/admin/teams/${team._id}`);
  }, [team._id, router]);

  return (
    <Card>
      <CardBody>
        <VStack>
          <Avatar size={"xl"} src={team.imageUrl} />
          <Heading fontSize={"2xl"}>{team.name}</Heading>
        </VStack>
      </CardBody>
      <CardFooter display="flex" gap={2}>
        <Button
          onClick={handleDeleteClick}
          colorScheme="red"
          flex={1}
          fontSize={"sm"}
          isLoading={isLoadingDeleteTeam}
        >
          Delete
        </Button>
        <Button
          onClick={handleEditClick}
          colorScheme="purple"
          flex={1}
          fontSize={"sm"}
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}

export default memo(Team);
