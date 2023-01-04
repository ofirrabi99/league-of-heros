import styles from "./Player.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faStar } from "@fortawesome/free-solid-svg-icons";

export default function Player() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.teamLogo}
          src="https://www.championsleague.basketball/images.fiba.com/ClubLogos/88237649-7100-4662-b0cd-47647ba74a03/2022/logoSmall.png"
          alt="Hapoel Holon"
        />
        <img
          src="https://www.fiba.basketball/api/img/player/headshot/5/208494/560/200739?alternate=%2fimages%2fdefault_profile.jpg"
          alt="Joe Ragland"
        />
      </div>

      <div className={styles.details}>
        <span>
          <b>Joe Ragland</b>
        </span>
        <div className={styles.values}>
          <div className={styles.money}>
            23 <FontAwesomeIcon icon={faCoins} />
          </div>{" "}
          <div className={styles.score}>
            30.5 <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </div>
    </div>
  );
}
