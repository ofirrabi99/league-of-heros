import styles from "../styles/pages/index.module.scss";
import ArticleList from "../components/article/list/ArticleList";

import { useQuery, gql } from "@apollo/client";

export default function Home() {
  const { loading, error, data } = useQuery(gql`
    {
      articles {
        title
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <h1 className={styles.headerPrimary}>NewNews.</h1>
      <p className={styles.headerSecondary}>
        Meet the new world of news, where you can read original and unique
        content from your favorite creators.
      </p>
      <div className="content">
        <ArticleList articles={data.articles} />
      </div>
    </>
  );
}
