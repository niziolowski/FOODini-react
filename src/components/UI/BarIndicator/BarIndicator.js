import { useMemo } from "react";
import styles from "./BarIndicator.module.css";

/**
 * Indicates percentage of required ingredients
 * @param {Number} Number fill percentage
 * @returns indicator JSX
 */
function BarIndicator({ label, value, small }) {
  let color = useMemo(() => {
    let color = "--success-color";
    if (value < 70) color = "--warning-orange-color";
    if (value < 20) color = "--warning-red-color";
    return color;
  }, [value]);
  return (
    <div className={`${styles.indicator} ${small && styles.small}`}>
      <p>{label}</p>
      {value !== null && (
        <div
          className={styles.bar}
          style={{ backgroundColor: value === 0 ? `var(${color})` : "" }}
        >
          <div
            className={styles.fill}
            style={{ width: `${value}%`, backgroundColor: `var(${color})` }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default BarIndicator;
