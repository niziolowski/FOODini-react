import styles from "./NavMobile.module.css";
import {
  FiSettings,
  FiList,
  FiHome,
  FiChevronLeft,
  FiChevronRight,
  FiBookOpen,
  FiShoppingBag,
} from "react-icons/fi";
import React, { Fragment, useContext, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import NavMobileBar from "./NavMobileBar";
import Button from "../UI/Button/Button";
import LayoutContext from "../../contexts/layout";
import PlanContext from "../../contexts/plan";
import { animate } from "../../utils/animate";

function NavMobile() {
  const [activeTab, setActiveTab] = useState("home");
  const { dispatchIsVisible } = useContext(LayoutContext);
  const { activeWeek, currentWeek, previousWeek, nextWeek, setActiveWeek } =
    useContext(PlanContext);

  // Set of tabs and respective icons
  const tabs = [
    {
      name: "storage",
      icon: <FiList />,
    },
    {
      name: "recipes",
      icon: <FiBookOpen />,
    },
    {
      name: "home",
      icon: <FiHome />,
    },
    {
      name: "shopping-list",
      icon: <FiShoppingBag />,
    },
    {
      name: "profile",
      icon: <FiSettings />,
    },
  ];

  function handleTabClick(tab) {
    // If home tab is active and tapped, set active week to current week
    if (tab === activeTab) setActiveWeek(currentWeek);

    // Set tab as active
    setActiveTab(tab);

    // Show clicked tab
    dispatchIsVisible({ type: tab, mode: "switch" });
  }

  const handleControlsClick = async (e) => {
    const btn = e.target.closest("button");
    try {
      // Previous week
      if (btn.classList.contains("js-previous-week")) previousWeek();

      // Next week
      if (btn.classList.contains("js-next-week")) {
        animate(btn, "pulsate");
        await nextWeek();
        animate(btn, "empty");
      }
    } catch (error) {
      console.error(error);
      animate(btn, "empty");
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

  const navBarEl = (
    <div className={styles.navbar}>
      {tabs.map((tab) => (
        <NavMobileBar
          key={tab.name}
          tab={tab}
          onTabClick={handleTabClick}
          active={activeTab === tab.name}
        />
      ))}
    </div>
  );

  return (
    <Fragment>
      <div className={styles.nav}>
        <div className={styles["top-nav"]}>
          <Button
            className="js-previous-week"
            onClick={handleControlsClick}
            round
            mini
          >
            <FiChevronLeft />
          </Button>
          <div className={styles.title}>
            <h1>PLAN POSIŁKÓW</h1>
            <h2>{subtitleText}</h2>
          </div>
          <Button
            className="js-next-week"
            onClick={handleControlsClick}
            round
            mini
          >
            <FiChevronRight />
          </Button>
        </div>
      </div>
      {ReactDOM.createPortal(
        navBarEl,
        document.getElementById("mobile-nav-bar")
      )}
    </Fragment>
  );
}

export default NavMobile;
