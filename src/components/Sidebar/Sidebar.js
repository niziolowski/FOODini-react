import { useContext, useState } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./Sidebar.module.css";

import StorageList from "../StorageList/StorageList";
import RecipeList from "../RecipeList/RecipeList";

function Sidebar() {
  const { isVisible } = useContext(LayoutContext);
  const isActive = isVisible.sidebar;
  const [activeTab, setActiveTab] = useState("storage");

  const classes = `${styles.sidebar} ${isActive ? styles.active : ""}`;

  function handleClick(e) {
    setActiveTab(e.target.dataset.tab);
  }

  return (
    <aside className={classes}>
      <header class={styles.tabs}>
        <button
          onClick={handleClick}
          class={`${styles.tab} ${
            activeTab === "storage" ? styles.active : ""
          }`}
          data-tab="storage"
        >
          Spiżarnia
        </button>
        <button
          onClick={handleClick}
          class={`${styles.tab} ${
            activeTab === "recipes" ? styles.active : ""
          }`}
          data-tab="recipes"
        >
          Baza przepisów
        </button>
      </header>
      {activeTab === "storage" ? <StorageList /> : <RecipeList />}
    </aside>
  );
}

export default Sidebar;
