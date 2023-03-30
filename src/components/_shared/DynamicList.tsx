import { Grid } from "@chakra-ui/react";

interface Props {
  maxSize: string;
  children: React.ReactNode;
}

export default function DynamicList({ maxSize, children }: Props) {
  return (
    <Grid
      templateColumns={`repeat(auto-fit, minmax(min-content, ${maxSize}))`}
      gap={2}
      justifyContent="center"
      width={"100%"}
    >
      {children}
    </Grid>
  );
}
