import { FiStar, FiTrash } from "react-icons/fi";
import { TbInfinity } from "react-icons/tb";
import Button from "../../UI/Button";
import styles from "./StorageItem.module.css";

function StorageItem({ item }) {
  // Gets tag index
  return (
    <li className={styles["storage-item"]}>
      <Button className={styles.bookmark} round mini>
        <FiStar className={item.bookmark ? styles.fill : ""} />
      </Button>
      <div className={styles.title}>{item.name}</div>
      <div className={styles.amount}>{item.amount}</div>
      <div className={styles.unit}>{item.unit}</div>
      <div className={styles.expiry}>
        <div className={styles["expiry-days-left"]}>
          {item.expiry === Infinity ? <TbInfinity /> : item.expiry}
        </div>
        {item.expiry !== Infinity && (
          <>
            <div className={styles["expiry-indicator"]}>
              <div className={styles["expiry-indicator__bar"]}></div>
            </div>
          </>
        )}
      </div>
      <Button round mini>
        <FiTrash />
      </Button>
      <div
        className={styles.tag}
        style={{
          backgroundColor: `var(--tag-${item.group}-color)`,
        }}
      ></div>
    </li>
  );
}

export default StorageItem;
