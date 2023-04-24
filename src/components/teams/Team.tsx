import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import useDeleteTeam from "../../hooks/teams/useDeleteTeam";
import { Team as TeamClass } from "../../pages/api/graphql/features/team/team.model";
import useAreYouSureDialog from "../../state/useAreYouSureDialog";

interface Props {
  team: TeamClass;
  afterDelete: () => void;
}

export default function Team({ team, afterDelete }: Props) {
  const router = useRouter();
  const { fire: fireAreYouSureDialog } = useAreYouSureDialog();
  const { deleteTeam, isLoadingDeleteTeam } = useDeleteTeam({
    afterSuccess: afterDelete,
  });

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
    <Card size="sm">
      <CardBody>
        <VStack>
          <Avatar size={"xl"} src={team.imageUrl} />
          <Heading fontSize={"2xl"}>{team.name}</Heading>
        </VStack>
      </CardBody>
      <Divider />
      <CardFooter display="flex" gap={2}>
        <Button
          onClick={handleDeleteClick}
          colorScheme="red"
          flex={1}
          isLoading={isLoadingDeleteTeam}
          leftIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Button onClick={handleEditClick} flex={1} leftIcon={<EditIcon />}>
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
