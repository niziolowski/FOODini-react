import React from "react";
import styles from "./Select.module.css";

/**
 *
 * @param {Array} Options
 * @returns A dropdown menu with passed options
 */
const Select = React.forwardRef(({ className, options, ...rest }, ref) => {
  const classes = `${className} ${styles.select}`;

  return (
    <select className={classes} {...rest} ref={ref}>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
});

export default Select;
