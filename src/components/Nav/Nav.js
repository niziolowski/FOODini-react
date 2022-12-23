import React, { useContext, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiSettings,
  FiSidebar,
  FiShoppingBag,
} from "react-icons/fi";
import LayoutContext from "../../contexts/layout.js";
import Profile from "../Profile/Profile.js";
import Button from "./../UI/Button/Button.js";
import styles from "./Nav.module.css";

/**
 * Main navigation bar component
 */
function Nav() {
  const { dispatchIsVisible } = useContext(LayoutContext);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  function handleClick(e) {
    const btn = e.target.closest("button");

    // // Settings
    // if (btn.classList.contains("js-btn-settings")) {
    //   dispatchIsVisible({ type: "settings", mode: "toggle" });
    // }

    // Sidebar
    if (btn.classList.contains("js-btn-sidebar")) {
      dispatchIsVisible({ type: "sidebar", mode: "toggle" });
    }
  }

  const handleToggleProfile = () => {
    setIsProfileVisible((current) => !current);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.actions}>
        <Button className="js-btn-sidebar" onClick={handleClick} round>
          <FiSidebar />
        </Button>
        <div className={styles.profile}>
          <Button
            className="js-btn-settings"
            onClick={handleToggleProfile}
            round
          >
            <FiSettings />
          </Button>
          {isProfileVisible && <Profile onClose={handleToggleProfile} />}
        </div>
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
