import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { SET_TEAM } from "../../../queries/team";
import Button from "../../shared/button/Button";
import TextField from "../../shared/textField/TextField";
import styles from "./EditOrAddTeamForm.module.scss";

type FormData = {
  name: string;
  imageUrl: string;
};

export default function EditOrAddTeamForm() {
  const [addTeam, { data, loading, error }] = useMutation(SET_TEAM);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    // defaultValues: {
    //   coachName: user?.coachName || userCredentials.name,
    //   teamName: user?.teamName,
    // },
  });

  const onSubmit = (data: FormData) => {
    addTeam({ variables: { team: { ...data } } });
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        {...register("name", { required: true })}
        error={errors.name && "This field is required"}
      />

      <TextField
        label="Logo"
        {...register("imageUrl", { required: true })}
        error={errors.imageUrl && "This field is required"}
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
  );
}
