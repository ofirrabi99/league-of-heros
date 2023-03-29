import { Alert, AlertIcon, AlertProps, ScaleFade } from "@chakra-ui/react";

interface Props {
  status?: AlertProps["status"];
  children: React.ReactNode;
}

export default function Alertify({ children, status = "info" }: Props) {
  return (
    <ScaleFade in initialScale={0}>
      <Alert status={status}>
        <AlertIcon />
        {children}
      </Alert>
    </ScaleFade>
  );
}
