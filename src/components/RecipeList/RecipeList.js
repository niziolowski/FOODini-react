import { useCallback, useContext, useState } from "react";
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
  // const [recipes] = useState([
  //   {
  //     id: 123,
  //     name: "Jajecznica",
  //     difficulty: 5,
  //     ingredients: [{ name: "Wołowina", amount: "200", unit: "g" }],
  //     instructions: "blablabla",
  //     spices: ["Sól", "Pieprz"],
  //     bookmark: false,
  //     tag: 1,
  //   },
  // ]);
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
    setIsPreviewActive(true);
    setRecipeData(recipe);
  };

  const handleFilterChange = useCallback((data) => {
    setFilteredRecipes(data);
  }, []);

  const handleRecipeFormToggle = () => {
    setIsRecipeForm((current) => !current);
  };

  const handleRecipeEdit = (data) => {
    setRecipeData(data);
    handleRecipeFormToggle();
  };

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
