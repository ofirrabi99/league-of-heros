import {
  extendTheme,
  type ThemeConfig,
  withDefaultProps,
} from "@chakra-ui/react";

const theme: ThemeConfig = extendTheme({
  components: {
    Button: {
      defaultProps: {
        colorScheme: "purple",
      },
    },
  },
});

export default theme;
