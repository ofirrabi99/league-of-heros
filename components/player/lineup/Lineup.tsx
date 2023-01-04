import styles from "./Lineup.module.scss";
import Player from "../Player";

export default function Lineup() {
  return (
    <div className={styles.wrapper}>
      <Player />
      <Player />
      <Player />
      <Player />
      <Player />
    </div>
  );
}
