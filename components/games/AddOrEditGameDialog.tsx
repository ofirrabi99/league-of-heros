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
  Select,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Game from "../../pages/api/graphql/game/game.model";
import Team from "../../pages/api/graphql/team/team.model";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export interface FormData {
  date: string;
  homeTeam: string;
  awayTeam: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  loading: boolean;
  teams: Team[];
  gameToUpdate?: Game;
}
export default function AddOrEditGameDialog({
  isOpen,
  onClose,
  onSubmit,
  loading,
  gameToUpdate,
  teams,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormData>();

  useEffect(() => {
    reset({
      date: gameToUpdate?.date || new Date().toISOString(),
      homeTeam: gameToUpdate?.teams[0]?._id.toString(),
      awayTeam: gameToUpdate?.teams[1]?._id.toString(),
    });
  }, [gameToUpdate, isOpen, reset]);

  const teamsList = teams.map((team) => (
    <option key={team._id.toString()} value={team._id.toString()}>
      {team.name}
    </option>
  ));

  return (
    <Modal
      size={"xs"}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{gameToUpdate ? "Update" : "Create"} game</ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <VStack>
              <FormControl isInvalid={Boolean(errors.date)} isRequired>
                <FormLabel>Date</FormLabel>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="Select date"
                      onChange={(date) => field.onChange(date?.toISOString())}
                      selected={new Date(field.value)}
                      showTimeInput
                      dateFormat="MMMM d, yyyy h:mm aa"
                      customInput={<Input />}
                    />
                  )}
                />
              </FormControl>

              <FormControl isInvalid={Boolean(errors.homeTeam)} isRequired>
                <FormLabel>Home Team</FormLabel>
                <Select
                  {...register("homeTeam")}
                  placeholder="Select home team"
                >
                  {teamsList}
                </Select>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.awayTeam)} isRequired>
                <FormLabel>Away Team</FormLabel>
                <Select
                  {...register("awayTeam")}
                  placeholder="Select away team"
                >
                  {teamsList}
                </Select>
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
