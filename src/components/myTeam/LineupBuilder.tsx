import { Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSetLineup from "../../hooks/users/useSetLineup";
import { Cycle } from "../../pages/api/graphql/features/cycles/cycle.model";
import { Player } from "../../pages/api/graphql/features/player/player.model";
import Alertify from "../_shared/Alertify";
import DynamicList from "../_shared/DynamicList";
import PlayerPreview from "../_shared/PlayerPreview";
import Progressify from "../_shared/Progressify";

interface Props {
  userChosenPlayers: Player["_id"][];
  players: Player[];
  cycleId?: Cycle["_id"];
  isTransferWindowOpen: boolean;
  budget: number;
}
export default function LineupBuilder({
  userChosenPlayers,
  players,
  cycleId,
  isTransferWindowOpen,
  budget,
}: Props) {
  const [chosenPlayersId, setChosenPlayersId] = useState<Set<Player["_id"]>>(
    new Set()
  );

  const { setLineup, isLoadingSetLineup } = useSetLineup();

  const chosenPlayers = players.filter((player) =>
    chosenPlayersId.has(player._id)
  );

  useEffect(() => {
    setChosenPlayersId(new Set(userChosenPlayers));
  }, [userChosenPlayers]);

  const lineupCost = chosenPlayers.reduce(
    (prev, current) => prev + current.price,
    0
  );
  const isOutOfMoney = budget < lineupCost;

  const addPlayer = (playerId: Player["_id"]) => {
    setChosenPlayersId((prev) => new Set([...prev, playerId]));
  };

  const removePlayer = (playerId: Player["_id"]) => {
    setChosenPlayersId((prev) => {
      const newSet = new Set(prev);
      newSet.delete(playerId);
      return newSet;
    });
  };

  return (
    <>
      <Heading>Your Lineup</Heading>
      <br />
      {Boolean(chosenPlayers.length) && (
        <>
          <Alertify>
            Choose as many players as you want, as long as you stay within your
            budget.
          </Alertify>
          <br />
          <DynamicList maxSize="30rem">
            <Progressify
              value={lineupCost}
              max={budget}
              colorScheme={isOutOfMoney ? "red" : "yellow"}
            >
              {isOutOfMoney &&
                `Money's tight, it's time to cut some players and set things right`}
              {!isOutOfMoney && `${budget - lineupCost}$ left`}
            </Progressify>
          </DynamicList>
          <br />
        </>
      )}
      {Boolean(!chosenPlayers.length) && (
        <>
          <Alertify status="warning">No players selected yet</Alertify>
          <br />
        </>
      )}
      <DynamicList maxSize="10rem">
        {chosenPlayers.map((player) => (
          <PlayerPreview
            key={player._id}
            player={player}
            onClick={removePlayer}
          />
        ))}
      </DynamicList>
      {isTransferWindowOpen && (
        <>
          <DynamicList maxSize="30rem">
            <Button
              colorScheme="purple"
              isDisabled={isOutOfMoney}
              isLoading={isLoadingSetLineup}
              width="100%"
              onClick={() => {
                setLineup({
                  variables: {
                    lineup: {
                      cycle: cycleId,
                      players: Array.from(chosenPlayersId).map((player) => ({
                        playerId: player,
                        score: 0,
                      })),
                    },
                  },
                });
              }}
            >
              SAVE LINEUP
            </Button>
          </DynamicList>
          <br />
          <br />
          <Heading>Available Players</Heading>
          <DynamicList maxSize="10rem">
            {players.map((player) => (
              <PlayerPreview
                key={player._id}
                player={player}
                onClick={addPlayer}
                picked={chosenPlayersId.has(player._id)}
              />
            ))}
          </DynamicList>
        </>
      )}
    </>
  );
}
