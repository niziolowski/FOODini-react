import { useContext } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./StorageList.module.css";
import StorageItem from "./StorageItem/StorageItem";
import FilterOptions from "../UI/FilterOptions/FilterOptions";

function StorageList() {
  const { isMobile } = useContext(LayoutContext);

  return (
    <div
      className={`${styles["storage-list"]} ${isMobile ? styles.mobile : ""}`}
    >
      <FilterOptions />
      <StorageItem />
    </div>
  );
}

export default StorageList;
