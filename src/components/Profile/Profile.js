import { useContext, useEffect, useRef } from "react";
import { FiSettings } from "react-icons/fi";
import AuthContext from "../../contexts/auth";
import Button from "../UI/Button/Button";
import styles from "./Profile.module.css";

function Profile({ onClose }) {
  const { name, email, logout } = useContext(AuthContext);
  const panelEl = useRef();

  const handleLogout = () => {
    logout();
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
      <Button primary wide>
        Wygląd
      </Button>
      <Button onClick={handleLogout} primary outline wide>
        Wyloguj się
      </Button>
    </div>
  );
}
export default Profile;
