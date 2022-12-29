import styles from "./Page.module.scss";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Page({ children, title }: Props) {
  return (
    <>
      <h1 className={styles.headerPrimaryWithBackground}>{title}</h1>
      <div className={styles.content}>{children}</div>
    </>
  );
}
