import { createWeek, updateWeek, uploadPlanChanges } from "../../apis/plan";
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

// Update Plan in batch
export const updatePlan = async (payload, token) => {
  // ! Dev only
  console.log("uploading recalculated plan...");

  try {
    const res = await uploadPlanChanges({ payload }, token);

    if (res.status === 200) {
      // Return updated plan
      return res;
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

export const recalculatePlan = (plan, storage, deletedMeal) => {
  // 1. Filter out present day and future days (don't change past days)
  //TODO: Add Code...

  // This variable is a list of storage items that will be updated after the calculation is finished
  const modifiedIngredients = [];

  // Clone the storage list (the algorithm will mutate it)
  const clonedStorage = structuredClone(storage);

  // 2. Restore ingredients
  // If function is triggered by meal deletion, restore the meal ingredients
  if (deletedMeal)
    restoreMealIngredients(
      deletedMeal.usedIngredients,
      clonedStorage,
      modifiedIngredients
    );

  plan.forEach((week) => {
    const days = Object.entries(week.days);

    // Extract meals from each day and assign ingredients
    days.forEach((day) => {
      const [, data] = day;
      const meals = data.meals;

      meals.forEach((meal) => {
        if (!meal.usedIngredients || meal.usedIngredients.length === 0) return;

        restoreMealIngredients(
          meal.usedIngredients,
          clonedStorage,
          modifiedIngredients
        );
      });
    });
  });

  // 3. Calculate ingredients

  const updatedPlan = plan.map((week) => {
    const days = Object.entries(week.days);

    const updatedDays = {};
    // Extract meals from each day and assign ingredients
    days.forEach((day) => {
      const [name, data] = day;
      const meals = data.meals;

      const updatedMeals = meals.map((meal) =>
        calculateMealIngredients(meal, clonedStorage, modifiedIngredients)
      );

      // Update day
      updatedDays[name] = { meals: updatedMeals };
    });

    // Update week object
    return { ...week, days: updatedDays };
  });

  const ingredientsAdd = modifiedIngredients.filter((ing) => ing.amount > 0);
  const ingredientsDelete = modifiedIngredients.filter(
    (ing) => ing.amount === 0 && ing.id !== 0
  );

  const payload = {
    plan: [...updatedPlan],
    storage: {
      add: [...ingredientsAdd],
      delete: [...ingredientsDelete],
    },
  };

  // Payload object
  return payload;
};

const restoreMealIngredients = (
  usedIngredients,
  clonedStorage,
  modifiedIngredients
) => {
  // Loop over every used ingredient
  usedIngredients.forEach((ing) => {
    // Get ing from modifiedIngredients list if exists
    let ingModified = modifiedIngredients.find(
      (item) => item.app_id === ing.app_id
    );

    console.log(ing.amount);

    // Get ing from clonedStorage list if exists
    let ingStorage = clonedStorage.find((item) => item.app_id === ing.app_id);

    // If ingredient exists in clonedStorage, update the amount
    if (ingStorage) ingStorage.amount += ing.amount;

    // If it doesn't exist
    if (!ingStorage) {
      // Create a new object, change id to "0" (that way the API will create a new instance)
      ingStorage = { ...ing, id: 0 };
      // Add to clonedStorage
      clonedStorage.push(ingStorage);
    }
    if (ingModified) ingModified = { ...ingStorage };
    if (!ingModified) modifiedIngredients.push(ingStorage);
  });
};

// Look for available ingredients and create a list of missing and used ingredients
const calculateMealIngredients = (meal, clonedStorage, modifiedIngredients) => {
  // Define initial state
  const usedIngredients = [];
  const missingIngredients = [];

  // If meal is a recipe
  if (meal.type === "recipe") {
    // Calculate each ingredient
    meal.ingredients.forEach((ing) => {
      // Get ingredients of the same type from 'modifiedIngredients' and sort them by purchase date (from the oldest)
      const inModified = modifiedIngredients
        .filter((item) => item.name === ing.name)
        .sort((a, b) => new Date(a.purchase_date) - new Date(b.purchase_date));

      // Get ingredients of the same type from 'clonedStorage' and sort them by purchase date (from the oldest)
      const inStorage = clonedStorage
        .filter((item) => item.name === ing.name)
        .sort((a, b) => new Date(a.purchase_date) - new Date(b.purchase_date));

      // SUBTRACT INGREDIENTS FROM STORAGE

      // Define variables
      let amount = +ing.amount;

      // Iterate while the full amount of ingredient is not assigned
      while (amount > 0) {
        // Check available ingredients in storage
        const availableIngredients = inStorage.filter((ing) => ing.amount > 0);
        // Check available ingredients in modified list (when restored from plan);
        const availableModified = inModified.filter((ing) => ing.amount > 0);

        // Add ingredient to used ingredients
        const addUsedIngredient = (ing, amount) => {
          // Find id of current ingredient in 'usedIngredients' array
          let usedIng = usedIngredients.find(
            (item) => item.app_id === ing.app_id
          );

          // If ingredient is not on the usedIngredients list yet, create one with amount = 0;
          if (!usedIng) {
            usedIng = {
              ...ing,
            };
            usedIng.amount = 0;
            usedIngredients.push(usedIng);
          }

          // Increase used amount
          usedIng.amount += amount;
        };

        // Use available ingredient
        // *Ignore warning about unsafe references to variables
        // eslint-disable-next-line
        const takeIngredient = (ing) => {
          if (amount <= ing.amount) {
            // Add ingredient to usedIngredients for reference when restoring
            addUsedIngredient(ing, amount);

            // Subtract used amount from available ingredient
            ing.amount -= amount;
            amount = 0;
          }

          if (amount > ing.amount) {
            // Add ingredient to usedIngredients for reference when restoring
            addUsedIngredient(ing, ing.amount);

            // Subtract required amount
            amount -= ing.amount;

            // Subtract all available amount from the ingredient
            ing.amount = 0;
          }

          // Update 'modifiedIngredients'

          // Check if ingredient already on the list
          let ingToUpdate = modifiedIngredients.find(
            (item) => item.app_id === ing.app_id
          );

          // If not, create one and add to the list
          if (!ingToUpdate) {
            ingToUpdate = { ...ing };
            modifiedIngredients.push(ingToUpdate);
          }

          // Assign updated amount
          ingToUpdate.amount = ing.amount;
        };

        // If available ingredient, use it
        if (availableModified.length > 0) {
          takeIngredient(availableModified[0]);
          continue;
        }

        // If available ingredient, use it
        if (availableIngredients.length > 0) {
          takeIngredient(availableIngredients[0]);
          continue;
        }

        // If no available ingredient, add missing ingredient to the list

        // Create missing ingredient object
        const missingIng = {
          ...ing,
        };

        // Set missing amount
        missingIng.amount = amount;

        // Add object to missing ingredients
        missingIngredients.push(missingIng);
        break;
      }
    });
  }

  //TODO: Add later If meal is a single ingredient (template from catalog)
  if (meal.type === "template") {
  }

  return { ...meal, usedIngredients, missingIngredients };
};
