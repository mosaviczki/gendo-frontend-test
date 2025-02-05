import { useState } from "react";
import styles from "./styles.module.scss";
import { BsSearch } from "react-icons/bs";

const Search = ({ onSearch }) => {
  const [textSearch, setTextSearch] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(textSearch);
    }
  };

  return (
    <div className={styles.containerSearch}>
      <BsSearch />
      <input
        type="text"
        placeholder="Filter by name"
        onChange={(e) => setTextSearch(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default Search;
