import { Center } from "@chakra-ui/react";
import Toolbar from "./Toolbar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Toolbar />
      {children}
    </>
  );
}
