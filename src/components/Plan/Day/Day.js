import styles from "./Day.module.css";
import Button from "../../UI/Button/Button";
import { FiPlus } from "react-icons/fi";
import { useContext, useMemo } from "react";
import LayoutContext from "../../../contexts/layout";
import Meal from "./Meal/Meal";

function Day({ title, meals, onNewMeal }) {
  const { isMobile } = useContext(LayoutContext);

  const handleClick = (e) => {
    const btn = e.target.closest("button");

    // Add meal
    if (btn.classList.contains("js-add-meal")) onNewMeal();
  };

  const btnAdd = (
    <Button className="js-add-meal" onClick={handleClick} primary round mini>
      <FiPlus />
    </Button>
  );

  const classes = `${styles.day} ${isMobile && styles.mobile}`;

  const mealsContent = useMemo(() => {
    if (!meals) return null;
    meals.map((meal) => <Meal key={meal.app_id} title={meal.name} />);
  }, [meals]);

  return (
    <div className={classes}>
      <div className={styles.title}>{title}</div>
      <ul className={styles.list}>{meals && mealsContent}</ul>
      {btnAdd}
    </div>
  );
}

export default Day;
