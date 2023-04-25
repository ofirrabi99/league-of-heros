import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { Team } from "../../pages/api/graphql/features/team/team.model";
import useSetTeam from "../../hooks/teams/useSetTeam";
import { Form, Formik, Field, FieldArray } from "formik";
import { PlayerInput } from "../../pages/api/graphql/features/player/player.types";
import Player from "./Player";
import DynamicList from "../_shared/DynamicList";
import useBreakpointsAlign from "../../hooks/_shared/useBreakpointsAlign";
import Alertify from "../_shared/Alertify";
import { FormattedMessage } from "react-intl";

export interface FormContext {
  name: string;
  imageUrl: string;
  players: PlayerInput[];
}

interface Props {
  team?: Team;
}
export default function TeamEdit({ team }: Props) {
  const { alignItems } = useBreakpointsAlign();
  const initialValues: FormContext = {
    name: team?.name ?? "",
    imageUrl: team?.imageUrl ?? "",
    players: (team?.players as PlayerInput[]) || [],
  };
  const isInEditMode = Boolean(team);
  const { setTeam, isLoadingSetTeam } = useSetTeam({ isInEditMode });

  const onSubmit = useCallback(
    ({ name, imageUrl, players }: FormContext) => {
      setTeam({
        variables: {
          team: { _id: team?._id ?? null, name, imageUrl, players },
        },
      });
    },
    [setTeam, team?._id]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values }) => (
        <Form>
          <VStack spacing={3} alignItems={alignItems}>
            <FormControl isRequired width="auto">
              <FormLabel htmlFor="name">
                <FormattedMessage id="page.admin.teams.team-name" />
              </FormLabel>
              <Field as={Input} name="name" />
            </FormControl>

            <FormControl isRequired width="auto">
              <FormLabel htmlFor="imageUrl">
                <FormattedMessage id="page.admin.teams.image-url" />
              </FormLabel>
              <Field as={Input} name="imageUrl" />
            </FormControl>

            <FormLabel>
              <FormattedMessage id="page.admin.teams.players" />
            </FormLabel>
            {values.players.length === 0 && (
              <Alertify status="error">
                <FormattedMessage id="page.admin.teams.no-players" />
              </Alertify>
            )}
            <FieldArray name="players" validateOnChange>
              {({ push, remove }) => (
                <>
                  <DynamicList maxSize="15rem">
                    {values.players.map((player, playerIndex) => (
                      <Player
                        index={playerIndex}
                        key={playerIndex}
                        player={player}
                        remove={remove}
                      />
                    ))}
                  </DynamicList>

                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      const newPlayer: PlayerInput = {
                        name: "",
                        imageUrl: "",
                        price: 1,
                        isHidden: false,
                      };
                      push(newPlayer);
                    }}
                  >
                    <FormattedMessage id="page.admin.teams.add-player" />
                  </Button>
                </>
              )}
            </FieldArray>

            <Button type="submit" isLoading={isLoadingSetTeam}>
              {isInEditMode ? (
                <FormattedMessage id="general.update" />
              ) : (
                <FormattedMessage id="general.create" />
              )}{" "}
              <FormattedMessage id="general.team" />
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
