import { useContext, useEffect } from "react";
import styles from "./App.module.css";
import Nav from "./components/Nav/Nav";
import NavMobile from "./components/NavMobile/NavMobile";
import Plan from "./components/Plan/Plan";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import LayoutContext from "./contexts/layout";
import Settings from "./components/Settings/Settings";
import Sidebar from "./components/Sidebar/Sidebar";
import StorageList from "./components/StorageList/StorageList";
import RecipeList from "./components/RecipeList/RecipeList";
import Catalog from "./components/Catalog/Catalog";
import RecipeView from "./components/RecipeView/RecipeView";

function App() {
  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);

  const classes = `${styles.app} ${isMobile ? styles.mobile : ""} `;

  // Hide all windows when switching to mobile view
  useEffect(() => {
    dispatchIsVisible({ type: "home", mode: "switch" });
  }, [isMobile]);

  return (
    <div className={classes}>
      <div
        className={`${styles.wrapper} ${isVisible.sidebar ? styles.shift : ""}`}
      >
        {!isMobile ? <Nav /> : <NavMobile />}

        <Plan />
      </div>
      <ShoppingList />
      <Settings />
      <Sidebar />
      {isVisible.storage && <StorageList />}
      {isVisible.recipes && <RecipeList />}
      <Catalog />
      <RecipeView />
    </div>
  );
}

export default App;
