import styles from "./styles.module.scss";

export default function Profile({infos}) {
  return (
    <div className={styles.containerProfile}>
      <div className={styles.contentProfile}>
        <img src={infos.avatar_url} alt="person" className={styles.imageProfile} />
        <div className={styles.aboutProfile}>
          <h1>{infos.name}</h1>
          <p>{infos.bio}</p>
        </div>
      </div>
    </div>
  );
}
