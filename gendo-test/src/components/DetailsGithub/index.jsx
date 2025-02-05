/* eslint-disable react/prop-types */
import styles from "./styles.module.scss";
import Fork from "../../assets/git.svg";

export default function DetailGithub({ icon, list, type }) {
  return (
    <div className={styles.containerGithub}>
      {list.length > 0 &&
        list.map((item, idx) => (
          <div key={idx} className={styles.descriptionGithub}>
            {type === "repos"  ? (
              <h1>
                <strong>{item.name}</strong>
              </h1>
            ) : (
              <h1>
                {item.full_name.split("/")[0]}/
                <strong>{item.full_name.split("/")[1]}</strong>
              </h1>
            )}
            <p>{item.description}</p>
            <div className={styles.detailCode}>
              <div className={styles.code}>
                {icon}
                {type === "repos" ? (
                  <p>{item.language}</p>
                ) : (
                  <p>{item.stargazers_count}</p>
                )}
              </div>
              <div className={styles.code}>
                <img src={Fork} alt="fork-symbol" />
                <p>{item.forks_count}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
