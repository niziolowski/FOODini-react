import React, { useContext, useEffect, useRef } from "react";
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
  const { isVisible, dispatchIsVisible } = useContext(LayoutContext);

  const parentEl = useRef();
  function handleClick(e) {
    const btn = e.target.closest("button");

    // Sidebar
    if (btn.classList.contains("js-btn-sidebar")) {
      dispatchIsVisible({ type: "sidebar", mode: "toggle" });
    }
  }

  const handleToggleProfile = () => {
    dispatchIsVisible({ type: "profile", mode: "toggle" });
  };

  // Adjust title size and alignment
  useEffect(() => {}, [isVisible.sidebar]);

  return (
    <nav ref={parentEl} className={styles.nav}>
      <div className={styles.actions}>
        <Button className="js-btn-sidebar" onClick={handleClick} round>
          <FiSidebar />
        </Button>
        <div className={styles.profile}>
          <Button onClick={handleToggleProfile} round>
            <FiSettings />
          </Button>
          {isVisible.profile && <Profile onClose={handleToggleProfile} />}
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
