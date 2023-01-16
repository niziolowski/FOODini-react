import styles from "./Meal.module.css";
import Button from "../../../UI/Button/Button";
import { FiTrash } from "react-icons/fi";

function Meal({ meal, onDeleteMeal }) {
  console.log(meal.tag);

  return (
    <li className={styles.meal}>
      <div>{meal.name}</div>
      <div
        className={styles.tag}
        style={{
          backgroundColor: `var(--tag-${meal.tag}-color)`,
        }}
      ></div>
      <Button onClick={onDeleteMeal} doubleAction round mini>
        <FiTrash />
      </Button>
    </li>
  );
}

export default Meal;
