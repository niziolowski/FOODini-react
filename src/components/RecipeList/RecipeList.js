import { useCallback, useContext, useEffect, useState } from "react";
import LayoutContext from "../../contexts/layout";
import RecipesContext from "../../contexts/recipes";
import RecipeForm from "../RecipeForm/RecipeForm";
import RecipeView from "../RecipeView/RecipeView";
import FilterOptions from "../UI/FilterOptions/FilterOptions";
import RecipeItem from "./RecipeItem/RecipeItem";
import styles from "./RecipeList.module.css";

function RecipeList() {
  const { isMobile } = useContext(LayoutContext);
  const { recipes } = useContext(RecipesContext);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [isRecipeForm, setIsRecipeForm] = useState(false);
  const [recipeData, setRecipeData] = useState(null);
  // Display recipe form

  const handlePreviewClose = () => {
    setIsPreviewActive(false);
    setRecipeData(null);
  };

  const handleShowRecipe = (recipe) => {
    setRecipeData(recipe);
    setIsPreviewActive(true);
  };

  const handleFilterChange = useCallback((data) => {
    setFilteredRecipes(data);
  }, []);

  const handleRecipeFormToggle = () => {
    setIsRecipeForm((current) => !current);
  };

  const handleRecipeEdit = () => {
    handleRecipeFormToggle();
  };

  // When recipe state changes and recipeData exists, update recipeData. Probably not optimal
  useEffect(() => {
    if (recipeData) {
      const updatedRec = recipes.find((rec) => rec.id === recipeData.id);
      setRecipeData(updatedRec);
    }
  }, [recipes, recipeData]);

  return (
    <>
      <div
        className={`${styles["recipe-list"]} ${isMobile ? styles.mobile : ""}`}
      >
        {isRecipeForm && (
          <RecipeForm onClose={handleRecipeFormToggle} data={recipeData} />
        )}
        <FilterOptions
          onAddItem={handleRecipeFormToggle}
          onFilterChange={handleFilterChange}
          options={["nazwa", "trudność"]}
          data={recipes}
        />
        <ul className={styles.list}>
          {filteredRecipes.map((recipe) => (
            <RecipeItem
              key={recipe.id}
              item={recipe}
              onPreview={handleShowRecipe}
            />
          ))}
        </ul>
      </div>
      {isPreviewActive && (
        <RecipeView
          onClose={handlePreviewClose}
          onEdit={handleRecipeEdit}
          data={recipeData}
        />
      )}
    </>
  );
}

export default RecipeList;
