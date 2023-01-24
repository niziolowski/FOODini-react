import styles from "./ShoppingList.module.css";
import Button from "../UI/Button/Button";
import { FiPlus, FiTrash, FiX } from "react-icons/fi";
import { useRef, useContext, useMemo, useEffect } from "react";
import LayoutContext from "../../contexts/layout";
import PlanContext from "../../contexts/PlanContext";
import { combineIngredientsByName } from "../../utils/shoppingList";
import { useFieldArray, useForm } from "react-hook-form";
import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";

function ShoppingList() {
  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const { plan } = useContext(PlanContext);
  const isActive = isVisible.shoppingList;

  const parentEl = useRef(null);
  const btnToggle = useRef(null);

  // Calculate a combined list of missing ingredients
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

  const { register, handleSubmit, control, setValue } = useForm();

  const {
    fields: userItemsFields,
    append: userItemsAppend,
    remove: userItemsRemove,
  } = useFieldArray({ name: "userItems", control });

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

  const onSubmit = (data) => {
    console.log(data);
  };

  // Update sync values on missingIngredients change
  useEffect(() => {
    missingIngredients.forEach((ing, i) => {
      setValue(`syncItems.${i}.name`, ing.name);
      setValue(`syncItems.${i}.amount`, ing.amount);
      setValue(`syncItems.${i}.unit`, ing.unit);
    });
  }, [missingIngredients]);

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
      <form
        id="shopping-list-form"
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Plan</h2>
        <ul id="list-sync">
          {missingIngredients.map((ing, index) => (
            <div key={ing.name} className={styles.item}>
              <Input
                {...register(`syncItems.${index}.checkbox`)}
                className={styles["item-checkbox"]}
                type="checkbox"
              />
              <Input
                {...register(`syncItems.${index}.name`)}
                className={styles["item-name"]}
                type="text"
                disabled={true}
                value={ing.name}
                isValid={true}
              />
              <Input
                {...register(`syncItems.${index}.amount`)}
                className={styles["item-amount"]}
                type="number"
                disabled={true}
                value={ing.amount}
                isValid={true}
              />
              <Select
                {...register(`syncItems.${index}.unit`)}
                className={styles["item-unit"]}
                disabled={true}
                value={ing.unit}
                options={["szt.", "kg", "g", "ml"]}
              />
            </div>
          ))}
        </ul>

        <h2>Użytkownik</h2>
        <ul id="list-user">
          {userItemsFields.map((field, index) => (
            <div key={field.id} className={styles.item}>
              <Input
                {...register(`userItems.${index}.checkbox`)}
                className={styles["item-checkbox"]}
                type="checkbox"
              />
              <Input
                {...register(`userItems.${index}.name`)}
                className={styles["item-name"]}
                type="text"
                isValid={true}
              />
              <Input
                {...register(`userItems.${index}.amount`)}
                className={styles["item-amount"]}
                type="number"
                isValid={true}
              />
              <Select
                {...register(`userItems.${index}.unit`)}
                className={styles["item-unit"]}
                options={["szt.", "kg", "g", "ml"]}
              />
              <Button
                onClick={() => userItemsRemove(index)}
                type="button"
                doubleAction
                round
                mini
              >
                <FiTrash />
              </Button>
            </div>
          ))}
          <button
            onClick={() =>
              userItemsAppend({ name: "", amount: 1, unit: "szt." })
            }
            type="button"
            className={styles["btn-add"]}
          >
            <FiPlus /> Dodaj
          </button>
        </ul>
        <Button className={styles["btn-submit"]} primary>
          Przenieś zakupy do spiżarni
        </Button>
      </form>
    </aside>
  );
}

export default ShoppingList;
