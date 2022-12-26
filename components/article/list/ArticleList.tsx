import Divider from "../../shared/divider/Divider";
import ArticlePreview from "../preview/ArticlePreview";

export default function ArticleList() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((article) => (
        <>
          <ArticlePreview />
          <Divider />
        </>
      ))}
    </>
  );
}
