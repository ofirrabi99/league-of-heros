import { Box, Fade, Spinner } from "@chakra-ui/react";
import Router from "next/router";
import { useEffect, useState } from "react";

export default function Loading() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
    Router.events.on("routeChangeError", () => setLoading(false));
    return () => {
      Router.events.off("routeChangeStart", () => setLoading(true));
      Router.events.off("routeChangeComplete", () => setLoading(false));
      Router.events.off("routeChangeError", () => setLoading(false));
    };
  }, [Router.events]);

  return (
    <Box
      top={0}
      position="absolute"
      height="100dvh"
      width="100dvw"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={2}
      backdropFilter="blur(30px)"
      visibility={loading ? "visible" : "hidden"}
    >
      <Spinner />
    </Box>
  );
}
