import { FormControl, FormLabel, Grid, Input, VStack } from "@chakra-ui/react";
import { Field } from "formik";

export default function GameCycleForm() {
  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel htmlFor="name">Cycle Name</FormLabel>
        <Field as={Input} name="name" placeholder="ex: Cup Final" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="budget">Budget</FormLabel>
        <Field as={Input} name="budget" type="number" />
      </FormControl>
      <Grid
        width="100%"
        gap={2}
        gridTemplateColumns="repeat(auto-fit,minmax(10rem, 1fr))"
      >
        <FormControl isRequired>
          <FormLabel htmlFor="fromTime">From</FormLabel>
          <Field as={Input} name="fromTime" type="datetime-local" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="toTime">To</FormLabel>
          <Field as={Input} name="toTime" type="datetime-local" />
        </FormControl>
      </Grid>
    </VStack>
  );
}
