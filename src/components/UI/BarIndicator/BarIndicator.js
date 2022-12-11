import styles from "./BarIndicator.module.css";

/**
 * Indicates percentage of required ingredients
 * @param {Number} Number fill percentage
 * @returns indicator JSX
 */
function BarIndicator({ label, value, small }) {
  return (
    <div className={`${styles.indicator} ${small && styles.small}`}>
      <p>{label}</p>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}

export default BarIndicator;
