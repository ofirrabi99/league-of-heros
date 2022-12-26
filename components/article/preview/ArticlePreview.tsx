import styles from "./ArticlePreview.module.scss";
import Avatar from "../../shared/avatar/Avatar";
import Link from "next/link";

export default function ArticlePreview() {
  return (
    <Link
      href={`/article/${123}`}
      className={styles.wrapper}
      style={{
        backgroundImage:
          "url('https://www.sport5.co.il/Sip_Storage/FILES/9/size624x514/1251649.jpg')",
      }}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <Avatar />
          <span className={styles.title}>Title of the atricle</span>
        </div>
        <span className={styles.description}>
          Short description about the article, very interesting article. Short
          description about the article, very interesting article.
        </span>
        <div>
          <span className={styles.autor}>Ofir Rabi</span>{" "}
          <span className={styles.date}>{new Date().toDateString()}</span>
        </div>
      </div>
    </Link>
  );
}
