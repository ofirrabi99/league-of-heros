import {
  Center,
  Flex,
  Grid,
  Progress,
  ProgressProps,
  VStack,
} from "@chakra-ui/react";

interface Props extends ProgressProps {
  children: React.ReactNode;
}

export default function Progressify({
  children,
  colorScheme = "yellow",
  size = "lg",
  ...rest
}: Props) {
  return (
    <Grid gap={3}>
      <Center fontWeight={"bold"} textAlign="center">
        {children}
      </Center>
      <Progress
        colorScheme={colorScheme}
        size={size}
        {...rest}
        sx={{
          "& > div:first-of-type": {
            transition: "all 1s",
          },
        }}
      />
    </Grid>
  );
}
