import styles from "./Meal.module.css";
import Button from "../../../UI/Button/Button";
import { FiTrash } from "react-icons/fi";
import LayoutContext from "../../../../contexts/layout";
import { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";

function Meal({ meal, onDeleteMeal, index }) {
  const { isMobile } = useContext(LayoutContext);
  return (
    <Draggable draggableId={meal.app_id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${styles.meal} ${isMobile && styles.mobile}`}
        >
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
      )}
    </Draggable>
  );
}

export default Meal;
