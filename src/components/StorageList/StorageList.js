import { useContext } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./StorageList.module.css";
import Button from "../UI/Button";
import { FiMaximize2, FiPlus, FiSearch, FiStar } from "react-icons/fi";
import FilterOptions from "../UI/FilterOptions/FilterOptions";

function StorageList() {
  const { isMobile } = useContext(LayoutContext);

  return (
    <div
      className={`${styles["storage-list"]} ${isMobile ? styles.mobile : ""}`}
    >
      <FilterOptions />
      Storage List
    </div>
  );
}

export default StorageList;
