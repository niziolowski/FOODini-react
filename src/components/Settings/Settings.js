import { useContext } from "react";
import LayoutContext from "../../contexts/layout";
import ReactDOM from "react-dom";
import styles from "./Settings.module.css";
import Button from "../UI/Button/Button";
import { FiX } from "react-icons/fi";
import ThemeEditor from "../ThemeEditor/ThemeEditor";

function Settings() {
  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const isActive = isVisible.settings;

  function handleClose(e) {
    dispatchIsVisible({ payload: "settings", type: "TOGGLE" });
  }

  const root = document.getElementById("modal");
  const content = (
    <>
      {!isMobile && <div onClick={handleClose} id="backdrop"></div>}
      <div className={`${styles.settings} ${isMobile ? styles.mobile : " "}`}>
        <ThemeEditor />
        <header className={styles.header}>
          <h1>Wygląd</h1>

          <Button onClick={handleClose} round>
            <FiX />
          </Button>
        </header>
        <div className={styles.content}></div>
      </div>
    </>
  );

  if (isMobile) {
    return <>{isActive && content}</>;
  }

  if (!isMobile) {
    return <>{isActive && ReactDOM.createPortal(content, root)}</>;
  }
}

export default Settings;
