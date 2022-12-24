import { createContext, useContext, useState, useEffect } from "react";
import AuthContext from "./auth";
import { fetchIngredients } from "../apis/ingredients";

const IngredientsContext = createContext();

export const IngredientsContextProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);

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
