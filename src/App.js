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
import LoginPage from "./components/LoginPage/LoginPage";
import AuthContext from "./contexts/auth";

function App() {
  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const { isLoggedIn } = useContext(AuthContext);

  const classes = `${styles.app} ${isMobile ? styles.mobile : ""} `;

  // Hide all windows when switching to mobile view
  useEffect(() => {
    dispatchIsVisible({ type: "home", mode: "switch" });
  }, [isMobile, dispatchIsVisible]);

  // This is to prevent weird scrolling animation on iOS
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      e.preventDefault();
      window.scrollTo(0, 0);
    });
  }, []);

  if (!isLoggedIn) {
    return <LoginPage></LoginPage>;
  } else {
    return (
      <div className="wrapper">
        <div className={classes}>
          <div
            className={`${styles.wrapper} ${
              isVisible.sidebar ? styles.shift : ""
            }`}
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
        </div>
      </div>
    );
  }
}

export default App;
