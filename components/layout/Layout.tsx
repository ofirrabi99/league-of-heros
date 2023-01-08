import { Center } from "@chakra-ui/react";
import Toolbar from "./Toolbar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Center m="1rem 0">
        <img src="/logo.svg" alt="logo" />
      </Center>
      <Toolbar />
      {children}
    </>
  );
}
