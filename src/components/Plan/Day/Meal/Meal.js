import styles from "./Meal.module.css";
import Button from "../../../UI/Button";
import { FiTrash } from "react-icons/fi";

function Meal({ title }) {
  return (
    <li className={styles.meal}>
      <div>{title}</div>
      <Button round mini>
        <FiTrash />
      </Button>
    </li>
  );
}

export default Meal;
