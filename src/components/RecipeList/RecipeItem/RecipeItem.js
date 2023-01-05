import { useContext } from "react";
import { FiStar, FiTrash } from "react-icons/fi";
import RecipesContext from "../../../contexts/recipes";
import Tag from "../../UI/Tag/Tag";
import BarIndicator from "../../UI/BarIndicator/BarIndicator";
import Button from "../../UI/Button/Button";
import DifficultyIndicator from "../../UI/DifficultyIndicator/DifficultyIndicator";
import styles from "./RecipeItem.module.css";

function RecipeItem({ item, onPreview }) {
  const { tags } = useContext(RecipesContext);
  const { editRecipe, removeRecipe } = useContext(RecipesContext);

  const handleClick = (e) => {
    // If target is not a button, show recipe preview
    if (!e.target.closest("button")) onPreview(item);
  };

  const handleBookmark = (e) => {
    const btn = e.target.closest("button");
    btn.classList.add("pulsate");
    editRecipe({ ...item, bookmark: !item.bookmark });
  };

  const handleRemove = () => {
    removeRecipe(item.id);
  };

  return (
    <li onClick={handleClick} className={styles["recipe-item"]}>
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
          <BarIndicator label="Składniki" value={30} />
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
  );
}

export default RecipeItem;
