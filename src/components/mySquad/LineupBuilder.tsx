import { Button, Heading } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import useSetLineup from "../../hooks/users/useSetLineup";
import { Cycle } from "../../pages/api/graphql/features/cycles/cycle.model";
import { Player } from "../../pages/api/graphql/features/player/player.model";
import Alertify from "../_shared/Alertify";
import DynamicList from "../_shared/DynamicList";
import PlayerPreview from "../_shared/PlayerPreview";
import Progressify from "../_shared/Progressify";
import { FormattedMessage } from "react-intl";

interface Props {
  userChosenPlayers: Player["_id"][];
  players: Player[];
  cycleId?: Cycle["_id"];
  budget: number;
}
export default function LineupBuilder({
  userChosenPlayers,
  players,
  cycleId,
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

  const addPlayer = useCallback(
    (playerId: Player["_id"]) => {
      setChosenPlayersId((prev) => new Set([...prev, playerId]));
    },
    [setChosenPlayersId]
  );

  const removePlayer = useCallback(
    (playerId: Player["_id"]) => {
      setChosenPlayersId((prev) => {
        const newSet = new Set(prev);
        newSet.delete(playerId);
        return newSet;
      });
    },
    [setChosenPlayersId]
  );

  return (
    <>
      <Heading>
        <FormattedMessage id="page.my-squad.lineup.title" />
      </Heading>
      <br />
      {Boolean(chosenPlayers.length) && (
        <>
          <Alertify>
            <FormattedMessage id="page.my-squad.lineup.info.main" />
          </Alertify>
          <br />
          <DynamicList maxSize="30rem">
            <Progressify
              value={lineupCost}
              max={budget}
              colorScheme={isOutOfMoney ? "red" : "yellow"}
            >
              {isOutOfMoney && (
                <FormattedMessage id="page.my-squad.lineup.budget.no-money" />
              )}
              {!isOutOfMoney && (
                <FormattedMessage
                  id="page.my-squad.lineup.budget.left"
                  values={{ value: budget - lineupCost }}
                />
              )}
            </Progressify>
          </DynamicList>
          <br />
        </>
      )}
      {Boolean(!chosenPlayers.length) && (
        <>
          <Alertify status="warning">
            <FormattedMessage id="page.my-squad.lineup.no-players-selected" />
          </Alertify>
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

      <DynamicList maxSize="30rem">
        <Button
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
          <FormattedMessage id="page.my-squad.lineup.save" />
        </Button>
      </DynamicList>
      <br />
      <br />
      <Heading>
        <FormattedMessage id="page.my-squad.lineup.available-players" />
      </Heading>
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
  );
}
