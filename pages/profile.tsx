import { useMutation } from "@apollo/client";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Page from "../components/layout/page/Page";
import Button from "../components/shared/button/Button";
import TextField from "../components/shared/textField/TextField";
import { SET_USER } from "../queries/user";
import styles from "../styles/pages/profile.module.scss";
import { UserCredentials } from "../types/auth0-types";
import { User } from "../types/graphql-types";
import { getUserFromSession } from "../utils/commonFunctions";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);
    const user = await getUserFromSession(session);

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
  const [setUser, { data, loading, error }] = useMutation(SET_USER);
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
    setUser({ variables: { id: userCredentials?.sub, ...data } }).then(() => {
      router.push("/my-team");
    });
  };

  return (
    <Page title="PROFILE">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <TextField
          label="Coach Name"
          {...register("coachName", { required: true })}
          error={errors.coachName && "This field is required"}
        />

        {/* include validation with required or other standard HTML validation rules */}
        <TextField
          label="Team Name"
          {...register("teamName", { required: true })}
          error={errors.teamName && "This field is required"}
        />

        <Button
          type="submit"
          loading={loading}
          success={Boolean(data)}
          error={Boolean(error)}
        >
          SAVE
        </Button>
      </form>
    </Page>
  );
}
