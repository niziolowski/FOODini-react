import { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { FiEdit, FiSearch, FiX } from "react-icons/fi";
import LayoutContext from "../../contexts/layout";
import RecipeItem from "../RecipeList/RecipeItem/RecipeItem";
import StorageItem from "../StorageList/StorageItem/StorageItem";
import Button from "../UI/Button/Button";

import styles from "./Spotlight.module.css";

function Spotlight({
  data,
  onClose,
  onAddNew,
  onSuggestionClick,
  readOnly = false,
}) {
  const { isMobile } = useContext(LayoutContext);
  const root = document.getElementById("modal");
  // Suggestions

  const [filteredData, setFilteredData] = useState(data);
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
    setFilteredData(value.length === 0 ? data : filteredData);

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

    // On 'Enter' click on selected item
    if (e.key === "Escape") onClose();
  };

  const handleSuggestionClick = (e, item) => {
    // If recipe
    if (!e) {
      onSuggestionClick(item.id, "recipe");
    }

    // If storage
    if (e) {
      // Get item id
      const id = +e.target.closest("li").dataset.id;

      // Get type
      const type = e.target.closest("li").dataset.type;

      // Pass id UP using prop
      onSuggestionClick(id, type);
    }
  };

  const handleAddClick = () => {
    // Pass to form
    onAddNew(query);
  };

  // Set hover state on selected index
  useEffect(() => {
    [...suggestionsEl.current.children].forEach((item, i) => {
      item.classList.remove(styles.hover);
      if (i === selectedIndex) item.classList.add(styles.hover);
    });
  }, [selectedIndex, query]);

  const suggestions = (
    <ul ref={suggestionsEl} className={styles["suggestion-list"]}>
      {filteredData.map((item) => {
        // if storage
        if (item.type) {
          return (
            <StorageItem
              onClick={handleSuggestionClick}
              key={item.id}
              item={item}
              data-id={item.id}
              data-type={item.type}
            />
          );
        }
        if (!item.type) {
          return (
            <RecipeItem
              onPreview={(item) => handleSuggestionClick(null, item)}
              key={item.id}
              item={item}
            />
          );
        }
        return null;
      })}

      {!readOnly && (
        <li onClick={handleAddClick} className={styles["btn-add"]}>
          Stwórz nowy produkt <FiEdit />
        </li>
      )}
    </ul>
  );

  const content = (
    <>
      {!isMobile && <div onClick={onClose} id="backdrop"></div>}
      <div className={`${styles.spotlight} ${isMobile ? styles.mobile : ""}`}>
        <div className={styles["search-bar"]}>
          <FiSearch />
          <input
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="Szukaj"
          ></input>
          {isMobile && (
            <Button onClick={onClose} round mini>
              <FiX />
            </Button>
          )}
        </div>
        {suggestions}
      </div>
    </>
  );

  return ReactDOM.createPortal(content, root);
}

export default Spotlight;
