import { useState, useContext } from "react";
import styles from "./NavigationBar.module.css";

const SearchInput = () => {
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.noSubmit}
        type="search"
        placeholder="What are you looking for ?"
      />
    </div>
  );
};

export default SearchInput;
