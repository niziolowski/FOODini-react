import styles from "./Day.module.css";
import Button from "../../UI/Button";
import { FiPlus } from "react-icons/fi";
import { useContext } from "react";
import LayoutContext from "../../../contexts/layout";

function Day() {
  const { isMobile } = useContext(LayoutContext);

  const btnAdd = (
    <Button round mini fill>
      <FiPlus />
    </Button>
  );

  return (
    <div className={`${styles.wrapper} ${isMobile && styles.mobile}`}>
      <div className={styles.day}>
        <div className={styles.title}>Poniedziałek</div>
        <ul className={styles.list}>
          <li>item</li>
        </ul>
        {isMobile && btnAdd}
      </div>
    </div>
  );
}

export default Day;
