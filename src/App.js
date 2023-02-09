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
import { IngredientsContextProvider } from "./contexts/ingredients";
import { RecipesContextProvider } from "./contexts/recipes";
import Profile from "./components/Profile/Profile";
import { PlanContextProvider } from "./contexts/PlanContext/index";
import { loadColorTheme, applyColorTheme } from "./utils/colorTheme";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);

  const { isLoggedIn } = useContext(AuthContext);

  const classes = `${styles.app} ${isMobile ? styles.mobile : ""} `;

  const onDragEnd = (result) => console.log("test");

  // If there are settings saved in localStorage, load them
  useEffect(() => {
    // ColorTheme
    const colorTheme = loadColorTheme();
    if (colorTheme) applyColorTheme(colorTheme);
  }, []);

  // Hide all windows when switching to mobile view
  useEffect(() => {
    dispatchIsVisible({ payload: "home", type: "SWITCH" });
  }, [isLoggedIn, dispatchIsVisible, isMobile]);

  if (!isLoggedIn) {
    return <LoginPage></LoginPage>;
  } else {
    return (
      <div className="wrapper">
        <div className={classes}>
          <IngredientsContextProvider>
            <RecipesContextProvider>
              <PlanContextProvider>
                <DragDropContext onDragEnd={onDragEnd}>
                  <div
                    className={`${styles.wrapper} ${
                      isVisible.sidebar ? styles.shift : ""
                    }`}
                  >
                    {isMobile && isVisible.profile && <Profile />}
                    {/* Navigation needs PlanContext for changing the current week and displaying a subtitle */}
                    {!isMobile ? <Nav /> : <NavMobile />}

                    {/* Plan needs IngredientsContext and RecipesContext for adding meals */}
                    <Plan />
                    <ShoppingList />
                    <Catalog />
                  </div>
                  <Settings />

                  {isVisible.storage && <StorageList />}

                  {/* Sidebar doesn't really need context but inside it, there is StorageList and RecipeList components. Think through in the future */}
                  <Sidebar />
                  {isVisible.recipes && <RecipeList />}
                </DragDropContext>
              </PlanContextProvider>
            </RecipesContextProvider>
          </IngredientsContextProvider>
        </div>
      </div>
    );
  }
}

export default App;
