import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      html: {
        bg: 'url("/background.png") no-repeat scroll center 0',
      },
      body: {
        bg: "transparent",
      },
    },
  },
});

export default theme;
