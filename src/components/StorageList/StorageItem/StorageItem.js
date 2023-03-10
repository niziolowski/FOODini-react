import { useContext, useMemo } from "react";
import { FiStar, FiTrash } from "react-icons/fi";
import { TbInfinity } from "react-icons/tb";
import IngredientsContext from "../../../contexts/ingredients";
import { animate } from "../../../utils/animate";
import { calcDaysToExpiry } from "../../../utils/dates";
import { mapRange } from "../../../utils/helpers";
import BarIndicator from "../../UI/BarIndicator/BarIndicator";
import Button from "../../UI/Button/Button";
import styles from "./StorageItem.module.css";
import { forwardRef } from "react";

const StorageItem = forwardRef(({ item, onEdit, isDragging, ...rest }, ref) => {
  const { editIngredient, removeIngredient } = useContext(IngredientsContext);

  const classes = `${styles["storage-item"]} ${isDragging && styles.dragging}`;
  // Calculate days until the ingredient expires
  const daysToExpiry = useMemo(
    () => calcDaysToExpiry(item.purchase_date, item.expiry),
    [item.purchase_date, item.expiry]
  );

  // Calculate indicator value (between 0 and 100)
  const indicatorValue = useMemo(
    () => mapRange(daysToExpiry, 0, item.expiry, 0, 100),
    [daysToExpiry, item.expiry]
  );

  // On item click
  const handleClick = (e) => {
    const btn = e.target.closest("button");

    // If click target is not a button, edit ingredient
    if (!btn) onEdit(item);
  };

  // Toggle favorites
  const handleBookmark = async (e) => {
    const btn = e.target.closest("button");
    try {
      animate(btn, "pulsate");
      const updated = { ...item, bookmark: !item.bookmark };
      await editIngredient(updated);
    } catch (error) {
      animate(btn, "shake");
    }
  };

  // Delete ingredient
  const handleDelete = async (e) => {
    const btn = e.target.closest("button");
    try {
      animate(btn, "pulsate");
      await removeIngredient(item.id);
    } catch (error) {
      animate(btn, "shake");
    }
  };

  return (
    <li onClick={handleClick} {...rest} ref={ref} className={classes}>
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
        label={item.expiry === 0 ? <TbInfinity /> : `${daysToExpiry} dni`}
        value={item.expiry === 0 ? null : indicatorValue}
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
});

export default StorageItem;
