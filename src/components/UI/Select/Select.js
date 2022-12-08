import styles from "./Select.module.css";

/**
 *
 * @param {Array} Options
 * @returns A dropdown menu with passed options
 */
function Select({ className, options, ...rest }) {
  const classes = `${className} ${styles.select}`;

  return (
    <select className={classes} {...rest}>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

export default Select;
