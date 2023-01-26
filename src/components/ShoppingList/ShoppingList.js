import styles from "./ShoppingList.module.css";
import Button from "../UI/Button/Button";
import { FiPlus, FiTrash, FiX } from "react-icons/fi";
import { useRef, useContext, useMemo, useState, useEffect } from "react";
import LayoutContext from "../../contexts/layout";
import PlanContext from "../../contexts/PlanContext";
import { combineIngredientsByName } from "../../utils/shoppingList";
import { useFieldArray, useForm } from "react-hook-form";
import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";
import IngredientsContext from "../../contexts/ingredients";
import InputWithSuggestions from "../UI/InputWithSuggestions/InputWithSuggestions";
import AddCatalog from "../AddCatalog/AddCatalog";
import { v4 as uuid } from "uuid";

function ShoppingList() {
  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const { ingredients, getIngredientById, addOrEditIngredients } =
    useContext(IngredientsContext);
  const { plan, recalculatePlan } = useContext(PlanContext);
  const isActive = isVisible.shoppingList;

  // Add Template state
  const [isCatalogForm, setIsCatalogForm] = useState(false);
  const [catalogFormData, setCatalogFormData] = useState(null);
  const [ingredientIndex, setIngredientIndex] = useState(0); // reference for filling the form on suggestion click

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

  const suggestions = useMemo(
    () => ingredients.filter((item) => item.type === "template"),
    [ingredients]
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const {
    fields: userItemsFields,
    append: userItemsAppend,
    remove: userItemsRemove,
  } = useFieldArray({ name: "userItems", control });

  // On form submit, automatically add new ingredient to storage
  const handleCreateTemplateSubmit = (ingredient) => {
    if (ingredient) {
      // fill the row with ingredient values
      setValue(`userItems.${ingredientIndex}.name`, ingredient.name);
      setValue(`userItems.${ingredientIndex}.amount`, ingredient.amount);
      setValue(`userItems.${ingredientIndex}.unit`, ingredient.unit);
    }
    setIsCatalogForm(false);
  };

  // Show form to add new template to catalog
  const handleCreateTemplate = (query, index) => {
    // Set current ingredient index for later reference
    setIngredientIndex(index);

    const data = { name: query };
    setIsCatalogForm(true);
    setCatalogFormData(data);
  };

  // Fill the form with suggestion data
  const handleSuggestionClick = (id, index) => {
    const ingredient = getIngredientById(id);

    // fill the row with ingredient values
    setValue(`userItems.${index}.name`, ingredient.name);
    setValue(`userItems.${index}.amount`, ingredient.amount);
    setValue(`userItems.${index}.unit`, ingredient.unit);
  };

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

  const onSubmit = async (data) => {
    // Get only checked items from both lists
    const userItems = data.userItems.filter((item) => item.checkbox === true);
    const syncItems = data.syncItems.filter((item) => item.checkbox === true);

    // Group items to a signle array
    const groupedItems = [...syncItems, ...userItems];

    // Combine the same items into a single item
    const combinedItems = combineIngredientsByName(groupedItems);

    const templates = ingredients.filter((ing) => ing.type === "template");
    const payload = combinedItems.map((item) => {
      const template = templates.find(
        (template) => template.name === item.name
      );

      return {
        ...template,
        id: 0,
        app_id: uuid(),
        purchase_date: new Date(),
        created_at: new Date(),
        type: "storage",
        amount: item.amount,
        unit: item.unit,
      };
    });
    // Upload ingredients
    try {
      // !Create API call for adding/editing/deleting ingredients (best solution). use it to crreate payload that updates userItems and storage at the same time
      const updatedIngredients = await addOrEditIngredients(payload);

      const updatedStorage = updatedIngredients.filter(
        (ing) => ing.type === "storage"
      );
      recalculatePlan(null, updatedStorage);
      // Remove added ingredients from userItems list
    } catch (error) {
      console.error(error);
    }
  };

  // Update sync values on missingIngredients change
  useEffect(() => {
    missingIngredients.forEach((ing, i) => {
      setValue(`syncItems.${i}.checkbox`, false);
      setValue(`syncItems.${i}.name`, ing.name);
      setValue(`syncItems.${i}.amount`, ing.amount);
      setValue(`syncItems.${i}.unit`, ing.unit);
    });
  }, [missingIngredients, setValue]);

  return (
    <>
      <aside
        ref={parentEl}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${styles["shopping-list"]} ${
          isActive ? styles.active : ""
        } ${isMobile ? styles.mobile : ""}`}
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

                <InputWithSuggestions
                  {...register(`userItems.${index}.name`, {
                    required: "Wybierz składnik",
                  })}
                  query={watch(`userItems.${index}.name`)}
                  onAddNew={(query) => {
                    handleCreateTemplate(query, index);
                  }}
                  onSuggestionClick={(id) => handleSuggestionClick(id, index)}
                  type="text"
                  data={suggestions}
                  placeholder="Nazwa"
                  isValid={!errors?.userItems?.at(index)?.name}
                  suggestionsWide
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
      {isCatalogForm && (
        <AddCatalog
          data={catalogFormData}
          isActive={isCatalogForm}
          isEditing={false}
          onClose={handleCreateTemplateSubmit}
        />
      )}
    </>
  );
}

export default ShoppingList;
