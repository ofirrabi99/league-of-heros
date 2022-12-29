import React from "react";
import styles from "./TextField.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

function Input(
  { label, ...rest }: Props,
  ref: React.LegacyRef<HTMLInputElement> | undefined
) {
  return (
    <div>
      <span className={styles.label}>{label}</span>
      <input className={styles.input} {...rest} ref={ref} />
    </div>
  );
}

const TextField = React.forwardRef(Input);

export default TextField;
