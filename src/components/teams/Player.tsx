import {
  Box,
  Button,
  Center,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Switch,
} from "@chakra-ui/react";
import { Field, Form } from "formik";
import useCard from "../../hooks/_shared/useCard";

interface Props {
  index: number;
}
export default function Player({ index }: Props) {
  const card = useCard();
  return (
    <Box {...card}>
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

      <Center mt={4}>
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent={"center"}
        >
          <FormLabel htmlFor="email-alerts" mb="0">
            Hide player?
          </FormLabel>
          <Field
            id="email-alerts"
            name={`players.${index}.isHidden`}
            as={({ ...props }) => <Switch {...props} isChecked={props.value} />}
            colorScheme="red"
          />
        </FormControl>
      </Center>
    </Box>
  );
}
