import { CheckIcon, SearchIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { languages } from "../lang";

interface FeatureProps {
  title: React.ReactElement;
  text: React.ReactElement;
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

interface LanguageProps {
  name: string;
  id: string;
}

const Language = ({ name, id }: LanguageProps) => {
  return (
    <Button colorScheme="gray" as={Link} href={"/"} locale={id}>
      {name}
    </Button>
  );
};

export default function Home() {
  const { locale } = useRouter();
  useEffect(() => {
    console.log(locale);
    document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
  }, [locale]);
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
          <FormattedMessage id="page.home.header1" />{" "}
          <Text as={"span"} color={"purple.400"}>
            <FormattedMessage id="general.brand" />
          </Text>{" "}
          <FormattedMessage id="page.home.header2" />
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          <FormattedMessage id="page.home.description" />
        </Text>
        <VStack spacing={6}>
          <Button
            as={Link}
            href="/my-squad"
            p={6}
            colorScheme="orange"
            whiteSpace={"normal"}
          >
            <FormattedMessage id="page.home.cta" />
          </Button>
          <HStack>
            {languages.map((lang) => (
              <Language key={lang.id} name={lang.name} id={lang.id} />
            ))}
          </HStack>
        </VStack>

        <Box p={4}>
          <Heading fontSize={"3xl"} mb={4}>
            <FormattedMessage id="page.home.features.title" />
          </Heading>
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={10}
            alignItems="start"
          >
            <Feature
              icon={<SearchIcon />}
              title={<FormattedMessage id="page.home.features1.title" />}
              text={<FormattedMessage id="page.home.features1.description" />}
            />
            <Feature
              icon={<ViewIcon />}
              title={<FormattedMessage id="page.home.features2.title" />}
              text={<FormattedMessage id="page.home.features2.description" />}
            />
            <Feature
              icon={<CheckIcon />}
              title={<FormattedMessage id="page.home.features3.title" />}
              text={<FormattedMessage id="page.home.features3.description" />}
            />
          </SimpleGrid>
        </Box>
      </Stack>
    </Container>
  );
}
