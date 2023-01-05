import { createContext, useEffect, useState } from "react";
import { createWeek, fetchPlan } from "../apis/plan";

const PlanContext = createContext();

export const PlanContextProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);

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

  useEffect(() => {
    async function fetchData() {
      console.log("fetching plan..."); //*: dev only line
      const response = await fetchPlan();

      setPlan(response.data);
      console.log(plan);
    }
    fetchData();
  }, []);

  const value = { plan, addWeek };
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};
