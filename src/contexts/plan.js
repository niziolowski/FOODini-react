import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createWeek, fetchPlan, updateWeek } from "../apis/plan";
import { formatDate } from "../utils/dates";
import AuthContext from "./auth";

const PlanContext = createContext();

export const PlanContextProvider = ({ children }) => {
  // Get authToken
  const { token } = useContext(AuthContext);
  // Define plan state
  const [plan, setPlan] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [activeWeek, setActiveWeek] = useState(null);

  // Create an empty week with current date
  const addWeek = async (dateString) => {
    //! Dev only
    console.log("adding week...");

    // 1. Get dateRange
    const date = new Date(dateString);

    // Get day of the week (minus one because we want to get to monday)
    const dayNum = date.getDay();
    const daysIn = dayNum === 0 ? 6 : dayNum - 1;

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
        monday: { meals: [] },
        tuesday: { meals: [] },
        wednesday: { meals: [] },
        thursday: { meals: [] },
        friday: { meals: [] },
        saturday: { meals: [] },
        sunday: { meals: [] },
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

  // Update existing week
  const editWeek = async (week) => {
    //! Dev only
    console.log("updating week...");

    const { id } = JSON.parse(localStorage.getItem("user"));
    try {
      const updatedWeek = { ...week, users_id: id };
      const res = await updateWeek(updatedWeek);

      if (res.status === 200) {
        // Update State
        setPlan((current) => {
          const el = current.find((item) => item.id === week.id);
          const index = current.indexOf(el);
          const updated = [...current];
          updated.splice(index, 1, res.data);

          return [...updated];
        });
      }
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle week sync parameter
  const toggleWeekSync = async (week) => {
    //! Dev only
    console.log("updating week...");

    const { id } = JSON.parse(localStorage.getItem("user"));
    try {
      const updatedWeek = { ...week, users_id: id, sync: !week.sync };

      const res = await updateWeek(updatedWeek);

      if (res.status === 200) {
        // Update State
        setPlan((current) => {
          const el = current.find((item) => item.id === week.id);
          const index = current.indexOf(el);
          const updated = [...current];

          updated.splice(index, 1, res.data);

          return [...updated];
        });
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

  // Look for today's week and if it doesn't exist, create one
  const getCurrentWeek = useCallback(async (plan) => {
    // Get current time, convert to date string and then to date obj. That way we get the beginning of day timestamp
    const now = new Date(formatDate(new Date()));

    // return current week if exists
    let currentWeek = plan.find((week) => {
      const startDate = new Date(week.start_date);
      const endDate = new Date(week.end_date);

      if (now >= startDate && now <= endDate) return week;
      return null;
    });

    try {
      // Create new week if no current week
      if (!currentWeek) currentWeek = await addWeek(now);

      return currentWeek;
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Fetch the plan
  useEffect(() => {
    async function fetchData() {
      console.log("fetching plan..."); //*: dev only line
      const response = await fetchPlan(token);

      setPlan(response.data);
      return response.data;
    }
    fetchData();
  }, [token]);

  // Update activeWeek and currentWeek
  useEffect(() => {
    if (!plan) return;

    const handler = async () => {
      // Get current week
      const currentWeek = await getCurrentWeek(plan);

      // Set current week
      setCurrentWeek(currentWeek);

      // Set current week as active
      setActiveWeek(currentWeek);
    };

    handler();
  }, [plan, getCurrentWeek]);

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
