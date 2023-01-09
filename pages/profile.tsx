import { useMutation } from "@apollo/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import client, { injectCookies } from "../lib/apolloClient";
import { GET_USER, SET_USER } from "../queries/user";
import type { UserCredentials } from "../types/auth0-types";
import type User from "./api/graphql/user/user.model";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    injectCookies(ctx.req.headers.cookie);

    const {
      data: { user },
    } = await client.query({
      query: GET_USER,
    });

    return {
      props: { data: user },
    };
  },
});

interface Props {
  data?: User;
  user: UserCredentials;
}

type FormData = {
  coachName: string;
  teamName: string;
};

export default function Profile({ data: user, user: userCredentials }: Props) {
  const router = useRouter();
  const [addUser, { data, loading, error }] = useMutation(SET_USER);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      coachName: user?.coachName || userCredentials.name,
      teamName: user?.teamName,
    },
  });

  const onSubmit = (data: FormData) => {
    addUser({
      variables: { user: data },
    }).then(() => {
      router.push("/my-team");
    });
  };

  return (
    <>
      <Heading textAlign={"center"} fontSize={"4xl"}>
        Change the way other coaches see you 👀
      </Heading>
      <Text textAlign={"center"} fontSize={"lg"} color={"gray.500"}>
        You can always chane it later ✍
      </Text>

      <br />
      <br />

      <Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <FormControl isInvalid={Boolean(errors.coachName)} isRequired>
              <FormLabel>Coach Name</FormLabel>
              <Input
                variant="outline"
                placeholder="Gregg Popovich"
                {...register("coachName", { required: true })}
              />
            </FormControl>

            <FormControl isInvalid={Boolean(errors.teamName)} isRequired>
              <FormLabel>Team Name</FormLabel>
              <Input
                variant="outline"
                placeholder="San Antonio Spurs"
                {...register("teamName", { required: true })}
              />
            </FormControl>

            <Button colorScheme={"purple"} type="submit" isDisabled={loading}>
              SAVE
            </Button>
          </Stack>
        </form>
      </Center>
    </>
  );
}
