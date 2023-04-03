import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  FormControl,
  FormLabel,
  Input,
  Switch,
} from "@chakra-ui/react";
import { Field, Form } from "formik";
import useCard from "../../hooks/_shared/useCard";
import { Player as PlayerClass } from "../../pages/api/graphql/features/player/player.model";
import { PlayerInput } from "../../pages/api/graphql/features/player/player.types";
import PlayerPreview from "../_shared/PlayerPreview";

interface Props {
  index: number;
  player: PlayerInput;
}
export default function Player({ index, player }: Props) {
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

      <br />

      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Show Preview
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <PlayerPreview player={player as PlayerClass} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
