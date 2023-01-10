import { createContext, useContext, useEffect, useState } from "react";
import { createWeek, fetchPlan } from "../apis/plan";
import AuthContext from "./auth";

const PlanContext = createContext();

export const PlanContextProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const { token } = useContext(AuthContext);

  const addWeek = async (week) => {
    const { id } = JSON.parse(localStorage.getItem("user"));
    try {
      const updatedWeek = { ...week, users_id: id };
      const res = await createWeek(updatedWeek);

      if (res.status === 200) {
        // Update State
        setPlan((current) => [...current, res.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const testData = {
    days: {
      monday: {
        meals: {
          recipes_id: [99, 66],
          ingredients_id: [544, 545],
        },
      },
      tuesday: {
        meals: {
          recipes_id: [],
          ingredients_id: [],
        },
      },
      wednesday: {
        meals: {
          recipes_id: [],
          ingredients_id: [],
        },
      },
      thursday: {
        meals: {
          recipes_id: [],
          ingredients_id: [],
        },
      },
      friday: {
        meals: {
          recipes_id: [],
          ingredients_id: [],
        },
      },
      saturday: {
        meals: {
          recipes_id: [],
          ingredients_id: [],
        },
      },
      sunday: {
        meals: {
          recipes_id: [],
          ingredients_id: [],
        },
      },
    },
    users_id: 21,
    sync: "false",
    start_date: "2022-01-10",
    end_date: "2022-01-16",
  };

  useEffect(() => {
    async function fetchData() {
      console.log("fetching plan..."); //*: dev only line
      const response = await fetchPlan(token);

      // Change response key names for ingtegrity (recipes_id and ingredients_id are converted but names persist)
      // ? Not optimal but i don't know how to change object key names inside xano.com after conversion from just an id
      response.data.forEach((week) => {
        for (const [key, value] of Object.entries(week.days)) {
          const ingredients = value.meals.ingredients_id;
          const recipes = value.meals.recipes_id;

          delete Object.assign(week.days[key].meals, { recipes: recipes })[
            "recipes_id"
          ];
          delete Object.assign(week.days[key].meals, {
            ingredients: ingredients,
          })["ingredients_id"];
        }
      });

      setPlan(response.data);
    }
    fetchData();
  }, [token]);

  const value = { plan, addWeek };
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};
