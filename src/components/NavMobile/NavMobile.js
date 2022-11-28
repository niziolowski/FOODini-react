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
import React, { Fragment, useContext, useState } from "react";
import ReactDOM from "react-dom";
import NavMobileBar from "./NavMobileBar";
import Button from "../UI/Button";
import LayoutContext from "../../contexts/layout";

function NavMobile() {
  const [activeTab, setActiveTab] = useState("home");

  const { dispatchIsVisible } = useContext(LayoutContext);

  // Set of tabs and respective icons
  const tabs = [
    {
      name: "ingredients",
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
      name: "settings",
      icon: <FiSettings />,
    },
  ];

  function handleTabClick(tab) {
    // Set tab as active
    setActiveTab(tab);

    // Show clicked tab
    dispatchIsVisible({ type: tab, mode: "switch" });
  }

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
          <Button round mini>
            <FiChevronLeft />
          </Button>
          <div className={styles.title}>
            <h1>PLAN POSIŁKÓW</h1>
            <h2>BIEŻĄCY TYDZIEŃ</h2>
          </div>
          <Button round mini>
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
