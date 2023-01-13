import { useContext, useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import AuthContext from "../../contexts/auth";
import LayoutContext from "../../contexts/layout";
import Button from "../UI/Button/Button";
import styles from "./Profile.module.css";

function Profile({ onClose }) {
  const { name, email, logout } = useContext(AuthContext);
  const { isMobile, dispatchIsVisible } = useContext(LayoutContext);

  const handleClick = (e) => {
    const btn = e.target.closest("button");

    // BTN logout
    if (btn.classList.contains("js-logout")) logout();

    // BTN catalog
    if (btn.classList.contains("js-catalog"))
      dispatchIsVisible({ type: "catalog", mode: "switch" }); //* Catalog should really be called 'templates'

    // BTN appearance
    if (btn.classList.contains("js-settings"))
      dispatchIsVisible({ type: "settings", mode: "switch" });
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
  }, [onClose, dispatchIsVisible]);

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
        <Button
          onClick={handleClick}
          className="js-settings"
          primary
          wide
          outline
        >
          Ustawienia
        </Button>
        <Button
          className="js-catalog"
          disabled={isMobile}
          onClick={handleClick}
          primary
          wide
          outline
        >
          Szablony produktów
        </Button>
        <Button className="js-logout" onClick={handleClick} primary wide>
          Wyloguj się
        </Button>
      </div>
    </div>
  );
}
export default Profile;
