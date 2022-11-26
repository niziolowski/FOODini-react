import styles from "./Day.module.css";
import Button from "../../UI/Button";
import { FiPlus } from "react-icons/fi";
import { useContext } from "react";
import LayoutContext from "../../../contexts/layout";
import Meal from "./Meal/Meal";

function Day({ title }) {
  const { isMobile } = useContext(LayoutContext);

  const btnAdd = (
    <Button round mini fill>
      <FiPlus />
    </Button>
  );

  const classes = `${styles.day} ${isMobile && styles.mobile}`;

  return (
    <div className={classes}>
      <div className={styles.title}>{title}</div>
      <ul className={styles.list}>
        <Meal title="Jajecznica" />
      </ul>
      {isMobile && btnAdd}
    </div>
  );
}

export default Day;
