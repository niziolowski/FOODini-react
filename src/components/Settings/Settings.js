import { useContext } from "react";
import LayoutContext from "../../contexts/layout";
import ReactDOM from "react-dom";
import styles from "./Settings.module.css";

function Settings() {
  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const isActive = isVisible.settings;

  function handleClose(e) {
    dispatchIsVisible({ type: "settings", mode: "toggle" });
  }

  const root = document.getElementById("modal");
  const desktopJSX = (
    <>
      <div onClick={handleClose} id="backdrop"></div>
      <div className={styles.settings}>settings</div>
    </>
  );

  if (isMobile) {
    return (
      <>
        {isActive && (
          <div className={`${styles.settings} ${styles.mobile}`}>settings</div>
        )}
      </>
    );
  }

  if (!isMobile) {
    return <>{isActive && ReactDOM.createPortal(desktopJSX, root)}</>;
  }
}

export default Settings;
