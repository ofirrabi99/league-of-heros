import styles from "./ArticlePreview.module.scss";
import Avatar from "../../shared/avatar/Avatar";
import Link from "next/link";

type Props = {
  id: string;
  title: string;
  description: string;
  image?: string | null;
};

export default function ArticlePreview({
  id,
  title,
  description,
  image,
}: Props) {
  return (
    <Link
      href={`/article/${id}`}
      className={styles.wrapper}
      style={{
        backgroundImage: `url('${image}')`,
      }}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          {/* <Avatar /> */}
          <span className={styles.title}>{title}</span>
        </div>
        <span className={styles.description}>{description}</span>
        {/* <div>
          <span className={styles.autor}>Ofir Rabi</span>{" "}
          <span className={styles.date}>{new Date().toDateString()}</span>
        </div> */}
      </div>
    </Link>
  );
}
