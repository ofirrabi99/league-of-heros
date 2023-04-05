import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function UnexpectedErrorDialog({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs" isCentered>
      <ModalOverlay />
      <ModalContent bgColor={"red.600"} color="white">
        <ModalHeader>We have a little problem.</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Please try again later while we fix the issue.</ModalBody>
      </ModalContent>
    </Modal>
  );
}
