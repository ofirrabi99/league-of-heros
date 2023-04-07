import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Cycle } from "../../pages/api/graphql/features/cycles/cycle.model";
import useAreYouSureDialog from "../../state/useAreYouSureDialog";

interface Props {
  cycle: Cycle;
  onDeleteCycle: (cycleId: Cycle["_id"]) => void;
}
export default function CyclePreview({ cycle, onDeleteCycle }: Props) {
  const { fire: fireAreYouSureDialog } = useAreYouSureDialog();

  const onDeleteClick = () => {
    fireAreYouSureDialog(
      { title: `Delete ${cycle.name}?`, description: "Are you sure?" },
      () => onDeleteCycle(cycle._id)
    );
  };

  return (
    <Card align="center" size="sm">
      <CardHeader>
        <Heading size="md">{cycle.name}</Heading>
      </CardHeader>
      <CardBody textAlign={"center"}>
        <Text>{new Date(cycle.fromTime).toLocaleString()}</Text>
        <Text>-</Text>
        <Text>{new Date(cycle.toTime).toLocaleString()}</Text>
      </CardBody>
      <CardFooter>
        <Button colorScheme="red" onClick={onDeleteClick}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
