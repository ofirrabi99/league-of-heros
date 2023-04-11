import Toolbar from "./Toolbar";
import useAreYouSureDialog from "../../state/useAreYouSureDialog";
import useUnexpectedErrorDialog from "../../state/useUnexpectedErrorDialog";
import AreYouSureDialog from "./AreYouSureDialog";
import UnexpectedErrorDialog from "./UnexpectedErrorDialog";
import Loading from "./Loading";
import { useEffect } from "react";
import Router from "next/router";
import useGlobalLoading from "../../state/useGlobalLoading";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const areYouSureDialog = useAreYouSureDialog();
  const uexpectedErrorDialog = useUnexpectedErrorDialog();
  const { isLoading, startLoading, stopLoading } = useGlobalLoading();
  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    Router.events.on("routeChangeError", stopLoading);
    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
      Router.events.off("routeChangeError", stopLoading);
    };
  }, [startLoading, stopLoading]);

  return (
    <>
      <Toolbar />
      <Loading isLoading={isLoading()} />
      {children}
      <AreYouSureDialog
        isOpen={areYouSureDialog.isOpen}
        onClose={areYouSureDialog.onClose}
        onApprove={areYouSureDialog.onApprove}
        title={areYouSureDialog.title}
      >
        {areYouSureDialog.description}
      </AreYouSureDialog>
      <UnexpectedErrorDialog {...uexpectedErrorDialog} />
    </>
  );
}
