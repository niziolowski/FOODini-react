import { useContext } from "react";
import LayoutContext from "../../contexts/layout";
import FilterOptions from "../UI/FilterOptions/FilterOptions";
import RecipeItem from "./RecipeItem/RecipeItem";
import styles from "./RecipeList.module.css";

function RecipeList() {
  const { isMobile } = useContext(LayoutContext);
  return (
    <div
      className={`${styles["recipe-list"]} ${isMobile ? styles.mobile : ""}`}
    >
      <FilterOptions />
      <RecipeItem />
    </div>
  );
}

export default RecipeList;
