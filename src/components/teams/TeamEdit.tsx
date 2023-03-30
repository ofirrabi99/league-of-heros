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

export interface FormContext {
  name: string;
  imageUrl: string;
  players: PlayerInput[];
}

interface Props {
  team?: Team;
}
export default function TeamEdit({ team }: Props) {
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values }) => (
        <Form>
          <VStack spacing={3} justifyContent="center" alignItems={"center"}>
            <FormControl isRequired width="auto">
              <FormLabel htmlFor="name">Team Name</FormLabel>
              <Field as={Input} name="name" placeholder="San Antonio Spurs" />
            </FormControl>

            <FormControl isRequired width="auto">
              <FormLabel htmlFor="imageUrl">Image URL</FormLabel>
              <Field as={Input} name="imageUrl" placeholder="https://" />
            </FormControl>

            <h2>Players:</h2>
            <FieldArray name="players" validateOnChange>
              {({ push }) => (
                <>
                  <DynamicList maxSize="15rem">
                    {values.players.map((_player, playerIndex) => (
                      <Player index={playerIndex} key={playerIndex} />
                    ))}
                  </DynamicList>

                  <Button
                    colorScheme="green"
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
                    ADD PLAYER
                  </Button>
                </>
              )}
            </FieldArray>

            <Button
              type="submit"
              colorScheme="purple"
              isLoading={isLoadingSetTeam}
            >
              {isInEditMode ? "UPDATE" : "ADD"} TEAM
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
