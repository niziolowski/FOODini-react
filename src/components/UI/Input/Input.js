import styles from "./Input.module.css";

function Input({ className, isValid, ...rest }) {
  const classes = `${className} ${styles.input} ${
    !isValid ? styles.invalid : ""
  }`;
  return <input className={classes} {...rest} />;
}

export default Input;
