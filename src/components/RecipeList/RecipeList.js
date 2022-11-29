import { useContext } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./RecipeList.module.css";

function RecipeList() {
  const { isMobile } = useContext(LayoutContext);
  return (
    <div
      className={`${styles["recipe-list"]} ${isMobile ? styles.mobile : ""}`}
    >
      RecipeList
    </div>
  );
}

export default RecipeList;
