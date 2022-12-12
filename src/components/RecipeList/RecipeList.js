import { useContext, useState } from "react";
import LayoutContext from "../../contexts/layout";
import RecipeView from "../RecipeView/RecipeView";
import FilterOptions from "../UI/FilterOptions/FilterOptions";
import RecipeItem from "./RecipeItem/RecipeItem";
import styles from "./RecipeList.module.css";

function RecipeList() {
  const { isMobile } = useContext(LayoutContext);

  const [isPreviewActive, setIsPreviewActive] = useState(null);
  const [recipeToShow, setRecipeToShow] = useState(null);
  // Display recipe form
  const handleAddRecipe = () => {
    setIsPreviewActive(true);
  };

  const handlePreviewClose = () => {
    setIsPreviewActive(false);
    setRecipeToShow(null);
  };

  const handleShowRecipe = (recipe) => {
    setIsPreviewActive(true);
    setRecipeToShow(recipe);
  };

  const data = [
    {
      id: 123,
      title: "Stek wołowy",
      difficulty: 1,
      ingredients: [{ name: "Wołowina", amount: "200", unit: "g" }],
      instructions: "blablabla",
      spices: ["Sól", "Pieprz"],
      bookmark: true,
      tag: 1,
    },
    {
      id: 124,
      title: "Jajecznica",
      difficulty: 2,
      ingredients: [{ name: "Jajka", amount: "4", unit: "szt" }],
      instructions: "afasdfwofn;asdf",
      spices: ["Sól", "Pieprz"],
      bookmark: false,
      tag: 0,
    },
  ];

  return (
    <>
      <div
        className={`${styles["recipe-list"]} ${isMobile ? styles.mobile : ""}`}
      >
        <FilterOptions onAddRecipe={handleAddRecipe} />
        <ul className={styles.list}>
          {data.map((recipe) => (
            <RecipeItem
              key={recipe.id}
              item={recipe}
              onPreview={handleShowRecipe}
            />
          ))}
        </ul>
      </div>
      {isPreviewActive && (
        <RecipeView onClose={handlePreviewClose} data={recipeToShow} />
      )}
    </>
  );
}

export default RecipeList;
