import styles from "./ShoppingList.module.css";
import Button from "../UI/Button";
import { FiPlus, FiX } from "react-icons/fi";
import { useRef, useContext } from "react";
import LayoutContext from "../../contexts/layout";
import stateContext from "../../contexts/state";

function ShoppingList() {
  const { isMobile } = useContext(LayoutContext);

  const {
    isShoppingListActive: isActive,
    setIsShoppingListActive: setIsActive,
  } = useContext(stateContext);

  const parentEl = useRef(null);
  const btnToggle = useRef(null);

  function toggleActive() {
    setIsActive(!isActive);
  }

  function handleMouseEnter(e) {
    if (!isActive) {
      parentEl.current.classList.add(styles.peek);
      btnToggle.current.classList.add(styles.peek);
    }
  }
  function handleMouseLeave(e) {
    if (!isActive) {
      parentEl.current.classList.remove(styles.peek);
      btnToggle.current.classList.remove(styles.peek);
    }
  }

  const btnToggleEl = (
    <button
      ref={btnToggle}
      onClick={toggleActive}
      className={`${styles["btn-toggle"]} ${isActive ? styles.active : ""}`}
    >
      Lista zakupów
    </button>
  );

  return (
    <aside
      ref={parentEl}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles["shopping-list"]} ${isActive ? styles.active : ""} ${
        isMobile ? styles.mobile : ""
      }`}
    >
      <div className={styles.header}>
        {!isMobile && btnToggleEl}

        {!isMobile && (
          <Button onClick={toggleActive} round>
            <FiX />
          </Button>
        )}
      </div>
      <form id="shopping-list-form">
        <ul id="list-sync" className="shopping-list-content sync"></ul>

        <ul id="list-user" className="shopping-list-content">
          <button className={styles["btn-add"]}>
            <FiPlus /> Dodaj
          </button>
          <Button className={styles["btn-submit"]}>
            Przenieś zakupy do spiżarni
          </Button>
        </ul>
      </form>
    </aside>
  );
}

export default ShoppingList;
