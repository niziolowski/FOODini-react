import styles from "./FilterOptions.module.css";
import { FiSearch, FiMaximize2, FiPlus, FiStar } from "react-icons/fi";
import Button from "../Button/Button";
import { useEffect, useState } from "react";

function FilterOptions({ onAddItem, onFilterChange, options }) {
  const [query, setQuery] = useState("");
  const [sorting, setSorting] = useState("ważność");
  const [favorites, setFavorites] = useState(false);

  const handleToggleFavorites = () => {
    setFavorites((current) => !favorites);
  };

  const handleSortingChange = (e) => {
    setSorting(e.target.value);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    onFilterChange({ query, sorting, favorites });
  }, [query, sorting, favorites]);

  return (
    <section className={styles.options}>
      <div className={styles.row}>
        <Button onClick={onAddItem} round mini>
          <FiPlus />
        </Button>
        <div className={styles["search-bar"]}>
          <input
            type="search"
            placeholder="Szukaj"
            onChange={handleQueryChange}
            value={query}
          />
          <FiSearch />
        </div>
        <Button round mini>
          <FiMaximize2 />
        </Button>
      </div>
      <div className={styles.row}>
        <span>Filtr</span>
        <select onChange={handleSortingChange} value={sorting}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <Button
          round
          mini
          fillIcon
          onClick={handleToggleFavorites}
          active={favorites}
        >
          <FiStar />
        </Button>
      </div>
    </section>
  );
}

export default FilterOptions;
