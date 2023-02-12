import styles from "./Day.module.css";
import Button from "../../UI/Button/Button";
import { FiPlus } from "react-icons/fi";
import { useContext, useMemo } from "react";
import LayoutContext from "../../../contexts/layout";
import Meal from "./Meal/Meal";
import { Droppable } from "react-beautiful-dnd";

function Day({ title, meals, onNewMeal, onDeleteMeal }) {
  const { isMobile } = useContext(LayoutContext);

  // Combine classes into one variable
  const classes = `${styles.day} ${isMobile && styles.mobile}`;

  // TODO: Refactor this for multilanguage
  // Define Polish day names
  const dayNames = new Map([
    ["monday", "Poniedziałek"],
    ["tuesday", "Wtorek"],
    ["wednesday", "Środa"],
    ["thursday", "Czwartek"],
    ["friday", "Piątek"],
    ["saturday", "Sobota"],
    ["sunday", "Niedziela"],
  ]);

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
    <Droppable droppableId={title}>
      {(provided, snapshot) => {
        return (
          <div
            className={`${classes} ${
              snapshot.isDraggingOver && styles.dragover
            }`}
          >
            <div className={styles.title}>{dayNames.get(title)}</div>
            <div ref={provided.innerRef} className={styles.droppable}>
              <ul className={styles.list}>{meals && mealsContent}</ul>
              {provided.placeholder}
            </div>
            {btnAdd}
          </div>
        );
      }}
    </Droppable>
  );
}

export default Day;
