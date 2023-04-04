import { Box, Heading, Text } from "@chakra-ui/react";

interface Props {
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
}

export default function Page({ title, children, subTitle }: Props) {
  return (
    <Box p={3}>
      <Box p={2}>
        {!!title && <Heading textAlign={"center"}>{title}</Heading>}
        {!!subTitle && (
          <Text fontSize="xl" textAlign={"center"}>
            {subTitle}
          </Text>
        )}
      </Box>
      {children}
    </Box>
  );
}
