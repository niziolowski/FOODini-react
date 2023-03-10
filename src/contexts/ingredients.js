import { createContext, useState, useEffect, useContext } from "react";
import {
  fetchIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  createOrEditIngredients,
  updateShoppingList,
  refillStorage,
} from "../apis/ingredients";
import { v4 as uuid } from "uuid";
import AuthContext from "./auth";
import ErrorContext from "./error";

const IngredientsContext = createContext();

export const IngredientsContextProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const { setError } = useContext(ErrorContext);
  const [ingredients, setIngredients] = useState([]);

  const [tags] = useState(["świeże", "suche", "mrożone"]);

  const addIngredient = async (ing) => {
    const { id } = JSON.parse(localStorage.getItem("user"));
    const appId = uuid();

    try {
      const updatedIng = { ...ing, users_id: id, app_id: appId };
      const res = await createIngredient(updatedIng);

      if (res.status === 200) {
        const updated = [...ingredients, res.data];
        // Update State
        setIngredients(updated);
        return updated;
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

  /**
   * If item has id, update, if not, create new record
   * @param {Array} payload Array of ingredients
   */
  const addOrEditIngredients = async (payload, token) => {
    const { id } = JSON.parse(localStorage.getItem("user"));

    const updatedPayload = payload.map((ing) => {
      const appId = uuid();
      return { ...ing, users_id: id, app_id: ing.app_id || appId };
    });

    try {
      const res = await createOrEditIngredients(
        { payload: updatedPayload },
        token
      );
      if (res.status === 200) {
        // Update State
        setIngredients((current) => [...res.data]);

        return res.data;
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

  const moveToStorage = async (payload, token) => {
    const { id } = JSON.parse(localStorage.getItem("user"));

    const updatedPayload = payload.map((ing) => {
      const appId = uuid();
      return { ...ing, users_id: id, app_id: ing.app_id || appId };
    });

    try {
      const res = await refillStorage({ payload: updatedPayload }, token);

      if (res.status === 200) {
        // Update State
        setIngredients((current) => [...res.data]);

        return res.data;
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

  /**
   * Delete all user's items of type "shopping-list" then add new records from payload
   * @param {Array} payload Array of ingredients
   */
  const editShoppingList = async (payload, token) => {
    const { id } = JSON.parse(localStorage.getItem("user"));

    const updatedPayload = payload.map((ing) => {
      const appId = uuid();
      return { ...ing, users_id: id, app_id: ing.app_id || appId };
    });

    try {
      const res = await updateShoppingList({ payload: updatedPayload }, token);
      if (res.status === 200) {
        // Update State
        setIngredients((current) => [...res.data]);

        return res.data;
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

  const getIngredientById = (id) => {
    return ingredients.find((ing) => ing.id === id);
  };

  useEffect(() => {
    async function fetchData() {
      console.log("fetching ingredients..."); //*: dev only line

      try {
        const response = await fetchIngredients(token);

        setIngredients(response.data);
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
    }
    fetchData();
  }, [token, setError]);

  const value = {
    tags,
    ingredients,
    setIngredients,
    fetchIngredients,
    addIngredient,
    editIngredient,
    removeIngredient,
    getIngredientById,
    addOrEditIngredients,
    editShoppingList,
    moveToStorage,
  };

  return (
    <IngredientsContext.Provider value={value}>
      {children}
    </IngredientsContext.Provider>
  );
};

export default IngredientsContext;
