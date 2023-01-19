import { createWeek, updateWeek, updateMultipleWeeks } from "../../apis/plan";
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

// Update multiple weeks
export const editMultipleWeeks = async (payload, token) => {
  // ! Dev only
  console.log("updating multiple weeks...");

  const { id } = JSON.parse(localStorage.getItem("user"));

  const updatedPayload = payload.map((week) => {
    return { ...week, users_id: id };
  });

  try {
    const res = await updateMultipleWeeks({ payload: updatedPayload }, token);
    if (res.status === 200) {
      // Return updated plan
      return res.data;
    }
  } catch (error) {
    console.log(error);
    alert(error);
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

export const recalculatePlan = (plan, storage) => {
  // 1. Filter out present day and future days (don't change past days)
  //TODO: Add Code...

  // 2. Restore ingredients
  //TODO: Add Code...

  // 3. Calculate ingredients
  const updatedPlan = plan.map((week) => {
    const days = Object.entries(week.days);

    const updatedDays = {};

    // Extract meals from each day and assign ingredients
    days.forEach((day) => {
      const [name, data] = day;
      const meals = data.meals;

      const updatedMeals = meals.map((meal) =>
        calculateMealIngredients(meal, storage)
      );

      // Update day
      updatedDays[name] = { meals: updatedMeals };
    });

    // Update week object
    return { ...week, days: updatedDays };
  });
  // console.log(updatedPlan);
};

// USED IN 'recalculatePlan' FUNCTION.
export const calculateMealIngredients = (meal, storage) => {
  // Define initial state
  const usedIngredients = [];
  const missingIngredients = [];

  // Define payload object for ingredients API to update the DB with a single request
  const storageChanges = {
    add: [],
    edit: [],
    delete: [],
  };

  // If meal is a recipe
  if (meal.type === "recipe") {
    // Calculate
    meal.ingredients.forEach((ing) => {
      //* Get ingredients of the same type
      const inStorage = storage.filter((item) => item.name === ing.name);

      //* Sort ingredients by purchase date (from the oldest)
      const inStorageSorted = inStorage.sort(
        (a, b) => new Date(a.purchase_date) - new Date(b.purchase_date)
      );

      // SUBTRACT INGREDIENTS FROM STORAGE

      // Define variables
      let amount = ing.amount;
      let i = 0;

      // Iterate while the full amount of ingredient is not assigned
      // while (amount > 0) {
      //   let ingStorage = inStorageSorted;
      //   //   If ingredient doesn't exist
      //   if (!ingStorage[i]) {
      //     // Create a missing ingredient object
      //     const missingIng = {
      //       ...ing,
      //     };

      //     missingIng.amount = amount;

      //     // Add object to missing ingredients
      //     missingIngredients.push(missingIng);
      //     break;
      //   }

      // console.log(missingIngredients);
      //   // If ingredient exist
      //   if (ingStorage[i].amount > 0) {
      //     // subtract from storage
      //     ingStorage[i].amount -= 1;
      //     // subtract required amount
      //     amount -= 1;

      //     // Find id of current ingredient in this.used array
      //     let usedIng = usedIngredients.find(
      //       (item) => item.id === ingStorage[i].id
      //     );

      //     // If ingredient is not on the used list yet, create one with amount = 1;
      //     if (!usedIng) {
      //       usedIng = {
      //         ...ingStorage[i],
      //       };
      //       usedIng.amount = 0;
      //       usedIngredients.push(usedIng);
      //     }
      //     // Add one unit to used ingredient
      //     usedIng.amount += 1;

      //     // Check if storage amount = 0
      //     if (ingStorage[i].amount === 0) {
      //       // Remove item from storage
      //       const emptyIngredient = model.getIngredient(usedIng.id);
      //       model.deleteIngredient(emptyIngredient);

      //       // find another ingredient of the same type
      //       i++;
      //     }
      //   }
      // }
    });
  }

  // If meal is a single ingredient (template from catalog)
  if (meal.type === "template") {
  }

  return { ...meal, usedIngredients, missingIngredients };
};
