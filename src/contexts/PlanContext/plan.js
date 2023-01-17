import { createWeek, updateWeek } from "../../apis/plan";
import { formatDate } from "../../utils/dates";

// Create new Week
export const addWeek = async (dateString = new Date()) => {
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

  const { id } = JSON.parse(localStorage.getItem("user"));
  const updatedWeek = { ...week, users_id: id };

  // 3. Upload to plan
  try {
    return await createWeek(updatedWeek);
  } catch (error) {
    throw error;
  }
};

// Update existing week
export const editWeek = async (week) => {
  //! Dev only
  console.log("updating week...");

  // Get user ID
  const { id } = JSON.parse(localStorage.getItem("user"));
  // Add user ID to week obj
  const updatedWeek = { ...week, users_id: id };
  try {
    return await updateWeek(updatedWeek);
  } catch (error) {
    throw error;
  }
};

// Toggle week sync parameter
export const toggleWeekSync = async (week) => {
  //! Dev only
  console.log("updating week...");

  const { id } = JSON.parse(localStorage.getItem("user"));
  const updatedWeek = { ...week, users_id: id, sync: !week.sync };

  try {
    const res = await updateWeek(updatedWeek);

    return res;
  } catch (error) {
    throw error;
  }
};

export const getPreviousWeek = (activeWeek, plan) => {
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

  return previousWeek;
};

export const getCurrentWeek = (plan) => {
  // Get current time, convert to date string and then to date obj. That way we get the beginning of day timestamp
  const now = new Date(formatDate(new Date()));

  // Find currentWeek
  let currentWeek = plan.find((week) => {
    const startDate = new Date(week.start_date);
    const endDate = new Date(week.end_date);

    if (now >= startDate && now <= endDate) return week;
    return null;
  });

  return currentWeek;
};
