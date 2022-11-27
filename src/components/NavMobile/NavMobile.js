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
import { useContext, useState } from "react";
import NavMobileTab from "./NavMobileTab";
import Button from "../UI/Button";
import stateContext from "../../contexts/state";

function NavMobile() {
  const [activeTab, setActiveTab] = useState("home");
  const { setIsShoppingListActive } = useContext(stateContext);
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
    setActiveTab(tab);
    if (tab === "shopping-list") {
      setIsShoppingListActive(true);
    }
  }

  return (
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
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <NavMobileTab
            key={tab.name}
            tab={tab}
            onTabClick={handleTabClick}
            active={activeTab === tab.name}
          />
        ))}
      </div>
    </div>
  );
}

export default NavMobile;
