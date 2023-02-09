import { useCallback, useContext, useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
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
  //? Maybe refactor this with useMemo and useState combination?
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
        <Droppable droppableId="recipe-list">
          {(provided) => (
            <ul ref={provided.innerRef} className={styles.list}>
              {filteredRecipes.map((recipe, index) => (
                <RecipeItem
                  item={recipe}
                  onPreview={handleShowRecipe}
                  key={recipe.id}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
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
