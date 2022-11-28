import { useContext } from "react";
import styles from "./App.module.css";
import Nav from "./components/Nav/Nav";
import NavMobile from "./components/NavMobile/NavMobile";
import Plan from "./components/Plan/Plan";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import LayoutContext from "./contexts/layout";
import Settings from "./components/Settings/Settings";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const { isMobile, isVisible } = useContext(LayoutContext);

  const classes = `${styles.app} ${isMobile ? styles.mobile : ""} `;
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
    </div>
  );
}

export default App;
