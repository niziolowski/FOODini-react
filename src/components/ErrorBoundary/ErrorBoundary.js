import { useContext } from "react";
import ErrorContext from "../../contexts/error";
import styles from "./ErrorBoundary.module.css";
import ReactDOM from "react-dom";
import Button from "../UI/Button/Button";
import { FiAlertTriangle, FiInfo, FiTriangle, FiTruck } from "react-icons/fi";

function ErrorBoundary({ children }) {
  const { error, setError } = useContext(ErrorContext);

  //   Dismiss error
  const handleDismiss = () => setError(null);

  //  Declare modal JSX
  const modal = (
    <div className={styles.modal}>
      <h1>
        <FiAlertTriangle />
      </h1>
      <div className={styles.message}>{error}</div>
      <Button onClick={handleDismiss} primary>
        Rozumiem
      </Button>
    </div>
  );

  const container = document.getElementById("modal");
  return (
    <>
      {error && ReactDOM.createPortal(modal, container)}
      {children}
    </>
  );
}
export default ErrorBoundary;
