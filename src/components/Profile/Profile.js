import { useContext, useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import AuthContext from "../../contexts/auth";
import LayoutContext from "../../contexts/layout";
import Button from "../UI/Button/Button";
import styles from "./Profile.module.css";

function Profile({ onClose }) {
  const { name, email, logout } = useContext(AuthContext);
  const { isMobile, dispatchIsVisible } = useContext(LayoutContext);

  const handleLogout = () => {
    logout();
  };

  // * Catalog should really be called 'templates'
  const handleCatalog = () => {
    dispatchIsVisible({ type: "catalog", mode: "toggle" });
    dispatchIsVisible({ type: "profile", mode: "toggle" });
  };

  // Close panel on mouseleave
  useEffect(() => {
    const handleClose = (e) => {
      const parentEl = e.target.closest(`.${styles.content}`);
      if (!parentEl) dispatchIsVisible({ type: "profile", mode: "toggle" });
    };

    window.addEventListener("touchstart", handleClose);

    return () => {
      window.removeEventListener("touchstart", handleClose);
    };
  }, [onClose]);

  return (
    <div
      onMouseLeave={onClose}
      className={`${styles.content} ${isMobile && styles.mobile}`}
    >
      <div className={styles.box}>
        {!isMobile && (
          <Button className={styles["btn-toggle"]} onClick={onClose} round mini>
            <FiSettings />
          </Button>
        )}
        <div className={styles.col}>
          <h1>{name}</h1>
          <p>{email}</p>
        </div>
        <Button primary wide outline>
          Wygląd
        </Button>
        <Button
          disabled={isMobile}
          onClick={handleCatalog}
          primary
          wide
          outline
        >
          Szablony produktów
        </Button>
        <Button onClick={handleLogout} primary wide>
          Wyloguj się
        </Button>
      </div>
    </div>
  );
}
export default Profile;
