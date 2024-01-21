import React from "react";
import styles from "./search.module.css";
import { MdSearch } from "react-icons/md";

const Search = ({ placeholder }) => {
  return (
    <div className={styles.container}>
      <MdSearch />
      <input className={styles.input} type="text" placeholder={placeholder} />
    </div>
  );
};

export default Search;
