import styles from "./Button.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...rest }: Props) {
  return (
    <button className={styles.button} {...rest}>
      {children}
    </button>
  );
}
