import { Center } from "@chakra-ui/react";
import Toolbar from "./Toolbar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Center my="1rem">
        <img src="/logo.svg" alt="logo" />
      </Center>
      <Toolbar />
      {children}
    </>
  );
}
