import styles from "./FilterOptions.module.css";
import { FiSearch, FiMaximize2, FiPlus, FiStar } from "react-icons/fi";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import { calcDaysToExpiry } from "../../../utils/dates";

function FilterOptions({ onAddItem, onFilterChange, options, data }) {
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

  // Filter data
  useEffect(() => {
    let results = [...data];

    // filter favorites
    if (favorites) results = results.filter((item) => item.bookmark === true);

    // filter query
    if (query.length > 0) {
      results = results.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Sort data

    // By expiry date
    if (sorting === "ważność")
      results = results.sort((a, b) => {
        // Calculate days until the ingredient expires
        const aExpiry = calcDaysToExpiry(a.purchase_date, a.expiry);
        const bExpiry = calcDaysToExpiry(b.purchase_date, b.expiry);

        return aExpiry - bExpiry;
      });

    // By difficulty
    if (sorting === "trudność")
      results = results.sort((a, b) => {
        return a.difficulty - b.difficulty;
      });

    // By name
    if (sorting === "nazwa") {
      results = results.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }

    onFilterChange(results);
  }, [data, query, sorting, favorites, onFilterChange]);

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
