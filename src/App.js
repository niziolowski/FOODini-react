import { useContext, useEffect } from "react";
import styles from "./App.module.css";
import LayoutContext from "./contexts/layout";
import LoginPage from "./components/LoginPage/LoginPage";
import AuthContext from "./contexts/auth";
import { IngredientsContextProvider } from "./contexts/ingredients";
import { RecipesContextProvider } from "./contexts/recipes";
import { PlanContextProvider } from "./contexts/PlanContext/index";
import { loadColorTheme, applyColorTheme } from "./utils/colorTheme";
import MainView from "./components/MainView/MainView";

function App() {
  const { isMobile } = useContext(LayoutContext);
  const { isLoggedIn } = useContext(AuthContext);

  const classes = `${styles.app} ${isMobile ? styles.mobile : ""} `;

  // If there are settings saved in localStorage, load them
  useEffect(() => {
    // ColorTheme
    const colorTheme = loadColorTheme();
    if (colorTheme) applyColorTheme(colorTheme);
  }, []);

  // if (!isLoggedIn) {
  //   return <LoginPage></LoginPage>;
  // } else {
  return (
    <div className="wrapper">
      <div className={classes}>
        <IngredientsContextProvider>
          <RecipesContextProvider>
            <PlanContextProvider>
              <MainView />
            </PlanContextProvider>
          </RecipesContextProvider>
        </IngredientsContextProvider>
      </div>
    </div>
  );
}
// }

export default App;
