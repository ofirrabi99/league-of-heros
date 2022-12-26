import styles from "../styles/pages/index.module.scss";
import ArticleList from "../components/article/list/ArticleList";

export default function Home() {
  return (
    <>
      <h1 className={styles.headerPrimary}>NewNews.</h1>
      <p className={styles.headerSecondary}>
        Meet the new world of news, where you can read original and unique
        content from your favorite creators.
      </p>
      <div className="content">
        <ArticleList />
      </div>
    </>
  );
}
