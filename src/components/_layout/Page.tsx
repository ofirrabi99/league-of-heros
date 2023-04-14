import { Box, Heading, Text } from "@chakra-ui/react";

interface Props {
  title?: string;
  subTitle?: string;
  hideHeader?: boolean;
  children: React.ReactNode;
}

export default function Page({ title, children, subTitle, hideHeader }: Props) {
  return (
    <Box>
      {!hideHeader && (!!title || !!subTitle) && (
        <Box py={2}>
          {!!title && <Heading>{title}</Heading>}
          {!!subTitle && <Text fontSize="xl">{subTitle}</Text>}
        </Box>
      )}
      {children}
    </Box>
  );
}
