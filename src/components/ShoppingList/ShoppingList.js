import styles from "./ShoppingList.module.css";
import Button from "../UI/Button";
import { FiX } from "react-icons/fi";
import { useState } from "react";

function ShoppingList() {
  const [isActive, setIsActive] = useState(false);

  function toggleActive() {
    setIsActive(!isActive);
  }

  function handleHover() {}
  return (
    <aside
      className={`${styles["shopping-list"]} ${isActive && styles.active}`}
    >
      <div className={styles.header}>
        <Button
          onClick={toggleActive}
          onHover={handleHover}
          className={styles["btn-toggle"]}
          fill
        >
          Lista zakupów
        </Button>

        <Button onClick={toggleActive} round>
          <FiX />
        </Button>
      </div>
      <form id="shopping-list-form">
        <ul id="list-sync" className="shopping-list-content sync"></ul>

        <ul id="list-user" className="shopping-list-content">
          <button className="shopping-list__btn-add">
            <i data-feather="plus"></i>Dodaj
          </button>
          <button className="shopping-list__btn-submit btn btn-outline">
            Przenieś zakupy do spiżarni
          </button>
        </ul>
      </form>
    </aside>
  );
}

export default ShoppingList;
