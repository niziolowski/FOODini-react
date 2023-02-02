import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

function Modal(message) {
  const container = document.getElementById("modal");
  const content = <div className={styles.modal}>Modal</div>;
  return <>{ReactDOM.createPortal(content, container)}</>;
}

export default Modal;
