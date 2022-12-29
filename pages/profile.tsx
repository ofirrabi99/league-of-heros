import { useMutation } from "@apollo/client";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useForm } from "react-hook-form";
import TextField from "../components/shared/textField/TextField";
import { SET_USER } from "../queries/user";
import styles from "../styles/pages/profile.module.scss";
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

type FormData = {
  coachName: string;
  teamName: string;
};

export default function Profile() {
  const [setUser, { data, loading, error }] = useMutation(SET_USER);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    setUser({ variables: { id: "123", ...data } });
  };

  return (
    <>
      <h1 className={styles.headerPrimaryWithBackground}>PROFILE</h1>
      <div className="content">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <TextField
            label="Coach Name"
            {...register("coachName", { required: true })}
          />
          {errors.coachName && (
            <span style={{ color: "red" }}>This field is required</span>
          )}

          {/* include validation with required or other standard HTML validation rules */}
          <TextField
            label="Team Name"
            {...register("teamName", { required: true })}
          />

          {errors.teamName && (
            <span style={{ color: "red" }}>This field is required</span>
          )}

          <input type="submit" />
        </form>
      </div>
    </>
  );
}
