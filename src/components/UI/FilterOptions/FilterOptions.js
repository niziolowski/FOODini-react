import styles from "./FilterOptions.module.css";
import { FiSearch, FiMaximize2, FiPlus, FiStar } from "react-icons/fi";
import Button from "../Button/Button";
import Spotlight from "../../Spotlight/Spotlight";
import { useState } from "react";

function FilterOptions({ onAddItem }) {
  return (
    <section className={styles.options}>
      <div className={styles.row}>
        <Button onClick={onAddItem} round mini>
          <FiPlus />
        </Button>
        <div className={styles["search-bar"]}>
          <input type="search" placeholder="Szukaj" />
          <FiSearch />
        </div>
        <Button round mini>
          <FiMaximize2 />
        </Button>
      </div>
      <div className={styles.row}>
        <span>Filtr</span>
        <select>
          <option>ważność</option>
        </select>
        <Button round mini fillIcon active={false}>
          <FiStar />
        </Button>
      </div>
    </section>
  );
}

export default FilterOptions;
