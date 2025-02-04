import Homem from "../../assets/homem.jpg";
import styles from "./styles.module.scss";

export default function Profile() {
  return (
    <div className={styles.containerProfile}>
      <div className={styles.contentProfile}>
        <img src={Homem} alt="person" className={styles.imageProfile} />
        <div className={styles.aboutProfile}>
          <h1>Roger Ramos</h1>
          <p>Front end Dev and UI Designer</p>
        </div>
      </div>
    </div>
  );
}
