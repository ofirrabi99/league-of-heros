import React from "react";
import styles from "./TextField.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: string;
}

function Input(
  { label, error, ...rest }: Props,
  ref: React.LegacyRef<HTMLInputElement> | undefined
) {
  return (
    <div>
      <div className={styles.label}>{label}</div>
      <input
        className={`${styles.input} ${error && styles.error}`}
        {...rest}
        ref={ref}
      />
      <div className={`${styles.error} ${styles.errorLabel}`}>{error}</div>
    </div>
  );
}

const TextField = React.forwardRef(Input);

export default TextField;
