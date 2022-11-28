import { useContext } from "react";
import styles from "./App.module.css";
import Nav from "./components/Nav/Nav";
import NavMobile from "./components/NavMobile/NavMobile";
import Plan from "./components/Plan/Plan";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import LayoutContext from "./contexts/layout";
import Settings from "./components/Settings/Settings";

function App() {
  const { isMobile } = useContext(LayoutContext);

  const modalRoot = document.getElementById("modal");
  return (
    <div className={`${styles.app} ${isMobile ? styles.mobile : ""}`}>
      {!isMobile ? <Nav /> : <NavMobile />}
      <Plan />
      <ShoppingList />

      <Settings></Settings>
    </div>
  );
}

export default App;
