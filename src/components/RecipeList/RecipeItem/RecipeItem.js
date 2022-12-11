import { FiStar, FiTrash } from "react-icons/fi";
import BarIndicator from "../../UI/BarIndicator/BarIndicator";
import Button from "../../UI/Button/Button";
import DifficultyIndicator from "../../UI/DifficultyIndicator/DifficultyIndicator";
import styles from "./RecipeItem.module.css";

function RecipeItem() {
  return (
    <li className={styles["recipe-item"]}>
      <div className={styles["image-wrapper"]}>
        <img
          className={styles.image}
          src="https://www.seriouseats.com/thmb/WzQz05gt5witRGeOYKTcTqfe1gs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/butter-basted-pan-seared-steaks-recipe-hero-06-03b1131c58524be2bd6c9851a2fbdbc3.jpg"
          alt="recipe"
        />
        <div className={styles.tag}>śniadanie</div>
      </div>

      <div className={styles.col}>
        <div className={styles.title}> Stek panie, jaki dobry</div>
        <div className={styles.info}>
          <DifficultyIndicator value={2} />
          <BarIndicator label="Składniki" value={30} />
        </div>
      </div>
      <div className={styles.col}>
        <Button round mini fillIcon active={false}>
          <FiStar />
        </Button>
        <Button doubleAction round mini>
          <FiTrash />
        </Button>
      </div>
    </li>
  );
}

export default RecipeItem;
