import { Button, Text, VStack } from "@chakra-ui/react";

export default function EmptyState() {
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
      <Text fontSize="2xl" fontWeight="bold">
        Start building your teams!
      </Text>
      <Text fontSize="lg">
        Before we can create games, we will first need to add all our league
        teams to the system.
      </Text>
      <Button colorScheme="purple">Add Your First Team</Button>
    </VStack>
  );
}
