import { TypographyProps } from "@chakra-ui/react";

export default function useBreakpointsAlign() {
  const centerInMobile: TypographyProps["textAlign"] = {
    base: "center",
    md: "start",
  };
  const textAlign = centerInMobile;
  const justifyContent = centerInMobile;
  const alignItems = centerInMobile;

  return { textAlign, justifyContent, alignItems };
}
