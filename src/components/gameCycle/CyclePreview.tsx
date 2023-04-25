import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { Cycle } from "../../pages/api/graphql/features/cycles/cycle.model";
import useAreYouSureDialog from "../../state/useAreYouSureDialog";
import GamesListDialog from "./GamesListDialog";

interface Props {
  cycle: Cycle;
  onDeleteCycle: (cycleId: Cycle["_id"]) => void;
}
export default function CyclePreview({ cycle, onDeleteCycle }: Props) {
  const router = useRouter();
  const { fire: fireAreYouSureDialog } = useAreYouSureDialog();
  const gamesListProps = useDisclosure();

  const onDeleteClick = () => {
    fireAreYouSureDialog(
      {
        title: `Delete ${cycle.name}?`,
        description: "Are you sure? You can't undo this action afterwards.",
      },
      () => onDeleteCycle(cycle._id)
    );
  };

  const onAddGameClick = () => {
    router.push({
      pathname: "/admin/games/add",
      query: { cycleId: cycle._id },
    });
  };

  return (
    <>
      <Card size="sm" textAlign={"center"}>
        <CardHeader>
          <Heading size="md">{cycle.name}</Heading>
        </CardHeader>
        <CardBody>
          <Text fontSize="xl">{cycle.budget}$</Text>
          <Button
            variant="link"
            onClick={gamesListProps.onOpen}
            isDisabled={!cycle.games?.length}
          >
            <FormattedMessage
              id="page.admin.games.game-amount"
              values={{ value: cycle.games?.length ?? 0 }}
            />
          </Button>
          <Text>{new Date(cycle.fromTime).toLocaleString("he-IL")}</Text>
          <Text>-</Text>
          <Text>{new Date(cycle.toTime).toLocaleString("he-IL")}</Text>
        </CardBody>
        <Divider />
        <CardFooter display="flex" gap={2}>
          <Button
            colorScheme="red"
            onClick={onDeleteClick}
            leftIcon={<DeleteIcon />}
            flex={1}
          >
            <FormattedMessage id="general.delete" />
          </Button>
          <Button onClick={onAddGameClick} leftIcon={<AddIcon />} flex={1}>
            <FormattedMessage id="page.admin.games.add-game" />
          </Button>
        </CardFooter>
      </Card>
      <GamesListDialog
        games={cycle.games ?? []}
        cycleName={cycle.name}
        {...gamesListProps}
      />
    </>
  );
}
