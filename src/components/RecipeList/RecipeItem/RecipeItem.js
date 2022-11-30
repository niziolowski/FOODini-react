import { FiStar, FiTrash } from "react-icons/fi";
import Button from "../../UI/Button";
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
        <div className={styles.tag}>obiad</div>
      </div>

      <div className={styles.col}>
        <div className={styles.title}> Stek panie, jaki dobry</div>
        <div className={styles.info}>
          <div className={styles.difficulty}>
            <p>Trudność</p>
            <div className={styles.indicator}>
              <FiStar className={styles.fill} />
              <FiStar />
              <FiStar />
              <FiStar />
              <FiStar />
            </div>
          </div>
          <div className={styles.ingredients}>
            <p>Składniki</p>
            <div className={styles.indicator}>
              <div className={styles["indicator-bar"]}></div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.col}>
        <Button round mini>
          <FiStar />
        </Button>
        <Button round mini>
          <FiTrash />
        </Button>
      </div>
    </li>
  );
}

export default RecipeItem;
