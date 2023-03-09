import { Box, Image, Input, Text, VStack } from "@chakra-ui/react";
import { Player } from "../../pages/api/graphql/features/player/player.model";

interface Props {
  player: Player;
  inEditGame?: boolean;
  onClick?: (playerId: Player["_id"]) => void;
  onEditScore?: (playerId: Player["_id"], score: number) => void;
  score?: number;
}

export default function PlayerPreview({
  player,
  onClick,
  inEditGame = false,
  onEditScore,
  score,
}: Props) {
  const { _id, imageUrl, name, price } = player;

  return (
    <Box
      p={4}
      borderRadius="md"
      cursor="pointer"
      onClick={onClick ? () => onClick(_id) : undefined}
    >
      <VStack mb={2} alignItems="flex-start">
        <Image src={imageUrl} objectFit="cover" alt={name} />
        <Box>
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="lg" fontWeight="bold">
            ${price}
          </Text>
        </Box>
        {inEditGame && (
          <Input
            type="number"
            placeholder="Score"
            value={score}
            onChange={(event) => {
              if (onEditScore)
                onEditScore(player._id, event.target.valueAsNumber);
            }}
          />
        )}
      </VStack>
    </Box>
  );
}
