import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createWeek, fetchPlan } from "../apis/plan";
import { formatDate } from "../utils/dates";
import AuthContext from "./auth";

const PlanContext = createContext();

export const PlanContextProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [activeWeek, setActiveWeek] = useState(null);
  const { token } = useContext(AuthContext);

  const getCurrentWeek = useCallback(async (plan) => {
    // Get current time
    const now = new Date().getTime();

    // return current week if exists
    let currentWeek = plan.find((week) => {
      const startDate = new Date(week.start_date).getTime();
      const endDate = new Date(week.end_date).getTime();

      if (now >= startDate && now <= endDate) return week;
      return null;
    });

    try {
      // Create new week if no current week
      if (!currentWeek) currentWeek = await addWeek(now);

      console.log(plan);

      return currentWeek;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addWeek = async (dateString) => {
    //! Dev only
    console.log("adding week...");

    // 1. Get dateRange
    const date = new Date(dateString);

    // Get day of the week (minus one because we want to get to monday)
    const dayNum = date.getDay();
    const daysIn = dayNum === 0 ? -1 : dayNum - 1;

    // Set monday as start date
    let startDate = new Date(date - daysIn * 1000 * 60 * 60 * 24);
    // Set sunday as end date
    let endDate = new Date(startDate.getTime() + 6 * 1000 * 60 * 60 * 24);

    // Format dates to strings
    startDate = formatDate(startDate);
    endDate = formatDate(endDate);

    // 2. Create Week obj
    const week = {
      id: null,
      start_date: startDate,
      end_date: endDate,
      sync: false,
      days: {
        monday: { meals: [{ name: "test" }] },
        tuesday: { meals: [{ name: "test" }] },
        wednesday: { meals: [{ name: "test" }] },
        thursday: { meals: [{ name: "test" }] },
        friday: { meals: [{ name: "test" }] },
        saturday: { meals: [{ name: "test" }] },
        sunday: { meals: [{ name: "test" }] },
      },
    };

    // 3. Upload to plan

    const { id } = JSON.parse(localStorage.getItem("user"));
    try {
      const updatedWeek = { ...week, users_id: id };
      const res = await createWeek(updatedWeek);

      if (res.status === 200) {
        // Update State
        setPlan((current) => [...current, res.data]);
        return res.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Swich the week to the next one and if it doesn't exist, create one
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

  // Swich the week to the previous one
  const previousWeek = () => {
    // Get active week start date
    const startDate = activeWeek.start_date;

    // Subtract one day to get endDate of the previous week
    const newDate = new Date(startDate).getTime() - 7 * 1000 * 60 * 60 * 24;

    // Format the date
    const previousWeekDate = formatDate(new Date(newDate));

    // Check if next week exist
    let previousWeek = plan.find((week) =>
      previousWeekDate >= week.start_date && previousWeekDate <= week.end_date
        ? week
        : null
    );

    if (!previousWeek) return;

    // Set new week as active
    setActiveWeek(previousWeek);

    return previousWeek;
  };

  // !!Dev only
  // const testData = {
  //   id: null,
  //   days: {
  //     monday: {
  //       meals: [
  //         {
  //           id: 1,
  //           type: "ingredient",
  //           name: "Jajka",
  //           amount: 4,
  //           unit: "szt.",
  //         },
  //       ],
  //     },
  //     tuesday: {
  //       meals: [],
  //     },
  //     wednesday: {
  //       meals: [],
  //     },
  //     thursday: {
  //       meals: [],
  //     },
  //     friday: {
  //       meals: [],
  //     },
  //     saturday: {
  //       meals: [],
  //     },
  //     sunday: {
  //       meals: [],
  //     },
  //   },
  //   users_id: 21,
  //   sync: "false",
  //   start_date: "2023-01-09",
  //   end_date: "2023-01-15",
  // };

  useEffect(() => {
    async function fetchData() {
      console.log("fetching plan..."); //*: dev only line
      const response = await fetchPlan(token);

      setPlan(response.data);
      return response.data;
    }
    async function handler() {
      const plan = await fetchData();

      // Get current week
      const currentWeek = await getCurrentWeek(plan);
      console.log(currentWeek);

      // Set current week
      setCurrentWeek(currentWeek);

      // Set current week as active
      setActiveWeek(currentWeek);
    }
    handler();
  }, [token, getCurrentWeek]);

  const value = {
    plan,
    addWeek,
    currentWeek,
    activeWeek,
    previousWeek,
    nextWeek,
    setActiveWeek,
  };
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};

export default PlanContext;
