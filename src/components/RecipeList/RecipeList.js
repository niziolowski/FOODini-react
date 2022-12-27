import { useCallback, useContext, useEffect, useState } from "react";
import LayoutContext from "../../contexts/layout";
import RecipeView from "../RecipeView/RecipeView";
import FilterOptions from "../UI/FilterOptions/FilterOptions";
import RecipeItem from "./RecipeItem/RecipeItem";
import styles from "./RecipeList.module.css";

function RecipeList() {
  const { isMobile } = useContext(LayoutContext);
  const [recipes] = useState([
    {
      id: 123,
      name: "Jajecznica",
      difficulty: 5,
      ingredients: [{ name: "Wołowina", amount: "200", unit: "g" }],
      instructions: "blablabla",
      spices: ["Sól", "Pieprz"],
      bookmark: false,
      tag: 1,
    },
    {
      id: 123,
      name: "Stek wołowy",
      difficulty: 1,
      ingredients: [{ name: "Wołowina", amount: "200", unit: "g" }],
      instructions: "blablabla",
      spices: ["Sól", "Pieprz"],
      bookmark: true,
      tag: 1,
    },
    {
      id: 123,
      name: "Makaron z sosem pomidorowym",
      difficulty: 2,
      ingredients: [{ name: "Wołowina", amount: "200", unit: "g" }],
      instructions: "blablabla",
      spices: ["Sól", "Pieprz"],
      bookmark: false,
      tag: 1,
    },
    {
      id: 123,
      name: "Schabowy",
      difficulty: 1,
      ingredients: [{ name: "Wołowina", amount: "200", unit: "g" }],
      instructions: "blablabla",
      spices: ["Sól", "Pieprz"],
      bookmark: true,
      tag: 1,
    },
    {
      id: 123,
      name: "Pizza",
      difficulty: 2,
      ingredients: [{ name: "Wołowina", amount: "200", unit: "g" }],
      instructions: "blablabla",
      spices: ["Sól", "Pieprz"],
      bookmark: true,
      tag: 1,
    },
    {
      id: 123,
      name: "Kotlety",
      difficulty: 1,
      ingredients: [{ name: "Wołowina", amount: "200", unit: "g" }],
      instructions: "blablabla",
      spices: ["Sól", "Pieprz"],
      bookmark: false,
      tag: 1,
    },
    {
      id: 123,
      name: "Kluski",
      difficulty: 4,
      ingredients: [{ name: "Wołowina", amount: "200", unit: "g" }],
      instructions: "blablabla",
      spices: ["Sól", "Pieprz"],
      bookmark: true,
      tag: 1,
    },
  ]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

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

  const handleFilterChange = useCallback((data) => {
    setFilteredRecipes(data);
  }, []);

  return (
    <>
      <div
        className={`${styles["recipe-list"]} ${isMobile ? styles.mobile : ""}`}
      >
        <FilterOptions
          onAddRecipe={handleAddRecipe}
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
        <RecipeView onClose={handlePreviewClose} data={recipeToShow} />
      )}
    </>
  );
}

export default RecipeList;
