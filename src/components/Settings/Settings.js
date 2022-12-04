import { useContext } from "react";
import LayoutContext from "../../contexts/layout";
import ReactDOM from "react-dom";
import styles from "./Settings.module.css";
import Button from "../UI/Button";
import { FiX } from "react-icons/fi";

function Settings() {
  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const isActive = isVisible.settings;

  function handleClose(e) {
    dispatchIsVisible({ type: "settings", mode: "toggle" });
  }

  function handleCatalog() {
    dispatchIsVisible({ type: "catalog", mode: "toggle" });
    dispatchIsVisible({ type: "settings", mode: "toggle" });
  }

  const root = document.getElementById("modal");
  const content = (
    <>
      {!isMobile && <div onClick={handleClose} id="backdrop"></div>}
      <div className={`${styles.settings} ${isMobile ? styles.mobile : " "}`}>
        <header className={styles.header}>
          <h1>USTAWIENIA</h1>
          {!isMobile && (
            <Button onClick={handleClose} round>
              <FiX />
            </Button>
          )}
        </header>
        <div className={styles.content}>
          <Button onClick={handleCatalog} disabled={isMobile}>
            Katalog produktów
          </Button>
        </div>
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
