import styles from "./Meal.module.css";
import Button from "../../../UI/Button/Button";
import { FiTrash } from "react-icons/fi";
import LayoutContext from "../../../../contexts/layout";
import { useContext } from "react";

function Meal({ meal, onDeleteMeal }) {
  const { isMobile } = useContext(LayoutContext);
  return (
    <li className={`${styles.meal} ${isMobile && styles.mobile}`}>
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
