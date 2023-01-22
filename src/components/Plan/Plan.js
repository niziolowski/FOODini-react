import { useContext, useMemo, useState } from "react";
import LayoutContext from "../../contexts/layout";
import Day from "./Day/Day";
import styles from "./Plan.module.css";
import PlanContext from "../../contexts/PlanContext/index";
import { v4 as uuid } from "uuid";

//* § Library for swipe slider effect - https://swiperjs.com/react
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import Spotlight from "../Spotlight/Spotlight";
import IngredientsContext from "../../contexts/ingredients";
import RecipesContext from "../../contexts/recipes";
import { animate } from "../../utils/animate";

function Plan() {
  const { isMobile } = useContext(LayoutContext);
  const { plan, activeWeek, editWeek, recalculatePlan } =
    useContext(PlanContext);
  const { ingredients } = useContext(IngredientsContext);
  const { recipes } = useContext(RecipesContext);
  const [isSpotlight, setIsSpotlight] = useState(false);
  const [targetDay, setTargetDay] = useState(null);

  // Filter out template ingredients for spotlight
  const filteredIngredients = useMemo(
    () => ingredients.filter((ing) => ing.type === "template"),
    [ingredients]
  );

  // Create meals array from active week
  const days = useMemo(() => {
    // If undefined, return
    if (!activeWeek?.days) return [];
    const days = Object.entries(activeWeek.days).map((day) => {
      return { name: day[0], meals: day[1].meals };
    });
    // Destructure meals data
    return days;
  }, [activeWeek]);
  console.log(days);

  const dayNames = [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
  ];

  const toggleSpotlight = () => {
    setIsSpotlight((current) => !current);
  };

  const handleNewMeal = (dayName) => {
    // Save target day index for reference
    setTargetDay(dayName);
    toggleSpotlight();
  };

  const handleDeleteMeal = async (e, meal, targetDay) => {
    // Get button for animation reference
    const btn = e.target.closest("button");
    // Copy meals array from correct day
    const meals = [...activeWeek.days[targetDay].meals];
    // Get target index
    const index = meals.indexOf(meal);

    // Delete the target meal from copied meals array
    meals.splice(index, 1);

    // Create an updated Week object
    const updatedWeek = {
      ...activeWeek,
      days: { ...activeWeek.days, [targetDay]: { meals } },
    };
    try {
      // Animate button
      animate(btn, "pulsate");

      // Update week with updated meals
      const updatedPlan = await editWeek(updatedWeek);

      // Clear button animation
      animate(btn, "empty");

      // Recalculate plan
      recalculatePlan(updatedPlan, meal);
    } catch (error) {
      console.error(error);
      // Clear button animation
      animate(btn, "empty");
    }
  };

  const handleSuggestionClick = async (id, type) => {
    // Get suggested object (check if recipe or ingredient)
    let meal;
    if (type === "recipe") meal = recipes.find((item) => item.id === id);
    if (type === "template") meal = ingredients.find((item) => item.id === id);

    // Get current meals
    const meals = activeWeek.days[targetDay].meals;

    // Add new meal to meals
    meals.push({ ...meal, app_id: uuid(), type });

    // Create an updated Week object
    const updatedWeek = {
      ...activeWeek,
      days: { ...activeWeek.days, [targetDay]: { meals } },
    };

    try {
      // Upload updated Week
      const updatedPlan = await editWeek(updatedWeek);

      // Toggle spotlight modal
      toggleSpotlight();

      // Recalculate plan
      recalculatePlan(updatedPlan);
    } catch (error) {}
  };

  if (isMobile) {
    return (
      <>
        <div className={styles.mobile}>
          <Swiper
            className={styles.swiper}
            spaceBetween={15}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {days.map((day, i) => (
              <SwiperSlide key={day.name}>
                <Day
                  title={dayNames[i]}
                  meals={day.meals}
                  onNewMeal={() => handleNewMeal(day.name)}
                  onDeleteMeal={(e, mealAppID) =>
                    handleDeleteMeal(e, mealAppID, day.name)
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {isSpotlight && (
          <Spotlight
            data={[...filteredIngredients, ...recipes]}
            onClose={toggleSpotlight}
            onSuggestionClick={handleSuggestionClick}
          />
        )}
      </>
    );
  }

  if (!isMobile) {
    return (
      <>
        <div className={styles.plan}>
          {days.map((day, i) => {
            return (
              <Day
                key={day.name}
                title={dayNames[i]}
                meals={day.meals}
                onNewMeal={() => handleNewMeal(day.name)}
                onDeleteMeal={(e, mealAppID) =>
                  handleDeleteMeal(e, mealAppID, day.name)
                }
              />
            );
          })}
        </div>
        {isSpotlight && (
          <Spotlight
            data={[...filteredIngredients, ...recipes]}
            onClose={toggleSpotlight}
            onSuggestionClick={handleSuggestionClick}
          />
        )}
      </>
    );
  }
}

export default Plan;
