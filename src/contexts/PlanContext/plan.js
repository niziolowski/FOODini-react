import { createWeek } from "../../apis/plan";
import { formatDate } from "../../utils/dates";

export const addWeek = async (dateString) => {
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
