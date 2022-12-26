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
        <>
          <ArticlePreview title={article.title} />
          <Divider />
        </>
      ))}
    </>
  );
}
