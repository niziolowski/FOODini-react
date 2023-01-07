import img from "../../../assets/images/lemon-slice.png";
import styles from "./Spinner.module.css";
function Spinner({ large }) {
  return (
    <img
      className={`${styles.spinner} ${large && styles.large} spin`}
      src={img}
      alt="spinner"
    ></img>
  );
}

export default Spinner;
