import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../../styles/pages/article/[id].module.scss";

export default function Article() {
  const router = useRouter();
  const { id } = router.query;

  const [getArticle, { loading, data, error }] = useLazyQuery(gql`
    query article($id: ID!) {
      article(id: $id) {
        id
        title
        description
        image
        content
      }
    }
  `);

  useEffect(() => {
    if (!id) return;
    getArticle({ variables: { id } });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <h1 className={`${styles.headerPrimary} ${styles.center}`}>
        {data?.article.title}
      </h1>
      <p className={`${styles.headerSecondary} ${styles.center}`}>
        {data?.article.description}
      </p>
      <div className="content">{data?.article.content}</div>
    </>
  );
}
