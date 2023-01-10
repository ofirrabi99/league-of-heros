import { useMutation } from "@apollo/client";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import TopPage from "../components/shared/TopPage";
import client from "../lib/apolloClient";
import { requireAuth } from "../lib/auth0";
import { GET_USER, SET_USER } from "../queries/user";
import type { UserCredentials } from "../types/auth0-types";
import type User from "./api/graphql/user/user.model";

export const getServerSideProps = requireAuth({
  async getServerSideProps() {
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
  const toast = useToast();

  const onSubmit = (data: FormData) => {
    addUser({
      variables: { user: data },
    });
  };

  useEffect(() => {
    if (!data) return;
    toast({
      title: "Your information has been updated.",
      status: "success",
    });
  }, [data]);

  useEffect(() => {
    if (!error) return;
    toast({
      title: "Oops... Something wrong happend.",
      description: "Please try again!",
      status: "error",
    });
  }, [error]);

  return (
    <>
      <TopPage
        header="Change the way other coaches see you 👀"
        description="You can always change it later ✍"
      />

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

            <Button
              colorScheme={"purple"}
              type="submit"
              isLoading={loading}
              loadingText="SAVING..."
            >
              SAVE
            </Button>
          </Stack>
        </form>
      </Center>
    </>
  );
}
