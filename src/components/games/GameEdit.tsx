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
import { Cycle } from "../../pages/api/graphql/features/cycles/cycle.model";
import useBreakpointsAlign from "../../hooks/_shared/useBreakpointsAlign";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

const TeamsOptions = ({ teams }: { teams: Team[] }) => (
  <>
    {teams.map((team) => (
      <option key={team._id} value={team._id}>
        {team.name}
      </option>
    ))}
  </>
);

const CyclesOptions = ({ cycles }: { cycles: Cycle[] }) => (
  <>
    {cycles.map((cycle) => (
      <option key={cycle._id} value={cycle._id}>
        {cycle.name}
      </option>
    ))}
  </>
);

export interface FormContext {
  homeTeam: string;
  awayTeam: string;
  time: string;
  cycle: string;
}

interface Props {
  teams: Team[];
  cycles: Cycle[];
}
export default function GameEdit({ teams, cycles }: Props) {
  const router = useRouter();
  const initialValues: FormContext = {
    homeTeam: "",
    awayTeam: "",
    time: "",
    cycle: (router.query.cycleId as string) ?? "",
  };
  const { alignItems } = useBreakpointsAlign();

  const { setGame, isLoadingSetGame } = useSetGame();
  const onSubmit = useCallback(
    (form: FormContext) => {
      setGame({ variables: { game: { ...form, time: new Date(form.time) } } });
    },
    [setGame]
  );

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values }) => (
        <Form>
          <VStack spacing={3} justifyContent="center" alignItems={alignItems}>
            <FormControl isRequired width="auto">
              <FormLabel htmlFor="homeTeam">
                <FormattedMessage id="general.home-team" />
              </FormLabel>
              <Field as={Select} name="homeTeam" placeholder=" ">
                <TeamsOptions teams={teams} />
              </Field>
            </FormControl>

            <FormControl isRequired width="auto">
              <FormLabel htmlFor="awayTeam">
                <FormattedMessage id="general.away-team" />
              </FormLabel>
              <Field as={Select} name="awayTeam" placeholder=" ">
                <TeamsOptions teams={teams} />
              </Field>
            </FormControl>

            <FormControl isRequired width="auto">
              <FormLabel htmlFor="cycle">
                <FormattedMessage id="general.cycle" />
              </FormLabel>
              <Field as={Select} name="cycle" placeholder=" ">
                <CyclesOptions cycles={cycles} />
              </Field>
            </FormControl>

            <FormControl isRequired width="auto">
              <FormLabel htmlFor="time">
                <FormattedMessage id="general.time" />
              </FormLabel>
              <Field
                as={Input}
                isDisabled={Boolean(!values.cycle)}
                name="time"
                type="datetime-local"
                min={
                  values.cycle
                    ? new Date(
                        cycles.find((cycle) => cycle._id === values.cycle)
                          ?.fromTime ?? new Date()
                      )
                        .toLocaleString("sv")
                        .split(" ")
                        .join("T")
                    : undefined
                }
                max={
                  values.cycle
                    ? new Date(
                        cycles.find((cycle) => cycle._id === values.cycle)
                          ?.toTime ?? new Date()
                      )
                        .toLocaleString("sv")
                        .split(" ")
                        .join("T")
                    : undefined
                }
              />
            </FormControl>

            <Button type="submit" isLoading={isLoadingSetGame}>
              <FormattedMessage id="page.admin.games.add-game" />
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
