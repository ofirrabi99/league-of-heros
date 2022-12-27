import styles from "./Layout.module.scss";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className={styles.logoWrapper}>
        <img src="/logo.svg" alt="logo" />
      </div>
      {children}
    </>
  );
}
