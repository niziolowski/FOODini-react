import { useEffect, useRef } from "react";
import { FiSettings } from "react-icons/fi";
import Button from "../UI/Button/Button";
import styles from "./Profile.module.css";

function Profile({ onClose }) {
  const panelEl = useRef();

  // Close panel when on mouseleave
  useEffect(() => {
    panelEl.current.addEventListener("mouseleave", onClose);
  }, []);

  return (
    <div ref={panelEl} className={styles.content}>
      <Button className={styles["btn-toggle"]} onClick={onClose} round mini>
        <FiSettings />
      </Button>
      <div className={styles.col}>
        <h1>Krystian</h1>
        <p>krystianpiatkowski92@gmail.com</p>
      </div>
      <Button primary wide>
        Wygląd
      </Button>
      <Button primary outline wide>
        Wyloguj się
      </Button>
    </div>
  );
}
export default Profile;
