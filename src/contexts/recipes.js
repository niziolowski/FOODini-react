import { createContext, useState, useEffect } from "react";
import {
  fetchRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../apis/recipes";

const RecipesContext = createContext();

export const RecipesContextProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [tags] = useState(["śniadanie", "obiad", "przekąska"]);

  const addRecipe = async (rec) => {
    const { id } = JSON.parse(localStorage.getItem("user"));

    try {
      const updatedRec = { ...rec, users_id: id };
      const res = await createRecipe(updatedRec);

      if (res.status === 200) {
        // Update State
        setRecipes((current) => [...current, res.data]);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const editRecipe = async (rec) => {
    console.log(rec);
    // create ingredients object with only the id reference
    const recipeIngredients = rec.ingredients.map((ing) => ing.id);

    // create updated recipe object
    const updatedRecipe = {
      ...rec,
      ingredients: recipeIngredients,
    };

    try {
      const res = await updateRecipe(updatedRecipe);

      if (res.status === 200) {
        // Update State
        setRecipes((current) => {
          const el = current.find((item) => item.id === rec.id);
          const index = current.indexOf(el);
          const updated = [...current];
          updated.splice(index, 1, res.data);

          return [...updated];
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  const removeRecipe = async (id) => {
    try {
      const res = await deleteRecipe(id);
      if (res.status === 200) {
        // Update State
        setRecipes((current) => [...current.filter((rec) => rec.id !== id)]);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      console.log("fetching recipes..."); //*: dev only line
      const response = await fetchRecipes();

      setRecipes(response.data);
    }
    fetchData();
  }, []);

  const value = {
    tags,
    recipes,
    addRecipe,
    editRecipe,
    removeRecipe,
  };
  return (
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  );
};

export default RecipesContext;
