import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Nav from "./components/Nav/Nav";
import NavMobile from "./components/NavMobile/NavMobile";

function App() {
  // Get client width for responsive layout
  const breakPoint = 520;
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakPoint);

  // Update width whenever user resizes the window
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      const width = window.innerWidth;

      setIsMobile(width < breakPoint);
    });
  }, []);

  if (isMobile) {
    return (
      <div className={styles.app}>
        <NavMobile></NavMobile>
      </div>
    );
  }
  if (!isMobile) {
    return (
      <div className={styles.app}>
        <Nav></Nav>
      </div>
    );
  }
}

export default App;
