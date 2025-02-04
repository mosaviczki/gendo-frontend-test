/* eslint-disable react/prop-types */
import styles from "./styles.module.scss";
import Fork from "../../assets/git.svg";
import { IoMdCode } from "react-icons/io";

export default function DetailRepos({list}) {
  
  return (
    <div className={styles.containerGithub}>
      {list.length > 0 &&
        list.map((item, idx) => (
          <div key={idx} className={styles.descriptionRepos}>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            <div className={styles.detailCode}>
              <div className={styles.code}>
                <IoMdCode />
                <p>{item.stack}</p>
              </div>
              <div className={styles.code}>
                <img src={Fork} alt="fork-symbol" />
                <p>{item.fork}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
