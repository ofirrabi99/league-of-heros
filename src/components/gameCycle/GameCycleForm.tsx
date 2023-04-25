import { FormControl, FormLabel, Grid, Input, VStack } from "@chakra-ui/react";
import { Field } from "formik";
import { FormattedMessage } from "react-intl";

export default function GameCycleForm() {
  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel htmlFor="name">
          <FormattedMessage id="page.admin.games.new-popup.name" />
        </FormLabel>
        <Field as={Input} name="name" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="budget">
          <FormattedMessage id="page.admin.games.new-popup.budget" />
        </FormLabel>
        <Field as={Input} name="budget" type="number" />
      </FormControl>
      <Grid
        width="100%"
        gap={2}
        gridTemplateColumns="repeat(auto-fit,minmax(10rem, 1fr))"
      >
        <FormControl isRequired>
          <FormLabel htmlFor="fromTime">
            <FormattedMessage id="page.admin.games.new-popup.from" />
          </FormLabel>
          <Field as={Input} name="fromTime" type="datetime-local" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="toTime">
            <FormattedMessage id="page.admin.games.new-popup.to" />
          </FormLabel>
          <Field as={Input} name="toTime" type="datetime-local" />
        </FormControl>
      </Grid>
    </VStack>
  );
}
