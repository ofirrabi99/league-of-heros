import {
  Badge,
  Box,
  Fade,
  Image,
  Input,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
} from "@chakra-ui/react";
import { Player } from "../../pages/api/graphql/features/player/player.model";

interface Props {
  player: Player;
  inEditGame?: boolean;
  onClick?: (playerId: Player["_id"]) => void;
  onEditScore?: (playerId: Player["_id"], score: number) => void;
  score?: number;
  picked?: boolean;
}

export default function PlayerPreview({
  player,
  onClick,
  inEditGame = false,
  onEditScore,
  score,
  picked = false,
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
          <Stat>
            <StatLabel>{name}</StatLabel>
            <StatNumber>${price}</StatNumber>
            {picked && (
              <StatHelpText>
                <Badge variant="subtle" colorScheme="green">
                  picked
                </Badge>
              </StatHelpText>
            )}
          </Stat>
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
