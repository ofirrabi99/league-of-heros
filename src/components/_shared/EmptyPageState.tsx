import { EditIcon } from "@chakra-ui/icons";
import { Button, Text, VStack } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";

interface Props {
  title: string;
  description: string;
  action: string;
  onClick: () => void;
}
export default function EmptyPageState({
  action,
  description,
  title,
  onClick,
}: Props) {
  return (
    <VStack
      textAlign="center"
      gap={4}
      position="absolute"
      top="50%"
      left="50%"
      transform="translateY(-50%) translateX(-50%)"
      width="100%"
      padding={4}
    >
      <EditIcon boxSize={16} />
      <Text fontSize="2xl" fontWeight="bold">
        <FormattedMessage id={title} />
      </Text>
      <Text fontSize="lg">
        <FormattedMessage id={description} />
      </Text>
      <Button onClick={onClick}>
        <FormattedMessage id={action} />
      </Button>
    </VStack>
  );
}
