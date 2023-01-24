import styles from "./ShoppingList.module.css";
import Button from "../UI/Button/Button";
import { FiPlus, FiX } from "react-icons/fi";
import { useRef, useContext, useMemo } from "react";
import LayoutContext from "../../contexts/layout";
import PlanContext from "../../contexts/PlanContext";
import { combineIngredientsByName } from "../../utils/shoppingList";

function ShoppingList() {
  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const { plan } = useContext(PlanContext);
  console.log(plan);

  const missingIngredients = useMemo(() => {
    if (!plan) return [];
    const missing = plan.reduce((acc, cur) => {
      if (!cur.sync) return [...acc];

      // Get a list of week's meals
      const meals = Object.values(cur.days).flatMap((value) => value.meals);

      // Get a list of missing ingredients
      const missing = meals.flatMap((meal) =>
        meal.missingIngredients ? meal.missingIngredients : []
      );

      return [...acc, ...missing];
    }, []);

    return combineIngredientsByName(missing);
  }, [plan]);
  console.log(...missingIngredients);

  const isActive = isVisible.shoppingList;

  const parentEl = useRef(null);
  const btnToggle = useRef(null);

  function toggleActive() {
    dispatchIsVisible({ type: "shopping-list", mode: "toggle" });
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
      <header className={styles.header}>
        {!isMobile && btnToggleEl}

        {!isMobile && (
          <Button onClick={toggleActive} round>
            <FiX />
          </Button>
        )}
        {isMobile && <h1>Lista zakupów</h1>}
      </header>
      <form id="shopping-list-form">
        <h2>Plan</h2>
        <ul id="list-sync" className={styles["list-sync"]}></ul>

        <ul id="list-user" className="shopping-list-content">
          <button className={styles["btn-add"]}>
            <FiPlus /> Dodaj
          </button>
          <Button className={styles["btn-submit"]} primary>
            Przenieś zakupy do spiżarni
          </Button>
        </ul>
      </form>
    </aside>
  );
}

export default ShoppingList;
