import { createContext, useState, useEffect } from "react";
import {
  fetchIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "../apis/ingredients";
import { v4 as uuid } from "uuid";

const IngredientsContext = createContext();

export const IngredientsContextProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [tags] = useState(["świeże", "suche", "mrożone"]);

  const addIngredient = async (ing) => {
    const { id } = JSON.parse(localStorage.getItem("user"));
    const appId = uuid();

    try {
      const updatedIng = { ...ing, users_id: id, app_id: appId };
      const res = await createIngredient(updatedIng);

      if (res.status === 200) {
        // Update State
        setIngredients((current) => [...current, res.data]);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const editIngredient = async (ing) => {
    const { id } = JSON.parse(localStorage.getItem("user"));

    try {
      const updatedIng = { ...ing, users_id: id };
      const res = await updateIngredient(updatedIng);

      if (res.status === 200) {
        // Update State
        setIngredients((current) => {
          const el = current.find((item) => item.id === ing.id);
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

  const removeIngredient = async (id) => {
    try {
      const res = await deleteIngredient(id);
      if (res.status === 200) {
        // Update State
        setIngredients((current) => [
          ...current.filter((ing) => ing.id !== id),
        ]);
      }
    } catch (error) {
      alert(error);
    }
  };

  const getIngredientById = (id) => {
    return ingredients.find((ing) => ing.id === id);
  };

  useEffect(() => {
    async function fetchData() {
      console.log("fetching ingredients..."); //*: dev only line
      const response = await fetchIngredients();

      setIngredients(response.data);
    }
    fetchData();
  }, []);

  const value = {
    tags,
    ingredients,
    fetchIngredients,
    addIngredient,
    editIngredient,
    removeIngredient,
    getIngredientById,
  };

  return (
    <IngredientsContext.Provider value={value}>
      {children}
    </IngredientsContext.Provider>
  );
};

export default IngredientsContext;
