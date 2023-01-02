import { useContext, useState } from "react";
import { FiStar, FiTrash } from "react-icons/fi";
import { TbInfinity } from "react-icons/tb";
import IngredientsContext from "../../../contexts/ingredients";
import { calcDaysToExpiry } from "../../../utils/dates";
import { mapRange } from "../../../utils/helpers";
import BarIndicator from "../../UI/BarIndicator/BarIndicator";
import Button from "../../UI/Button/Button";
import styles from "./StorageItem.module.css";

function StorageItem({ item, ...rest }) {
  console.log(item);
  const { editIngredient, removeIngredient } = useContext(IngredientsContext);

  // Calculate days until the ingredient expires
  const [daysToExpiry] = useState(
    calcDaysToExpiry(item.purchase_date, item.expiry)
  );

  // Calculate indicator value (between 0 and 100)
  const [indicatorValue] = useState(
    mapRange(daysToExpiry, 0, item.expiry, 0, 100)
  );

  const handleBookmark = () => {
    const updated = { ...item, bookmark: !item.bookmark };
    editIngredient(updated);
  };

  const handleDelete = () => {
    removeIngredient(item.id);
  };

  return (
    <li {...rest} className={styles["storage-item"]}>
      <Button
        onClick={handleBookmark}
        round
        mini
        fillIcon
        active={item.bookmark}
      >
        <FiStar />
      </Button>
      <div className={styles.title}>{item.name}</div>
      <div className={styles.amount}>{item.amount}</div>
      <div className={styles.unit}>{item.unit}</div>
      <BarIndicator
        label={
          item.expiry === Infinity ? <TbInfinity /> : `${daysToExpiry} dni`
        }
        value={indicatorValue}
        small
      />
      <Button onClick={handleDelete} doubleAction round mini>
        <FiTrash />
      </Button>
      <div
        className={styles.tag}
        style={{
          backgroundColor: `var(--tag-${item.tag}-color)`,
        }}
      ></div>
    </li>
  );
}

export default StorageItem;
