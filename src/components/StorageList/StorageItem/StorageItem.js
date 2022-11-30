import { FiStar, FiTrash } from "react-icons/fi";
import Button from "../../UI/Button";
import styles from "./StorageItem.module.css";

function StorageItem() {
  return (
    <li className={styles["storage-item"]}>
      <Button className={styles.bookmark} round mini>
        <FiStar />
      </Button>
      <div className={styles.title}>Jajka</div>
      <div className={styles.amount}>10</div>
      <div className={styles.unit}>szt.</div>
      <div className={styles.expiry}>
        <div className={styles["expiry-days-left"]}>14</div>
        <div className={styles["expiry-indicator"]}>
          <div className={styles["expiry-indicator__bar"]}></div>
        </div>
      </div>
      <Button round mini>
        <FiTrash />
      </Button>
      <div className={styles.tag}></div>
    </li>
  );
}

export default StorageItem;
