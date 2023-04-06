import { FormControl, FormLabel, Grid, Input, VStack } from "@chakra-ui/react";
import { Field } from "formik";

export default function GameCycleForm() {
  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel htmlFor="name">Cycle Name</FormLabel>
        <Field as={Input} name="name" placeholder="ex: Cup Final" />
      </FormControl>
      <Grid
        width="100%"
        gap={2}
        gridTemplateColumns="repeat(auto-fit,minmax(10rem, 1fr))"
      >
        <FormControl isRequired>
          <FormLabel htmlFor="timeFrom">From</FormLabel>
          <Field as={Input} name="timeFrom" type="datetime-local" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="timeTo">To</FormLabel>
          <Field as={Input} name="timeTo" type="datetime-local" />
        </FormControl>
      </Grid>
    </VStack>
  );
}
