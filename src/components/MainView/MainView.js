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
import IngredientsContext from "../../contexts/ingredients";
import RecipesContext from "../../contexts/recipes";

function MainView() {
  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const { activeWeek } = useContext(PlanContext);
  const { ingredients } = useContext(IngredientsContext);
  const { recipes } = useContext(RecipesContext);
  const { isLoggedIn } = useContext(AuthContext);

  const onDragEnd = (result) => {
    console.log(result);
    const source = result.source.droppableId;
    console.log(activeWeek);

    let payload = {};
    switch (source) {
      case "storage-list":
        break;
      case "recipe-list":
        break;

      default:
        // Get source location
        const sourceIndex = result.source.index;
        const sourceDay = source;

        // Get target location
        const targetIndex = result.destination.index;
        const targetDay = result.destination.droppableId;

        console.log(activeWeek.days);

        // Create updatedWeek object
        const updatedWeek = { ...activeWeek };
        break;
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
