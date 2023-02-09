import styles from "./Day.module.css";
import Button from "../../UI/Button/Button";
import { FiPlus } from "react-icons/fi";
import { useContext, useMemo } from "react";
import LayoutContext from "../../../contexts/layout";
import Meal from "./Meal/Meal";
import { Draggable, Droppable } from "react-beautiful-dnd";

function Day({ title, meals, onNewMeal, onDeleteMeal }) {
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
    return meals.map((meal, index) => (
      <Meal
        key={meal.app_id}
        index={index}
        onDeleteMeal={(e) => onDeleteMeal(e, meal)}
        meal={meal}
      />
    ));
  }, [meals, onDeleteMeal]);

  return (
    <div className={classes}>
      <div className={styles.title}>{title}</div>
      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} className={styles.droppable}>
            <ul className={styles.list}>{meals && mealsContent}</ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {btnAdd}
    </div>
  );
}

export default Day;
