import { createContext, useContext, useState, useCallback } from "react";
import AuthContext from "./auth";

const IngredientsContext = createContext();

const URL_INGREDIENTS =
  "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/ingredients";

export const IngredientsContextProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = useCallback(async () => {
    console.log("ingredients fetching...");
    const res = await fetch(URL_INGREDIENTS, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setIngredients(data);
  }, [token]);

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
