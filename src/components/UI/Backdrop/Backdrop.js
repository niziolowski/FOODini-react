import { useContext } from "react";
import LayoutContext from "../../../contexts/layout";
import styles from "./Backdrop.module.css";
import ReactDOM from "react-dom";
import styles from "./Backdrop.module.css";

function Backdrop() {
  const { isBackdropActive: active } = useContext(LayoutContext);

  return (
    <div className={`${styles.backdrop} ${active ? styles.hidden : ""}`}>
      {ReactDOM.createPortal(backdropEl, document.getElementById("backdrop"))}
    </div>
  );
}

export default Backdrop;
