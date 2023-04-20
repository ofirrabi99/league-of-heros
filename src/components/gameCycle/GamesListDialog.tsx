import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Game as GameClass } from "../../pages/api/graphql/features/games/game.model";
import Game from "../games/Game";
import DynamicList from "../_shared/DynamicList";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  games: GameClass[];
  cycleName: string;
}
export default function GamesListDialog({
  isOpen,
  onClose,
  games,
  cycleName,
}: Props) {
  useEffect(() => {
    if (!games.length) onClose();
  }, [games]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "xs", md: "lg" }}
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Games in {cycleName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <DynamicList maxSize="50rem">
            {games.map((game) => (
              <Game key={game._id} game={game} />
            ))}
          </DynamicList>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
