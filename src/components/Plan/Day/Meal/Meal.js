import styles from "./Meal.module.css";
import Button from "../../../UI/Button/Button";
import { FiTrash } from "react-icons/fi";

function Meal({ title, onDeleteMeal }) {
  return (
    <li className={styles.meal}>
      <div>{title}</div>
      <Button onClick={onDeleteMeal} doubleAction round mini>
        <FiTrash />
      </Button>
    </li>
  );
}

export default Meal;
