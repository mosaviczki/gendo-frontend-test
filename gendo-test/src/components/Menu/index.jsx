import styles from "./styles.module.scss";

export default function Menu({
  step,
  handleRepos,
  handleStarred,
  reposLength,
  starredLength,
}) {
  return (
    <div className={styles.buttonOption}>
      <button
        className={`${styles.button} ${step === 0 ? styles.active : ""}`}
        onClick={handleRepos}
      >
        Repos <span className={styles.count}>{reposLength}</span>
      </button>
      <button
        className={`${styles.button} ${step === 1 ? styles.active : ""}`}
        onClick={handleStarred}
      >
        Starred <span className={styles.count}>{starredLength}</span>
      </button>
      <div
        className={`${styles.line} ${
          step === 0 ? styles.lineLeft : styles.lineRight
        }`}
      />
    </div>
  );
}
