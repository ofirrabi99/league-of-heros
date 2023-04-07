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
import { CycleInput } from "../../pages/api/graphql/features/cycles/cycle.types";
import GameCycleForm from "./GameCycleForm";

interface FormContext {
  name: string;
  fromTime: string;
  toTime: string;
}

const initialValues: FormContext = {
  name: "",
  fromTime: "",
  toTime: "",
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddCycle: (cycle: CycleInput) => void;
  isLoading: boolean;
}
export default function GameCycleFormDialog({
  isOpen,
  onClose,
  onAddCycle,
  isLoading,
}: Props) {
  const onSubmit = async (form: FormContext) => {
    onAddCycle({
      ...form,
      fromTime: new Date(form.fromTime),
      toTime: new Date(form.toTime),
    });
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
                <Button
                  colorScheme="purple"
                  mr={3}
                  type="submit"
                  isLoading={isLoading}
                >
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