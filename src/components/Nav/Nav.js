<<<<<<< HEAD
import React, { useContext, useEffect, useRef, useState } from "react";
=======
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
>>>>>>> 885e4fb1 (Initial commit)
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiSettings,
  FiSidebar,
  FiShoppingBag,
} from "react-icons/fi";
import LayoutContext from "../../contexts/layout.js";
<<<<<<< HEAD
=======
import PlanContext from "../../contexts/plan.js";
>>>>>>> 885e4fb1 (Initial commit)
import Profile from "../Profile/Profile.js";
import Button from "./../UI/Button/Button.js";
import styles from "./Nav.module.css";

/**
 * Main navigation bar component
 */
function Nav() {
  const { isVisible, dispatchIsVisible } = useContext(LayoutContext);

<<<<<<< HEAD
  const parentRef = useRef();
  const titleRef = useRef();
  const [titleSize, setTitleSize] = useState("m");
=======
  const { activeWeek, nextWeek, previousWeek, setActiveWeek, currentWeek } =
    useContext(PlanContext);

  // State for responsive UI
  const parentRef = useRef();
  const titleRef = useRef();
  const [titleSize, setTitleSize] = useState("m");

>>>>>>> 885e4fb1 (Initial commit)
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

<<<<<<< HEAD
=======
  const handleControls = (e) => {
    const btn = e.target.closest("button");

    // Previous week
    if (btn.classList.contains("js-previous-week")) previousWeek();

    // Current week
    if (btn.classList.contains("js-current-week")) setActiveWeek(currentWeek);

    // Next week
    if (btn.classList.contains("js-next-week")) nextWeek();
  };

>>>>>>> 885e4fb1 (Initial commit)
  // Adjust title size and alignment to nav bar width
  useEffect(() => {
    const handler = () => {
      setTitleSize("m");
      // get window width, subtract sidebar width if active
      const windowWidth = window.innerWidth;
      const sidebarWidth = isVisible.sidebar ? 400 : 0;
      const threshold = windowWidth - sidebarWidth;

      // Set title size accordingly
      if (threshold > 1060) return setTitleSize("l");
      if (threshold < 850) return setTitleSize("s");
    };

    // Run calculations on sidebar toggle
    handler();

    // Run calculations on resize event
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [isVisible.sidebar]);

  return (
    <nav ref={parentRef} className={styles.nav}>
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
      <div ref={titleRef} className={`${styles.title} ${styles[titleSize]}`}>
        <h1>PLAN POSIŁKÓW</h1>
<<<<<<< HEAD
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
=======
        <h2>{activeWeek ? activeWeek.start_date : "data"}</h2>
      </div>
      <div className={styles.actions}>
        <div className={styles.controls}>
          <Button
            className="js-previous-week"
            onClick={handleControls}
            round
            mini
          >
            <FiChevronLeft />
          </Button>
          <Button
            className="js-current-week"
            onClick={handleControls}
            round
            mini
          >
            <FiHome />
          </Button>
          <Button className="js-next-week" onClick={handleControls} round mini>
>>>>>>> 885e4fb1 (Initial commit)
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
