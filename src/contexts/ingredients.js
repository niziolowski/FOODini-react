import { createContext, useState, useEffect } from "react";
import { fetchIngredients, createIngredient } from "../apis/ingredients";

const IngredientsContext = createContext();

export const IngredientsContextProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);

  const testData = {
    id: null,
    app_id: 1,
    name: "Jajka",
    type: "storage",
    amount: 10,
    unit: "szt.",
    expiry: 14,
    purchase_date: new Date(),
    tag: 0,
    bookmark: false,
    created_at: null,
    users_id: null,
    recipes_id: null,
  };

  createIngredient(testData);

  useEffect(() => {
    async function fetchData() {
      console.log("fetching ingredients..."); //*: dev only line
      const response = await fetchIngredients();
      setIngredients(response.data);
    }
    fetchData();
  }, []);

  const value = {
    ingredients,
    fetchIngredients,
  };

  return (
    <IngredientsContext.Provider value={value}>
      {children}
    </IngredientsContext.Provider>
  );
};

export default IngredientsContext;
