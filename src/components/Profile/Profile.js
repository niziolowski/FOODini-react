import { useContext, useEffect, useRef } from "react";
import { FiSettings } from "react-icons/fi";
import AuthContext from "../../contexts/auth";
import LayoutContext from "../../contexts/layout";
import Button from "../UI/Button/Button";
import styles from "./Profile.module.css";

function Profile({ onClose }) {
  const { name, email, logout } = useContext(AuthContext);
  const { dispatchIsVisible } = useContext(LayoutContext);
  const panelEl = useRef();

  const handleLogout = () => {
    logout();
  };

  // * Catalog should be called 'templates'
  const handleCatalog = () => {
    dispatchIsVisible({ type: "catalog", mode: "toggle" });
    onClose();
  };

  // Close panel when on mouseleave
  useEffect(() => {
    panelEl.current.addEventListener("mouseleave", onClose);
  }, [onClose]);

  return (
    <div ref={panelEl} className={styles.content}>
      <Button className={styles["btn-toggle"]} onClick={onClose} round mini>
        <FiSettings />
      </Button>
      <div className={styles.col}>
        <h1>{name}</h1>
        <p>{email}</p>
      </div>
      <Button primary wide outline>
        Wygląd
      </Button>
      <Button onClick={handleCatalog} primary wide outline>
        Szablony produktów
      </Button>
      <Button onClick={handleLogout} primary wide>
        Wyloguj się
      </Button>
    </div>
  );
}
export default Profile;