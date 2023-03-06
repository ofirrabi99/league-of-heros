import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { Form, Formik, Field } from "formik";
import { Team } from "../../pages/api/graphql/features/team/team.model";
import useSetGame from "../../hooks/games/useSetGame";

const TeamsOptions = ({ teams }: { teams: Team[] }) => (
  <>
    {teams.map((team) => (
      <option key={team._id} value={team._id}>
        {team.name}
      </option>
    ))}
  </>
);

export interface FormContext {}

interface Props {
  teams: Team[];
}
export default function GameEdit({ teams }: Props) {
  const initialValues: FormContext = {
    homeTeam: "",
    awayTeam: "",
    time: "",
  };
  const { setGame, isLoadingSetGame } = useSetGame({ isInEditMode: false });
  const onSubmit = useCallback(
    (form: FormContext) => {
      setGame({ variables: { game: form } });
    },
    [setGame]
  );

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values }) => (
        <Form>
          <VStack spacing={3} justifyContent="center" alignItems={"center"}>
            <FormControl isRequired width="auto">
              <FormLabel htmlFor="homeTeam">Home Team</FormLabel>
              <Field as={Select} name="homeTeam" placeholder="Select Home Team">
                <TeamsOptions teams={teams} />
              </Field>
            </FormControl>

            <FormControl isRequired width="auto">
              <FormLabel htmlFor="awayTeam">Away Team</FormLabel>
              <Field as={Select} name="awayTeam" placeholder="Select Away Team">
                <TeamsOptions teams={teams} />
              </Field>
            </FormControl>

            <FormControl isRequired width="auto">
              <FormLabel htmlFor="time">Time</FormLabel>
              <Field as={Input} name="time" type="datetime-local" />
            </FormControl>

            <Button
              type="submit"
              colorScheme="purple"
              isLoading={isLoadingSetGame}
            >
              ADD GAME
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
