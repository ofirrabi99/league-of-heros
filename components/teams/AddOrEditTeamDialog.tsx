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
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import PlayerModel from "../../pages/api/graphql/player/player.model";
import Team from "../../pages/api/graphql/team/team.model";

class PlayerObj implements PlayerModel {
  _id!: string;
  name!: string;
  imageUrl!: string;
  price!: number;
  team!: string;
}

export interface FormData {
  name: string;
  imageUrl: string;
  players: PlayerObj[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  loading: boolean;
  teamToUpdate?: Team;
}
export default function AddOrEditTeamDialog({
  isOpen,
  onClose,
  onSubmit,
  loading,
  teamToUpdate,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormData>();
  const {
    fields: players,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
  } = useFieldArray({
    name: "players",
    control,
  });

  useEffect(() => {
    reset({
      name: teamToUpdate?.name,
      imageUrl: teamToUpdate?.imageUrl,
      players: (teamToUpdate?.players as PlayerObj[]) || [],
    });
  }, [teamToUpdate, isOpen, reset]);

  return (
    <Modal
      size={"lg"}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{teamToUpdate ? "Update" : "Create"} team</ModalHeader>
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

              <FormControl>
                <FormLabel>Players</FormLabel>
                <Button
                  width={"100%"}
                  colorScheme="purple"
                  onClick={() =>
                    prepend({
                      _id: "",
                      name: "Name",
                      imageUrl: "",
                      team: teamToUpdate?._id || "",
                      price: 0,
                    })
                  }
                >
                  ADD NEW PLAYER
                </Button>
                {players.map((player, index) => (
                  <Input
                    variant="outline"
                    key={player._id || index}
                    {...register(`players.${index}.name` as const)}
                  />
                ))}
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
