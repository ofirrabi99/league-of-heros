import {
  Box,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";

interface Props {
  isLoading: boolean;
}
export default function Loading({ isLoading }: Props) {
  return (
    <Modal
      blockScrollOnMount
      isOpen={isLoading}
      onClose={() => {}}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay backdropFilter="blur(30px)" />

      <ModalContent
        alignItems={"center"}
        sx={{
          "& > section:first-of-type": {
            width: "0",
          },
        }}
      >
        <Box position="absolute">
          <Spinner />
        </Box>
      </ModalContent>
    </Modal>
  );
}
