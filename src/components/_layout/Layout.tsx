import Toolbar from "./Toolbar";
import useAreYouSureDialog from "../../state/useAreYouSureDialog";
import AreYouSureDialog from "./AreYouSureDialog";
import Loading from "./Loading";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const areYouSureDialog = useAreYouSureDialog();

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
    </>
  );
}
