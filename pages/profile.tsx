import { useMutation } from "@apollo/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
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
    <></>
    // <Page title="PROFILE">
    //   <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
    //     <TextField
    //       label="Coach Name"
    //       {...register("coachName", { required: true })}
    //       error={errors.coachName && "This field is required"}
    //     />

    //     <TextField
    //       label="Team Name"
    //       {...register("teamName", { required: true })}
    //       error={errors.teamName && "This field is required"}
    //     />

    //     <Button
    //       type="submit"
    //       loading={loading}
    //       success={Boolean(data)}
    //       error={Boolean(error)}
    //     >
    //       SAVE
    //     </Button>
    //   </form>
    // </Page>
  );
}
