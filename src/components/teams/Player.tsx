import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Field } from "formik";

interface Props {
  index: number;
}
export default function Player({ index }: Props) {
  return (
    <>
      <FormControl isRequired width={"auto"}>
        <FormLabel htmlFor={`players.${index}.name`}>Name</FormLabel>
        <Field
          name={`players.${index}.name`}
          placeholder="Tim Duncen"
          as={Input}
        />
      </FormControl>

      <FormControl isRequired width={"auto"}>
        <FormLabel htmlFor={`players.${index}.imageUrl`}>Image</FormLabel>
        <Field
          name={`players.${index}.imageUrl`}
          placeholder="https://"
          as={Input}
        />
      </FormControl>

      <FormControl isRequired width={"auto"}>
        <FormLabel htmlFor={`players.${index}.price`}>Price</FormLabel>
        <Field
          name={`players.${index}.price`}
          placeholder="1"
          type="number"
          as={Input}
        />
      </FormControl>
    </>
  );
}
