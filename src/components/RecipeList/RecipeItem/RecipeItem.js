import { useContext, useMemo } from "react";
import { FiStar, FiTrash } from "react-icons/fi";
import RecipesContext from "../../../contexts/recipes";
import IngredientsContext from "../../../contexts/ingredients";
import Tag from "../../UI/Tag/Tag";
import BarIndicator from "../../UI/BarIndicator/BarIndicator";
import Button from "../../UI/Button/Button";
import DifficultyIndicator from "../../UI/DifficultyIndicator/DifficultyIndicator";
import styles from "./RecipeItem.module.css";
import { animate } from "../../../utils/animate";
import { Draggable } from "react-beautiful-dnd";
import LayoutContext from "../../../contexts/layout";

function RecipeItem({ item, onPreview, index }) {
  const { tags, editRecipe, removeRecipe } = useContext(RecipesContext);
  const { ingredients } = useContext(IngredientsContext);
  const { isMobile } = useContext(LayoutContext);

  //? Think about refactoring in the future. This code is used in multiple places with slight variation
  // Calculate how much percentage of all ingredients are available in storaeg
  const indicatorValue = useMemo(() => {
    // Add percentage of every ingredient
    let sumPercentages = [];

    item.ingredients.forEach((ing) => {
      // Required amount
      const required = ing.amount;

      // Check how much is in storage
      const inStorage = ingredients
        .filter((item) => item.name === ing.name && item.type === "storage")
        .reduce((acc, cur) => (acc += cur.amount), 0);

      // Calculate available percentage of required amount
      const proportion = inStorage / required;
      const percentage = proportion > 1 ? 100 : proportion * 100;

      sumPercentages.push(percentage);
    });

    // Add values together
    const sum = sumPercentages.reduce((acc, cur) => (acc += cur), 0);
    // Divide by the number of values
    const indicatorValue = sum / sumPercentages.length;

    return indicatorValue;
  }, [ingredients, item.ingredients]);

  const handleClick = (e) => {
    // If target is not a button, show recipe preview
    if (!e.target.closest("button")) onPreview(item);
  };

  const handleBookmark = async (e) => {
    const btn = e.target.closest("button");
    try {
      animate(btn, "pulsate");
      await editRecipe({ ...item, bookmark: !item.bookmark });
    } catch (error) {
      animate(btn, "shake");
    }
  };

  const handleRemove = async (e) => {
    const btn = e.target.closest("button");
    try {
      animate(btn, "pulsate");
      await removeRecipe(item.id);
    } catch (error) {
      animate(btn, "shake");
    }
  };

  return (
    <Draggable
      draggableId={String(item.id)}
      isDragDisabled={isMobile}
      index={index}
    >
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleClick}
          className={`${styles["recipe-item"]} ${
            snapshot.isDragging && styles.dragging
          }`}
        >
          <div className={styles["image-wrapper"]}>
            <img className={styles.image} src={item.image} alt="recipe" />
            <Tag className={styles.tag} tag={item.tag} small>
              {tags[item.tag]}
            </Tag>
            {/* <div className={styles.tag}>{tags[item.tag]}</div> */}
          </div>

          <div className={styles.col}>
            <div className={styles.title}>{item.name}</div>
            <div className={styles.info}>
              <DifficultyIndicator value={item.difficulty} />
              <BarIndicator label="Składniki" value={indicatorValue} />
            </div>
          </div>
          <div className={styles.col}>
            <Button
              onClick={handleBookmark}
              round
              mini
              fillIcon
              active={item.bookmark}
            >
              <FiStar />
            </Button>
            <Button onClick={handleRemove} doubleAction round mini>
              <FiTrash />
            </Button>
          </div>
        </li>
      )}
    </Draggable>
  );
}

export default RecipeItem;
