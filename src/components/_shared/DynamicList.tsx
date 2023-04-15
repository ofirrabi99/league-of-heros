import { Grid } from "@chakra-ui/react";
import useBreakpointsAlign from "../../hooks/_shared/useBreakpointsAlign";

interface Props {
  maxSize: string;
  children: React.ReactNode;
}

export default function DynamicList({ maxSize, children }: Props) {
  const { justifyContent } = useBreakpointsAlign();

  return (
    <Grid
      templateColumns={`repeat(auto-fit, minmax(min-content, ${maxSize}))`}
      gap={2}
      width={"100%"}
      justifyContent={justifyContent}
    >
      {children}
    </Grid>
  );
}
