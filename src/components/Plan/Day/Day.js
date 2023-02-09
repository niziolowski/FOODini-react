import styles from "./Day.module.css";
import Button from "../../UI/Button/Button";
import { FiPlus } from "react-icons/fi";
import { useContext, useMemo, useState } from "react";
import LayoutContext from "../../../contexts/layout";
import Meal from "./Meal/Meal";
import { Droppable } from "react-beautiful-dnd";

function Day({ title, meals, onNewMeal, onDeleteMeal }) {
  const { isMobile } = useContext(LayoutContext);

  // State for indicating dragging over
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Combine classes into one variable
  const classes = `${styles.day} ${isMobile && styles.mobile} ${
    isDraggingOver && styles.dragover
  }`;

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
        {(provided, snapshot) => {
          // Update isDraggingOver state for parent styling
          setIsDraggingOver(snapshot.isDraggingOver);

          return (
            <div ref={provided.innerRef} className={styles.droppable}>
              <ul className={styles.list}>{meals && mealsContent}</ul>
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
      {btnAdd}
    </div>
  );
}

export default Day;
