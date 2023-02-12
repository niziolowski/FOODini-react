import { useContext } from "react";
import ErrorContext from "../../contexts/error";
import styles from "./ErrorBoundary.module.css";
import ReactDOM from "react-dom";
import Button from "../UI/Button/Button";
import { FiAlertTriangle } from "react-icons/fi";

function ErrorBoundary({ children }) {
  const { error, setError } = useContext(ErrorContext);

  //   Handle error dismiss button
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

  // Declare container for rendering using a portal
  const container = document.getElementById("modal");

  return (
    <>
      {error && ReactDOM.createPortal(modal, container)}
      {children}
    </>
  );
}
export default ErrorBoundary;
