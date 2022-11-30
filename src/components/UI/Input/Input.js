import styles from "./Input.module.css";

function Input(props) {
  return (
    <input
      value={props.value}
      onChange={props.onChange}
      className={styles.input}
      name={props.name}
      type={props.type}
      autoComplete={props.autocomplete}
      min={props.min}
      maxLength={props.maxLength}
    />
  );
}

export default Input;
