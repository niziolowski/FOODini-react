import styles from "./Input.module.css";

function Input(props) {
  return (
    <input
      //? This component and all its props is just for the styles... Is it worth it?
      className={`${styles.input} ${!props.isValid ? styles.invalid : ""}`}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      name={props.name}
      type={props.type}
      autoComplete={props.autocomplete}
      min={props.min}
      maxLength={props.maxLength}
      placeholder={props.placeholder}
      disabled={props.disabled}
      autoFocus={props.autoFocus}
    />
  );
}

export default Input;
