import { useContext, useRef } from "react";
import LayoutContext from "../../contexts/layout";
import Day from "./Day/Day";
import styles from "./Plan.module.css";

function Plan() {
  const { isMobile } = useContext(LayoutContext);

  const planEl = useRef(null);

  function scrollToElement() {
    planEl.current.scrollLeft = -120;
  }

  const classes = `${styles.plan} ${isMobile ? styles.mobile : ""}`;
  return (
    <div onClick={scrollToElement} ref={planEl} className={classes}>
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
    </div>
  );
}

export default Plan;
