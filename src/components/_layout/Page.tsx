import { Box, Heading, Text } from "@chakra-ui/react";
import useBreakpointsAlign from "../../hooks/_shared/useBreakpointsAlign";

interface Props {
  title?: string;
  subTitle?: string;
  hideHeader?: boolean;
  children: React.ReactNode;
}

export default function Page({ title, children, subTitle, hideHeader }: Props) {
  const { textAlign } = useBreakpointsAlign();
  return (
    <Box>
      {!hideHeader && (!!title || !!subTitle) && (
        <Box py={2}>
          {!!title && <Heading textAlign={textAlign}>{title}</Heading>}
          {!!subTitle && (
            <Text fontSize="xl" textAlign={textAlign}>
              {subTitle}
            </Text>
          )}
        </Box>
      )}
      {children}
    </Box>
  );
}
