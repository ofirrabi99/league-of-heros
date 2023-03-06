import { Box, Heading } from "@chakra-ui/react";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export default function Page({ title, children }: Props) {
  return (
    <Box p={3}>
      {title && (
        <Heading p={3} textAlign={"center"}>
          {title}
        </Heading>
      )}
      {children}
    </Box>
  );
}
