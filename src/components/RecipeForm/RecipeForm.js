import { FiX } from "react-icons/fi";
import Button from "../UI/Button/Button";
import styles from "./RecipeForm.module.css";

function RecipeForm({ isActive }) {
  const content = (
    <div className={styles["recipe-form"]}>
      <header className={styles.header}>
        <h1>Stwórz nowy przepis</h1>
        <Button round>
          <FiX />
        </Button>
      </header>
    </div>
  );
  return <>{isActive && content}</>;
}

export default RecipeForm;
