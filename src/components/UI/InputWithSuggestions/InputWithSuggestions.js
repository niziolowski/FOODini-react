import React, { useState, useRef, useEffect } from "react";
import Input from "../Input/Input";
import styles from "./InputWithSuggestions.module.css";
import { FiEdit } from "react-icons/fi";

const InputWithSuggestions = React.forwardRef(
  (
    {
      query,
      data,
      onAddNew,
      onSuggestionClick,
      suggestionsWide,
      className,
      ...rest
    },
    ref
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    // Reference for keyboard navigation
    const suggestionsEl = useRef();
    // Reference for clicks outside component
    const parentEl = useRef();

    const [isFocused, setIsFocused] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

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

      // On 'Tab focus out
      if (e.key === "Tab") {
        setIsFocused(false);
      }
    };

    const handleSuggestionClick = (e) => {
      // Get item id
      const id = +e.target.closest("li").dataset.id;

      // Pass id UP using prop
      onSuggestionClick(id);
      setIsFocused(false);
    };

    // Show suggestions
    const handleFocus = () => setIsFocused(true);

    // Pass query up to create a new template
    const handleAddClick = () => onAddNew(query);

    // Hide suggestions if user clicks outside of this component
    useEffect(() => {
      const handler = (e) => {
        if (parentEl.current && !parentEl.current.contains(e.target))
          setIsFocused(false);
      };

      document.addEventListener("mousedown", handler);

      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }, []);

    // Filter the data when the query value changes
    useEffect(() => {
      // Filter data with value
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

      // Reset selected index
      setSelectedIndex(0);
      // Set filtered data
      const output = query.length === 0 ? data : filtered;
      setFilteredData(output);
    }, [query, data]);

    // Update the suggestions hover state based on keyboard navigation
    useEffect(() => {
      if (suggestionsEl.current) {
        [...suggestionsEl.current.children].forEach((item, i) => {
          item.classList.remove(styles.hover);
          if (i === selectedIndex) item.classList.add(styles.hover);
        });
      }
    }, [selectedIndex, filteredData, isFocused]);

    const suggestions = (
      <ul
        ref={suggestionsEl}
        className={`${styles["suggestion-list"]} ${
          suggestionsWide && styles.wide
        }`}
      >
        {filteredData.map((item) => (
          <li onClick={handleSuggestionClick} key={item.id} data-id={item.id}>
            {item.name}
          </li>
        ))}

        <li onClick={handleAddClick} className={styles["btn-add"]}>
          Stwórz nowy produkt <FiEdit />
        </li>
      </ul>
    );

    return (
      <div className={`${styles.content} ${className}`} ref={parentEl}>
        <Input
          className={styles.input}
          onKeyDown={handleKeyDown}
          ref={ref}
          onFocusIn={handleFocus}
          autoComplete="off"
          {...rest}
        />
        {isFocused && suggestions}
      </div>
    );
  }
);

export default InputWithSuggestions;
