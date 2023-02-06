import { createContext, useState, useEffect, useContext } from "react";
import {
  fetchRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../apis/recipes";
import AuthContext from "./auth";
import ErrorContext from "./error";

const RecipesContext = createContext();

export const RecipesContextProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const { setError } = useContext(ErrorContext);

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
      console.error(error);

      // set error message for the user
      switch (error.response.status) {
        case 429:
          setError(
            "Wykorzystano darmowy limit serwera. Odczekaj chwilę i spróbuj ponownie"
          );
          break;
        case 503:
          setError("Nie można nawiązać połączenia z serwerem");
          break;

        default:
          setError("Coś poszło nie tak :(");
          break;
      }

      // pass error
      throw error;
    }
  };

  const editRecipe = async (rec) => {
    const { id } = JSON.parse(localStorage.getItem("user"));
    try {
      const updatedRec = { ...rec, users_id: id };

      // Upload to API
      const res = await updateRecipe(updatedRec);

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
      console.error(error);

      // set error message for the user
      switch (error.response.status) {
        case 429:
          setError(
            "Wykorzystano darmowy limit serwera. Odczekaj chwilę i spróbuj ponownie"
          );
          break;
        case 503:
          setError("Nie można nawiązać połączenia z serwerem");
          break;

        default:
          setError("Coś poszło nie tak :(");
          break;
      }

      // pass error
      throw error;
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
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("fetching recipes..."); //*: dev only line
        const response = await fetchRecipes(token);

        setRecipes(response.data);
      } catch (error) {
        console.error(error);

        // set error message for the user
        switch (error.response.status) {
          case 429:
            setError(
              "Wykorzystano darmowy limit serwera. Odczekaj chwilę i spróbuj ponownie"
            );
            break;
          case 503:
            setError("Nie można nawiązać połączenia z serwerem");
            break;

          default:
            setError(
              "Nie można było załadować przepisów. Spróbuj odświeżyć stronę"
            );
            break;
        }

        // pass error
        throw error;
      }
    }
    fetchData();
  }, [token, setError]);

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
