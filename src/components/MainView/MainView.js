import Nav from "../Nav/Nav";
import NavMobile from "../NavMobile/NavMobile";
import Plan from "../Plan/Plan";
import ShoppingList from "../ShoppingList/ShoppingList";
import Settings from "../Settings/Settings";
import Sidebar from "../Sidebar/Sidebar";
import StorageList from "../StorageList/StorageList";
import RecipeList from "../RecipeList/RecipeList";
import Catalog from "../Catalog/Catalog";
import Profile from "../Profile/Profile";
import { DragDropContext } from "react-beautiful-dnd";
import { useContext, useEffect } from "react";
import LayoutContext from "../../contexts/layout";
import AuthContext from "../../contexts/auth";
import styles from "./MainView.module.css";
import PlanContext from "../../contexts/PlanContext";
// import IngredientsContext from "../../contexts/ingredients";
import RecipesContext from "../../contexts/recipes";
import { v4 as uuid } from "uuid";

function MainView() {
  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const { activeWeek, editWeek, recalculatePlan, setPlan, setActiveWeek } =
    useContext(PlanContext);
  // const { ingredients } = useContext(IngredientsContext);
  const { recipes } = useContext(RecipesContext);
  const { isLoggedIn } = useContext(AuthContext);

  const onDragEnd = async (result) => {
    // Return when user is dropping the item in the same place
    if (
      result.destination.index === result.source.index &&
      result.destination.droppableId === result.source.droppableId
    )
      return;

    // UPDATE OPTIMISTICALLY - ATTEMPT 1

    // Clone original state for reverting on error
    const originalWeek = structuredClone(activeWeek);
    let updatedWeek;

    const source = result.source.droppableId;
    let updatedDays = structuredClone(activeWeek.days);

    // Get target location
    const targetIndex = result.destination.index;
    const targetDay = result.destination.droppableId;
    switch (source) {
      case "storage-list":
        break;
      case "recipe-list":
        const meal = recipes.find((item) => item.id === +result.draggableId);

        // Create an updated Week object
        updatedDays[targetDay] = {
          meals: [
            ...updatedDays[targetDay].meals.slice(0, targetIndex),
            { ...meal, app_id: uuid(), type: "meal" },
            ...updatedDays[targetDay].meals.slice(targetIndex),
          ],
        };

        break;

      default:
        // Get source location
        const sourceDay = source;

        updatedDays[sourceDay] = {
          meals: [
            ...updatedDays[sourceDay].meals.filter(
              (meal) => meal.app_id !== result.draggableId
            ),
          ],
        };

        updatedDays[targetDay] = {
          meals: [
            ...updatedDays[targetDay].meals.slice(0, targetIndex),
            activeWeek.days[sourceDay].meals.find(
              (meal) => meal.app_id === result.draggableId
            ),
            ...updatedDays[targetDay].meals.slice(targetIndex),
          ],
        };

        break;
    }

    updatedWeek = { ...activeWeek, days: updatedDays };
    setPlan((current) => {
      const activeWeek = current.find((week) => week.id === updatedWeek.id);

      const index = current.indexOf(activeWeek);
      const updatedPlan = structuredClone(current);
      updatedPlan.splice(index, 1, updatedWeek);

      return [...updatedPlan];
    });

    setActiveWeek(updatedWeek);
    try {
      // Upload updated Week
      const updatedPlan = await editWeek(updatedWeek);
      // Recalculate plan
      recalculatePlan(updatedPlan);
    } catch (error) {
      // Revert changes
      setPlan((current) => {
        const index = current.indexOf(activeWeek);
        const updatedPlan = structuredClone(current);
        updatedPlan.splice(index, 1, originalWeek);

        return [...updatedPlan];
      });

      setActiveWeek(originalWeek);
      console.error(error);
      throw error;
    }
  };

  // Hide all windows when switching to mobile view
  useEffect(() => {
    dispatchIsVisible({ payload: "home", type: "SWITCH" });
  }, [isLoggedIn, dispatchIsVisible, isMobile]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={`${styles.wrapper} ${isVisible.sidebar ? styles.shift : ""}`}
      >
        {isMobile && isVisible.profile && <Profile />}
        {!isMobile ? <Nav /> : <NavMobile />}
        <Plan />
        <ShoppingList />
        <Catalog />
      </div>
      <Settings />
      <Sidebar />
      {/* Mobile lists */}
      {isVisible.storage && <StorageList />}
      {isVisible.recipes && <RecipeList />}
    </DragDropContext>
  );
}
export default MainView;
