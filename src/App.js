import { useContext } from "react";
import styles from "./App.module.css";
import Nav from "./components/Nav/Nav";
import NavMobile from "./components/NavMobile/NavMobile";
import Plan from "./components/Plan/Plan";
import LayoutContext from "./contexts/layout";

function App() {
  const { isMobile } = useContext(LayoutContext);

  return (
    <div className={`${styles.app} ${isMobile ? styles.mobile : ""}`}>
      {!isMobile ? <Nav /> : <NavMobile />}
      <Plan />
    </div>
  );
}

export default App;
