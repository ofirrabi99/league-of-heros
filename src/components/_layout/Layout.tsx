import useAreYouSureDialog from "../../state/useAreYouSureDialog";
import useUnexpectedErrorDialog from "../../state/useUnexpectedErrorDialog";
import AreYouSureDialog from "./AreYouSureDialog";
import UnexpectedErrorDialog from "./UnexpectedErrorDialog";
import Loading from "./Loading";
import { useEffect } from "react";
import Router from "next/router";
import useGlobalLoading from "../../state/useGlobalLoading";
import SidebarWithHeader from "./Sidebar";
import "nprogress/nprogress.css";
import NProgress from "nprogress";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const areYouSureDialog = useAreYouSureDialog();
  const uexpectedErrorDialog = useUnexpectedErrorDialog();
  const { isLoading } = useGlobalLoading();
  useEffect(() => {
    const startLoading = () => NProgress.start();
    const stopLoading = () => NProgress.done();
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    Router.events.on("routeChangeError", stopLoading);
    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
      Router.events.off("routeChangeError", stopLoading);
    };
  }, []);

  return (
    <>
      <Loading isLoading={isLoading()} />
      <SidebarWithHeader>{children}</SidebarWithHeader>
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
