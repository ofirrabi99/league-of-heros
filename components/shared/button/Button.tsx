import styles from "./Button.module.scss";

interface Props {
  children: React.ReactNode;
}

export default function Button({ children }: Props) {
  return <button className={styles.button}>{children}</button>;
}
