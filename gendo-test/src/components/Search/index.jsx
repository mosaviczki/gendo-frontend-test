import styles from "./styles.module.scss";
import { BsSearch } from "react-icons/bs";

export default function Search() {
  return (
    <div className={styles.containerSearch}>
      <BsSearch />
      <input type="text" placeholder="Filter by name"/>
    </div>
  );
}
