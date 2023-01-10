import { useContext, useMemo } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./RecipeView.module.css";
import ReactDOM from "react-dom";
import { FiEdit, FiX, FiStar, FiCheck, FiChevronRight } from "react-icons/fi";
import BarIndicator from "../UI/BarIndicator/BarIndicator";
import Button from "../UI/Button/Button";
import DifficultyIndicator from "../UI/DifficultyIndicator/DifficultyIndicator";
import Tag from "../UI/Tag/Tag";

import RecipesContext from "../../contexts/recipes";
import { animate } from "../../utils/animate";
import IngredientsContext from "../../contexts/ingredients";

function RecipeView({ data, onClose, onEdit }) {
  const { isMobile } = useContext(LayoutContext);
  const { tags, editRecipe } = useContext(RecipesContext);
  const { ingredients } = useContext(IngredientsContext);
  const root = document.getElementById("modal");

  //? Think about refactoring in the future. This code is used in multiple places with slight variation
  // Calculate how much percentage of all ingredients are available in storage and which ingredients are missing
  const { indicatorValue, missingIngredients } = useMemo(() => {
    // List of missing ingredients with amount
    let missingIngredients = [];
    // Add percentage of every ingredient
    let sumPercentages = [];

    data.ingredients.forEach((ing) => {
      // Required amount
      const required = ing.amount;

      // Check how much is in storage
      const inStorage = ingredients
        .filter((item) => item.name === ing.name && item.type === "storage")
        .reduce((acc, cur) => (acc += cur.amount), 0);

      // Calculate missing ingredients
      const difference = inStorage - required;
      const missingAmount = difference < 0 ? Math.abs(difference) : 0;

      // Add missing ingredient to list if amount is not 0;
      if (missingAmount > 0)
        missingIngredients.push({
          name: ing.name,
          amount: missingAmount,
          unit: ing.unit,
        });

      // Calculate available percentage of required amount
      const proportion = inStorage / required;
      const percentage = proportion > 1 ? 100 : proportion * 100;

      sumPercentages.push(percentage);
    });

    // Add values together
    const sum = sumPercentages.reduce((acc, cur) => (acc += cur), 0);
    // Divide by the number of values
    const indicatorValue = sum / sumPercentages.length;

    return { indicatorValue, missingIngredients };
  }, [ingredients, data.ingredients]);

  const handleBookmark = async (e) => {
    const btn = e.target.closest("button");
    try {
      animate(btn, "pulsate");
      await editRecipe({ ...data, bookmark: !data.bookmark });
    } catch (error) {
      animate(btn, "shake");
    }
  };

  const ingredientsJSX = (
    <div className={styles.ingredients}>
      <h2 className={styles.title}>Składniki</h2>
      <ul className={styles["ingredient-list"]}>
        {data.ingredients.map((ing) => (
          <li key={ing.name} className={styles["list-item"]}>
            {missingIngredients.find((item) => item.name === ing.name) ===
            undefined ? (
              <FiCheck className={styles.check} />
            ) : (
              <FiX className={styles.check} />
            )}
            <p className={styles.name}>{ing.name}</p>
            <p>{ing.amount}</p>
            <p>{ing.unit}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const header = (
    <>
      <Button className={styles["btn-edit"]} onClick={onEdit} round>
        <FiEdit />
      </Button>
      <h1 className={styles.title}>{data.name}</h1>
      <Button onClick={onClose} className={styles["btn-close"]} round>
        <FiX />
      </Button>
    </>
  );
  const content = (
    <>
      {!isMobile && <div onClick={onClose} id="backdrop"></div>}
      <div className={`${styles.content} ${isMobile && styles.mobile}`}>
        <div className={styles.grid}>
          <section className={styles.summary}>
            <img src={data.image} alt="recipe" />
            <Tag className={styles.tag} tag={data.tag}>
              {tags[data.tag]}
            </Tag>
            {isMobile && header}
            <div className={styles.indicators}>
              <DifficultyIndicator value={data.difficulty} />
              <Button
                onClick={handleBookmark}
                round
                mini
                fillIcon
                active={data.bookmark}
              >
                <FiStar />
              </Button>
              <BarIndicator label="Składniki" value={indicatorValue} />
            </div>
            {ingredientsJSX}
            <div className={styles.spices}>
              <h2 className={styles.title}>Przyprawy</h2>
              <ul className={styles["spices-list"]}>
                {data.spices.map((spice) => (
                  <li key={spice.name} className={styles["list-item"]}>
                    <FiChevronRight />
                    <p className={styles.name}>{spice.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className={styles.description}>
            <header className={styles.header}>{!isMobile && header}</header>
            {isMobile && <h2>Sposób przygotowania</h2>}
            <div className={styles.instructions}>{data.instructions}</div>
          </section>
        </div>
      </div>
    </>
  );

  return <>{ReactDOM.createPortal(content, root)}</>;
}

export default RecipeView;
