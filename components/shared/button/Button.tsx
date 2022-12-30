import styles from "./Button.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
}

export default function Button({
  children,
  loading,
  success,
  error,
  ...rest
}: Props) {
  return (
    <button
      className={`${styles.button} ${success && styles.buttonSuccess} ${
        error && styles.buttonError
      }`}
      disabled={loading}
      {...rest}
    >
      {loading && <FontAwesomeIcon icon={faRotate} className="fa-spin" />}
      {!loading && success && <FontAwesomeIcon icon={faCheck} />}
      {!loading && error && <FontAwesomeIcon icon={faXmark} />}
      {!loading && !success && !error && children}
    </button>
  );
}
