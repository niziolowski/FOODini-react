import { useContext } from "react";
import { FiStar, FiTrash } from "react-icons/fi";
import UserDataContext from "../../../contexts/user-data";
import BarIndicator from "../../UI/BarIndicator/BarIndicator";
import Button from "../../UI/Button/Button";
import DifficultyIndicator from "../../UI/DifficultyIndicator/DifficultyIndicator";
import styles from "./RecipeItem.module.css";

function RecipeItem({ item, onPreview }) {
  const { tagsRec } = useContext(UserDataContext);

  const handleClick = () => {
    onPreview(item);
  };

  return (
    <li className={styles["recipe-item"]}>
      <div className={styles["image-wrapper"]}>
        <img
          className={styles.image}
          src="https://www.seriouseats.com/thmb/WzQz05gt5witRGeOYKTcTqfe1gs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/butter-basted-pan-seared-steaks-recipe-hero-06-03b1131c58524be2bd6c9851a2fbdbc3.jpg"
          alt="recipe"
        />
        <div className={styles.tag}>{tagsRec[item.tag]}</div>
      </div>

      <div className={styles.col}>
        <div onClick={handleClick} className={styles.title}>
          {item.title}
        </div>
        <div className={styles.info}>
          <DifficultyIndicator value={item.difficulty} />
          <BarIndicator label="Składniki" value={30} />
        </div>
      </div>
      <div className={styles.col}>
        <Button round mini fillIcon active={item.bookmark}>
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
