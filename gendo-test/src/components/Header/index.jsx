import Github from "../../assets/github.svg";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className={styles.containerHeader}>
      <Link to="/" className={styles.contentHeader}>
        <img src={Github} alt="logo github" className={styles.imageGithub} />
        <h1 className="">
          Github <span>profiles</span>
        </h1>
      </Link>
    </header>
  );
}
