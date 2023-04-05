import Toolbar from "./Toolbar";
import useAreYouSureDialog from "../../state/useAreYouSureDialog";
import useUnexpectedErrorDialog from "../../state/useUnexpectedErrorDialog";
import AreYouSureDialog from "./AreYouSureDialog";
import UnexpectedErrorDialog from "./UnexpectedErrorDialog";
import Loading from "./Loading";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const areYouSureDialog = useAreYouSureDialog();
  const uexpectedErrorDialog = useUnexpectedErrorDialog();

  return (
    <>
      <Toolbar />
      <Loading />
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
