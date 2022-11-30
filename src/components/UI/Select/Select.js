import styles from "./Select.module.css";

/**
 *
 * @param {Array} Options
 * @returns A dropdown menu with passed options
 */
function Select({ options, name, value, onChange }) {
  return (
    <select
      name={name}
      value={value}
      className={styles.select}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

export default Select;
