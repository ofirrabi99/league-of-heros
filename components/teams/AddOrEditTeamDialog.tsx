import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export type FormData = {
  name: string;
  imageUrl: string;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  loading: boolean;
}
export default function AddOrEditTeamDialog({
  isOpen,
  onClose,
  onSubmit,
  loading,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({});

  return (
    <Modal
      size={"xs"}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <VStack>
              <FormControl isInvalid={Boolean(errors.name)} isRequired>
                <FormLabel>Team Name</FormLabel>
                <Input
                  variant="outline"
                  placeholder="San Antonio Spurs"
                  {...register("name", { required: true })}
                />
              </FormControl>

              <FormControl isInvalid={Boolean(errors.imageUrl)} isRequired>
                <FormLabel>Image URL</FormLabel>
                <Input
                  variant="outline"
                  placeholder="https://..."
                  {...register("imageUrl", { required: true })}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3} isLoading={loading}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
