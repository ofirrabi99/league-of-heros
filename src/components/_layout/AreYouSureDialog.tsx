import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FormattedMessage } from "react-intl";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  title?: string;
  children?: string;
}
export default function AreYouSureDialog({
  isOpen,
  onClose,
  onApprove,
  title,
  children,
}: Props) {
  const cancelRef = useRef(null);

  const handleApprove = () => {
    onApprove();
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      size="xs"
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{children}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} colorScheme="gray">
              <FormattedMessage id="general.cancel" />
            </Button>
            <Button colorScheme="red" onClick={handleApprove} ml={3}>
              <FormattedMessage id="general.yes" />
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
