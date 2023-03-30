import { useColorModeValue } from "@chakra-ui/react";

export default function useCard() {
  return {
    bg: useColorModeValue("gray.300", "gray.700"),
    padding: "1rem",
    borderRadius: "0.5rem",
  };
}
