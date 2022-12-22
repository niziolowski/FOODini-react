import img from "../../../assets/images/lemon-slice.png";
import styles from "./Spinner.module.css";
function Spinner() {
  return (
    <img className={`${styles.spinner} spin`} src={img} alt="spinner"></img>
  );
}

export default Spinner;
