import { Card, CardHeader, Heading } from "@chakra-ui/react";
import { Cycle } from "../../pages/api/graphql/features/cycles/cycle.model";

interface Props {
  cycle: Cycle;
}
export default function CyclePreview({ cycle }: Props) {
  return (
    <Card align="center">
      <CardHeader>
        <Heading size="md">{cycle.name}</Heading>
      </CardHeader>
    </Card>
  );
}
