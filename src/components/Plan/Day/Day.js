import styles from "./Day.module.css";
import Button from "../../UI/Button/Button";
import { FiPlus } from "react-icons/fi";
import { useContext } from "react";
import LayoutContext from "../../../contexts/layout";
import Meal from "./Meal/Meal";

function Day({ title, meals }) {
  const { isMobile } = useContext(LayoutContext);

  const btnAdd = (
    <Button primary round mini>
      <FiPlus />
    </Button>
  );

  const classes = `${styles.day} ${isMobile && styles.mobile}`;

  return (
    <div className={classes}>
      <div className={styles.title}>{title}</div>
      <ul className={styles.list}>
        {meals.map((meal) => (
          <Meal key={meal.app_id} title={meal.name} />
        ))}
      </ul>
      {btnAdd}
    </div>
  );
}

export default Day;
