import React from "react";
import { Article } from "../../../__generated__/resolvers-types";
import Divider from "../../shared/divider/Divider";
import ArticlePreview from "../preview/ArticlePreview";

type Props = {
  articles: Article[];
};
export default function ArticleList({ articles }: Props) {
  return (
    <>
      {articles.map((article) => (
        <React.Fragment key={article.id}>
          <ArticlePreview
            id={article.id}
            title={article.title}
            description={article.description}
            image={article.image}
          />
          <Divider />
        </React.Fragment>
      ))}
    </>
  );
}
