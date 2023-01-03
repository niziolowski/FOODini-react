import { useContext, useEffect, useRef, useState } from "react";
import { FiEdit, FiSearch } from "react-icons/fi";
import LayoutContext from "../../../contexts/layout";
import StorageItem from "../../StorageList/StorageItem/StorageItem";

import styles from "./SuggestionList.module.css";

function SuggestionList({ data, onClose, onAddNew, onSuggestionClick }) {
  const { isMobile } = useContext(LayoutContext);
  // Suggestions

  const [filteredData, setFilteredData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [query, setQuery] = useState("");
  const suggestionsEl = useRef();
  // Handle input change
  const handleChange = (e) => {
    // Get value
    const value = e.target.value;
    // for reference
    setQuery(value);

    // Filter data with value
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().startsWith(value.toLowerCase())
    );

    // Set filtered data
    setFilteredData(value.length === 0 ? [] : filteredData);

    // Reset selected index
    setSelectedIndex(0);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    // Move up and down the list and select items quickly
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestionsEl.current.children.length > 0) {
        if (e.key === "ArrowUp")
          setSelectedIndex((current) =>
            current === 0
              ? suggestionsEl.current.children.length - 1
              : current - 1
          );
        if (e.key === "ArrowDown")
          setSelectedIndex((current) =>
            current === suggestionsEl.current.children.length - 1
              ? 0
              : current + 1
          );
      }
    }

    // On 'Enter' click on selected item
    if (e.key === "Enter") {
      const target = suggestionsEl.current.children[selectedIndex];
      if (!target) return;
      target.click();
    }
  };

  const handleSuggestionClick = (e) => {
    // Get item id
    const id = +e.target.closest("li").dataset.id;

    // Pass id UP using prop
    onSuggestionClick(id);
  };

  const handleAddClick = () => {
    // Pass to form
    onAddNew(query);
  };

  useEffect(() => {
    [...suggestionsEl.current.children].forEach((item, i) => {
      item.classList.remove(styles.hover);
      if (i === selectedIndex) item.classList.add(styles.hover);
    });
  }, [selectedIndex, query]);

  const suggestions = (
    <ul ref={suggestionsEl} className={styles["suggestion-list"]}>
      {filteredData.map((item) => (
        <StorageItem
          onClick={handleSuggestionClick}
          key={item.id}
          item={item}
          data-id={item.id}
        />
      ))}
      {query.length > 0 && (
        <li onClick={handleAddClick} className={styles["btn-add"]}>
          Stwórz nowy produkt <FiEdit />
        </li>
      )}
    </ul>
  );

  const content = (
    <>
      <div
        className={`${styles.SuggestionList} ${isMobile ? styles.mobile : ""}`}
      >
        <div className={styles["search-bar"]}>
          <FiSearch />
          <input
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
          ></input>
        </div>
        {suggestions}
      </div>
    </>
  );

  return content;
}

export default SuggestionList;
