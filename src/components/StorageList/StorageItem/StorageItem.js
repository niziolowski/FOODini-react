import { FiStar, FiTrash } from "react-icons/fi";
import { TbInfinity } from "react-icons/tb";
import BarIndicator from "../../UI/BarIndicator/BarIndicator";
import Button from "../../UI/Button/Button";
import styles from "./StorageItem.module.css";

function StorageItem({ item, ...rest }) {
  // Gets tag index
  return (
    <li {...rest} className={styles["storage-item"]}>
      <Button round mini fillIcon active={item.bookmark}>
        <FiStar />
      </Button>
      <div className={styles.title}>{item.name}</div>
      <div className={styles.amount}>{item.amount}</div>
      <div className={styles.unit}>{item.unit}</div>
      <BarIndicator
        label={item.expiry === Infinity ? <TbInfinity /> : `${item.expiry} dni`}
        value={30}
        small
      />
      <Button doubleAction round mini>
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
