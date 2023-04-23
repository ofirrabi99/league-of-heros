import { CheckIcon, SearchIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

interface FeatureProps {
  title: string;
  text: string;
  icon: React.ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack align={"center"} justify={"center"}>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"black"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

export default function Home() {
  return (
    <Container maxW={"5xl"}>
      <Box display="flex" alignItems={"center"} justifyContent="center">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
      </Box>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Are you ready to build your{" "}
          <Text as={"span"} color={"purple.400"}>
            superstar squad
          </Text>{" "}
          and take on the competition?
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Join Superstar Squad today and compete against other fans in your
          favorite sports! Choose your players, track their performance, and
          climb the leaderboard to become the ultimate superstar league
          champion. Sign up now and start building your superstar squad!
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            as={Link}
            href="/my-team"
            rounded={"full"}
            px={6}
            colorScheme="orange"
          >
            Start Building Your Superstar Squad Now!
          </Button>
        </Stack>

        <Box p={4}>
          <Heading fontSize={"3xl"} mb={4}>
            So... How does it work?
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Feature
              icon={<SearchIcon />}
              title={"Pick Players"}
              text={"Pick players from real life games"}
            />
            <Feature
              icon={<ViewIcon />}
              title={"Track Performance"}
              text={
                "Track your chosen players performance to predict your score"
              }
            />
            <Feature
              icon={<CheckIcon />}
              title={"Climb the Leaderboard"}
              text={"Check your place in the leaderboard"}
            />
          </SimpleGrid>
        </Box>
      </Stack>
    </Container>
  );
}
