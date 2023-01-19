import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchPlan } from "../../apis/plan";
import { formatDate } from "../../utils/dates";
import AuthContext from "../auth";
import IngredientsContext from "../ingredients";

import * as model from "./plan";

const PlanContext = createContext();

export const PlanContextProvider = ({ children }) => {
  // Get authToken
  const { token } = useContext(AuthContext);

  // Get ingredients for plan calculations
  const { ingredients } = useContext(IngredientsContext);
  // Filter storage ingredients
  const storage = useMemo(
    () => ingredients.filter((item) => item.type === "storage"),
    [ingredients]
  );

  // Define plan state
  const [plan, setPlan] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [activeWeek, setActiveWeek] = useState(null);

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
    }
  };

  // Update existing week
  const editWeek = async (week) => {
    try {
      // Update week
      const res = await model.editWeek(week);

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
    }
  };

  // Update multiple weeks
  const editMultipleWeeks = async (payload, token) => {
    try {
      // Update weeks
      const res = await model.editMultipleWeeks(payload, token);

      if (res.status === 200) {
        // Update State
        setPlan([...res.data]);

        // Update active week
        setActiveWeek((current) =>
          res.data.find((week) => week.id === current.id)
        );
      }

      return res;
    } catch (error) {
      console.error(error);
    }
  };
  window.editMultipleWeeks = editMultipleWeeks;
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

  // Fetch the plan
  useEffect(() => {
    async function fetchData() {
      console.log("fetching plan..."); //*: dev only line
      const response = await fetchPlan(token);
      // Update plan state
      setPlan(response.data);

      // Get current week from updated plan
      let currentWeek = model.getCurrentWeek(response.data);

      try {
        // If no currentWeek then create new
        if (!currentWeek) currentWeek = await addWeek();

        // Set current week
        setCurrentWeek(currentWeek);

        // Set current week as active
        setActiveWeek(currentWeek);

        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [token]);

  // Recalculate plan on storage or plan change
  useEffect(() => {
    if (!plan || !storage) return;
    // Reassign storage to meals
    model.recalculatePlan(plan, storage);
  }, [plan, storage]);

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
  };
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};

export default PlanContext;
