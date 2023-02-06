import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchPlan } from "../../apis/plan";
import { formatDate } from "../../utils/dates";
import AuthContext from "../auth";
import ErrorContext from "../error";
import IngredientsContext from "../ingredients";

import * as model from "./plan";

const PlanContext = createContext();

export const PlanContextProvider = ({ children }) => {
  const { setError } = useContext(ErrorContext);

  // Get authToken
  const { token } = useContext(AuthContext);

  // Get ingredients for plan calculations
  const { ingredients, setIngredients } = useContext(IngredientsContext);
  // Filter storage ingredients
  const storage = useMemo(
    () => ingredients?.filter((item) => item.type === "storage"),
    [ingredients]
  );

  // Define plan state
  const [plan, setPlan] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [activeWeek, setActiveWeek] = useState(null);
  const [loading, setLoading] = useState(false);

  // Create a new Week from a given date
  const addWeek = async (dateString) => {
    try {
      // Create an empty week from a given date
      const res = await model.addWeek(dateString);

      if (res.status === 200) {
        // Update State
        setPlan((current) => [...current, res.data]);

        // Set new week as active
        setActiveWeek(res.data);
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
    }
  };

  // Update existing week
  const editWeek = async (week) => {
    try {
      // Update week
      const res = await model.editWeek(week);

      if (res.status === 200) {
        const el = plan.find((item) => item.id === week.id);
        const index = plan.indexOf(el);
        const updated = [...plan];
        updated.splice(index, 1, res.data);

        // Update State
        setPlan([...updated]);

        // Update active week
        setActiveWeek(res.data);

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
    }
  };

  // Toggle week sync parameter
  const toggleWeekSync = async (week) => {
    try {
      const res = await model.toggleWeekSync(week);

      if (res.status === 200) {
        // Update State
        setPlan((current) => {
          const el = current.find((item) => item.id === week.id);
          const index = current.indexOf(el);
          const updated = [...current];

          updated.splice(index, 1, res.data);

          return [...updated];
        });

        // Update active week
        setActiveWeek(res.data);
      }

      return res;
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
    }
  };

  // Swich activeWeek to the next one and if it doesn't exist, create one
  const nextWeek = async () => {
    try {
      // Get active week end date
      const endDate = activeWeek.end_date;
      // Add one day to get starDate of the next week
      const newDate = new Date(endDate).getTime() + 1 * 1000 * 60 * 60 * 24;
      // Format the date (string)
      const nextWeekDate = formatDate(new Date(newDate));

      // Check if next week exist
      let nextWeek = plan.find((week) =>
        nextWeekDate >= week.start_date && nextWeekDate <= week.end_date
          ? week
          : null
      );
      // If not, create it and add to plan
      if (!nextWeek) nextWeek = await addWeek(nextWeekDate);

      // Set new week as active
      setActiveWeek(nextWeek);

      return nextWeek;
    } catch (error) {
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

      throw error;
    }
  };

  // Swich activeWeek to the previous one
  const previousWeek = () => {
    // Get previous week
    const previousWeek = model.getPreviousWeek(activeWeek, plan);

    // If no previous week, return
    if (!previousWeek) return;

    // Set new week as active
    setActiveWeek(previousWeek);

    return previousWeek;
  };

  // Recalculates available ingredients based on storage and meal plan.
  // Takes plan object and deletedMeal object
  const recalculatePlan = async (updatedPlan, updatedStorage, deletedMeal) => {
    try {
      // Recalculate Plan
      const payload = model.recalculatePlan(
        updatedPlan || plan,
        updatedStorage || storage,
        deletedMeal
      );

      const response = await model.updatePlan(payload, token);

      if (response.status === 200) {
        // PLAN
        // Update plan state
        setPlan((current) => response.data.plan);

        // INGREDIENTS
        // Update ingredients state
        setIngredients((current) => response.data.ingredients);

        // CURRENT WEEK
        // Get current week from updated plan
        let currentWeek = model.getCurrentWeek(response.data.plan);

        // Set current week
        setCurrentWeek((current) => currentWeek);

        // ACTIVE WEEK
        // Get active week from updated plan
        const updatedActiveWeek = response.data.plan.find(
          (week) => week.id === activeWeek.id
        );

        // Set active week
        setActiveWeek((current) => updatedActiveWeek);
      }
      return response.data.plan;
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
    }
  };

  // Fetch the plan
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        console.log("fetching plan..."); //*: dev only line
        const response = await fetchPlan(token);

        // Update plan state
        setPlan(response.data);

        // Get current week from updated plan
        let currentWeek = model.getCurrentWeek(response.data);

        // If no currentWeek then create new
        if (!currentWeek) currentWeek = await addWeek();

        // Set current week
        setCurrentWeek(currentWeek);

        // Set current week as active
        setActiveWeek(currentWeek);

        setLoading(false);
        return response.data;
      } catch (error) {
        setLoading(false);
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
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [token]);

  //   Update current week on plan change
  useEffect(() => {
    if (!plan) return;

    // Find current week in the plan
    const updatedCurrentWeek = plan.find((week) => week.id === currentWeek.id);

    // Update current week
    setCurrentWeek(updatedCurrentWeek);
  }, [plan, currentWeek?.id]);

  const value = {
    plan,
    addWeek,
    editWeek,
    currentWeek,
    activeWeek,
    previousWeek,
    nextWeek,
    setActiveWeek,
    toggleWeekSync,
    recalculatePlan,
    loading,
  };
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};

export default PlanContext;
