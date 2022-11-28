import React, { useContext } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiSettings,
  FiSidebar,
  FiShoppingBag,
} from "react-icons/fi";
import LayoutContext from "../../contexts/layout.js";
import Button from "./../UI/Button.js";
import styles from "./Nav.module.css";

/**
 * Main navigation bar component
 */
function Nav() {
  const { dispatchIsVisible } = useContext(LayoutContext);
  function handleClick(e) {
    const btn = e.target.closest("button");

    if (btn.classList.contains("js-btn-settings")) {
      dispatchIsVisible({ type: "settings", mode: "toggle" });
    }
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.actions}>
        <Button round>
          <FiSidebar />
        </Button>
        <Button className="js-btn-settings" onClick={handleClick} round>
          <FiSettings />
        </Button>
      </div>
      <div className={styles.title}>
        <h1>PLAN POSIŁKÓW</h1>
        <h2>BIEŻĄCY TYDZIEŃ</h2>
      </div>
      <div className={styles.actions}>
        <div className={styles.controls}>
          <Button round mini>
            <FiChevronLeft />
          </Button>
          <Button round mini>
            <FiHome />
          </Button>
          <Button round mini>
            <FiChevronRight />
          </Button>
        </div>
        <Button round>
          <FiShoppingBag />
        </Button>
      </div>
    </nav>
  );
}

export default Nav;

<Nav></Nav>;
