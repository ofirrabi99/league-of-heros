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
import { FormattedMessage } from "react-intl";
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
          <FormLabel htmlFor={`players.${index}.name`}>
            <FormattedMessage id="general.name" />
          </FormLabel>
          <Field name={`players.${index}.name`} as={Input} />
        </FormControl>

        <FormControl isRequired width={"auto"}>
          <FormLabel htmlFor={`players.${index}.imageUrl`}>
            <FormattedMessage id="general.image" />
          </FormLabel>
          <Field name={`players.${index}.imageUrl`} as={Input} />
        </FormControl>

        <FormControl isRequired width={"auto"}>
          <FormLabel htmlFor={`players.${index}.price`}>
            <FormattedMessage id="general.price" />
          </FormLabel>
          <Field name={`players.${index}.price`} type="number" as={Input} />
        </FormControl>

        <Center mt={4}>
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent={"center"}
          >
            <FormLabel htmlFor="email-alerts" mb="0">
              <FormattedMessage id="page.admin.teams.hide-player" />
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
        <Popover isLazy>
          <PopoverTrigger>
            <Button variant="solid" colorScheme="blue">
              <FormattedMessage id="general.preview" />
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
            <FormattedMessage id="general.delete" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
