import React, { useState, useRef, useEffect, useMemo } from "react";
import Input from "../Input/Input";
import styles from "./InputWithSuggestions.module.css";
import { FiEdit } from "react-icons/fi";

const InputWithSuggestions = React.forwardRef(
  ({ query, data, onAddNew, onSuggestionClick, ...rest }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const suggestionsEl = useRef();
    const [filteredData, setFilteredData] = useState([]);

    // Not using onChange to trigger filtering data because the useForm is already using it.
    const filterData = useMemo(() => {
      // Filter data with value
      const filtered = data.filter((item) =>
        item.name.toLowerCase().startsWith(query.toLowerCase())
      );

      // Reset selected index
      setSelectedIndex(0);
      // Set filtered data
      const output = query.length === 0 ? [] : filtered;
      setFilteredData(output);
      return output;
    }, [query]);

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
          <li
            onClick={handleSuggestionClick}
            key={item.id}
            item={item}
            data-id={item.id}
          >
            {item.name}
          </li>
        ))}
        {query.length > 0 && (
          <li onClick={handleAddClick} className={styles["btn-add"]}>
            Stwórz nowy produkt <FiEdit />
          </li>
        )}
      </ul>
    );

    return (
      <div>
        <Input onKeyDown={handleKeyDown} ref={ref} {...rest} />
        {suggestions}
      </div>
    );
  }
);

export default InputWithSuggestions;
