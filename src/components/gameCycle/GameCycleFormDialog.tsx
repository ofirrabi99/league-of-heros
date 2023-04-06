import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import GameCycleForm from "./GameCycleForm";

interface FormContext {
  name: string;
  timeFrom: string;
  timeTo: string;
}

const initialValues: FormContext = {
  name: "",
  timeFrom: "",
  timeTo: "",
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export default function GameCycleFormDialog({ isOpen, onClose }: Props) {
  const onSubmit = (form: FormContext) => {
    console.log(form);
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "xs", md: "lg" }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Game Cycle</ModalHeader>
        <ModalCloseButton />
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {() => (
            <Form>
              <ModalBody pb={6}>
                <GameCycleForm />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="purple" mr={3} type="submit">
                  Add
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}
