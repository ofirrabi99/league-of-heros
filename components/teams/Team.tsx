import {
  Avatar,
  Button,
  Heading,
  HStack,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import TeamModel from "../../pages/api/graphql/team/team.model";

interface Props extends Partial<TeamModel> {
  name: string;
  imageUrl: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
}
export default function Team({
  name,
  imageUrl,
  onEditClick,
  onDeleteClick,
}: Props) {
  return (
    <VStack
      bg={useColorModeValue("gray.200", "gray.700")}
      rounded={"lg"}
      p={6}
      textAlign={"center"}
      justifyContent="space-between"
    >
      <Avatar size={"xl"} src={imageUrl} />
      <Heading fontSize={"2xl"}>{name}</Heading>

      <HStack mt={8} spacing={4}>
        <Button
          onClick={onDeleteClick}
          colorScheme="red"
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
        >
          Delete
        </Button>
        <Button
          onClick={onEditClick}
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
