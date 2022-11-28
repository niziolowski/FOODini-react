import { useContext } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const { isVisible } = useContext(LayoutContext);
  const isActive = isVisible.sidebar;

  const classes = `${styles.sidebar} ${isActive ? styles.active : ""}`;
  return <div className={classes}>Sidebar</div>;
}

export default Sidebar;
