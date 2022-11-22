import React from "react";
import Button from "./../UI/Button.js";
import { FiSidebar, FiSettings } from "react-icons/fi";

import styles from "./Nav.module.css";

/**
 * Main navigation bar component
 */
function Nav() {
  return (
    <div className={styles.nav}>
      <Button round>
        <FiSidebar />
      </Button>
      <Button round>
        <FiSettings />
      </Button>
    </div>
  );
}

export default Nav;

<Nav></Nav>;
