import { Box, Heading, Text } from "@chakra-ui/react";
import DynamicList from "../_shared/DynamicList";

interface Props {
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
}

export default function Page({ title, children, subTitle }: Props) {
  return (
    <Box>
      {(!!title || !!subTitle) && (
        <Box py={2}>
          {!!title && <Heading>{title}</Heading>}
          {!!subTitle && <Text fontSize="xl">{subTitle}</Text>}
        </Box>
      )}
      <DynamicList maxSize="75rem">{children}</DynamicList>
    </Box>
  );
}
