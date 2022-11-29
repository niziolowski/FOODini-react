import { useContext } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./StorageList.module.css";

function StorageList() {
  const { isMobile } = useContext(LayoutContext);

  return (
    <div
      className={`${styles["storage-list"]} ${isMobile ? styles.mobile : ""}`}
    >
      storagelist
    </div>
  );
}

export default StorageList;
