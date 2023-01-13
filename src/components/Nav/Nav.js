import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiSettings,
  FiSidebar,
  FiShoppingBag,
} from "react-icons/fi";
import LayoutContext from "../../contexts/layout.js";
import PlanContext from "../../contexts/plan.js";
import { animate } from "../../utils/animate.js";
import Profile from "../Profile/Profile.js";
import Button from "./../UI/Button/Button.js";
import styles from "./Nav.module.css";

/**
 * Main navigation bar component
 */
function Nav() {
  const { isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const { activeWeek, currentWeek, previousWeek, nextWeek, setActiveWeek } =
    useContext(PlanContext);

  const parentRef = useRef();
  const titleRef = useRef();
  const [titleSize, setTitleSize] = useState("m");

  const handleToggleProfile = () => {
    dispatchIsVisible({ type: "profile", mode: "toggle" });
  };

  const handleClick = async (e) => {
    const btn = e.target.closest("button");
    try {
      // Sidebar
      if (btn.classList.contains("js-sidebar"))
        dispatchIsVisible({ type: "sidebar", mode: "toggle" });

      // Previous week
      if (btn.classList.contains("js-previous-week")) previousWeek();

      // Current week
      if (btn.classList.contains("js-current-week")) setActiveWeek(currentWeek);

      // Next week
      if (btn.classList.contains("js-next-week")) {
        // Animate button
        animate(btn, "pulsate");

        // Wait for response
        await nextWeek();

        // Clear the animation
        animate(btn, "empty");
      }
    } catch (error) {
      // Clear the animation
      animate(btn, "empty");
      console.error(error);
    }
  };

  // Format the subtitle when user changes active week
  const subtitleText = useMemo(() => {
    // If no data, display an error message
    if (!activeWeek) return "Nie można załadować danych";
    const startDate = new Date(activeWeek.start_date).toLocaleDateString(
      "pl-PL",
      {
        month: "long",
        day: "numeric",
      }
    );
    const endDate = new Date(activeWeek.end_date).toLocaleDateString("pl-PL", {
      month: "long",
      day: "numeric",
    });
    return `${startDate} - ${endDate}`;
  }, [activeWeek]);

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
        <Button className="js-sidebar" onClick={handleClick} round>
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
        <h2>{subtitleText}</h2>
      </div>
      <div className={styles.actions}>
        <div className={styles.controls}>
          <Button className="js-previous-week" onClick={handleClick} round mini>
            <FiChevronLeft />
          </Button>
          <Button className="js-current-week" onClick={handleClick} round mini>
            <FiHome />
          </Button>
          <Button className="js-next-week" onClick={handleClick} round mini>
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
