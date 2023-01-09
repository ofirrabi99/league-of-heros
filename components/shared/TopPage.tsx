import { Heading, Text } from "@chakra-ui/react";
import { memo } from "react";

interface Props {
  header: string;
  description?: string;
}

function TopPage({ description, header }: Props) {
  return (
    <>
      <Heading textAlign={"center"} fontSize={"4xl"}>
        {header}
      </Heading>
      <Text textAlign={"center"} fontSize={"lg"} color={"gray.500"}>
        {description}
      </Text>
    </>
  );
}

export default memo(TopPage);
