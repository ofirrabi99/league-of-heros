import {
  Badge,
  Box,
  Image,
  Input,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
} from "@chakra-ui/react";
import { memo } from "react";
import { FormattedMessage } from "react-intl";
import { Player } from "../../pages/api/graphql/features/player/player.model";

interface Props {
  player: Player;
  inEditGame?: boolean;
  onClick?: (playerId: Player["_id"]) => void;
  onEditScore?: (playerId: Player["_id"], score: number) => void;
  score?: number;
  picked?: boolean;
}

function PlayerPreview({
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
      <VStack alignItems="flex-start">
        <Image
          src={imageUrl}
          width={150}
          height={200}
          alt={name}
          float="left"
          objectFit="fill"
        />
        <Box>
          <Stat>
            <StatLabel>{name}</StatLabel>
            <StatNumber>${price}</StatNumber>
            {picked && (
              <StatHelpText>
                <Badge variant="subtle" colorScheme="green">
                  <FormattedMessage id="player.picked" />
                </Badge>
              </StatHelpText>
            )}
          </Stat>
        </Box>
        {inEditGame && (
          <Input
            type="number"
            placeholder="0"
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

export default memo(PlayerPreview);
