import React from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiSettings,
  FiSidebar,
  FiShoppingBag,
} from "react-icons/fi";
import Button from "./../UI/Button.js";
import styles from "./Nav.module.css";

/**
 * Main navigation bar component
 */
function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.actions}>
        <Button round>
          <FiSidebar />
        </Button>
        <Button round>
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
