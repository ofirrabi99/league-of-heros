import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Switch,
} from "@chakra-ui/react";
import { Field } from "formik";
import { Player as PlayerClass } from "../../pages/api/graphql/features/player/player.model";
import { PlayerInput } from "../../pages/api/graphql/features/player/player.types";
import PlayerPreview from "../_shared/PlayerPreview";

interface Props {
  index: number;
  player: PlayerInput;
  remove: (index: number) => void;
}
export default function Player({ index, player, remove }: Props) {
  return (
    <Card>
      <CardBody>
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
              as={({ ...props }) => (
                <Switch {...props} isChecked={props.value} />
              )}
              colorScheme="red"
            />
          </FormControl>
        </Center>
      </CardBody>
      <CardFooter justify="space-around">
        {/* <Accordion allowToggle>
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
        </Accordion> */}
        <Popover isLazy>
          <PopoverTrigger>
            <Button variant="solid" colorScheme="blue">
              Preview
            </Button>
          </PopoverTrigger>
          <PopoverContent width="auto">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <PlayerPreview player={player as PlayerClass} />
            </PopoverBody>
          </PopoverContent>
        </Popover>
        {!player._id && (
          <Button
            onClick={() => remove(index)}
            variant="ghost"
            colorScheme="red"
          >
            Remove
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
