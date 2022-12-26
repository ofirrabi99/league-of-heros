import ArticlePreview from "../components/article/preview/ArticlePreview";
import styles from "../styles/pages/index.module.scss";

export default function Home() {
  return (
    <>
      <h1 className={styles.headerPrimary}>NewNews.</h1>
      <span className={styles.headerSecondary}>
        Meet the new world of news, where you can read original and unique
        content from your favorite creators.
      </span>
      <ArticlePreview />
    </>
  );
}
