import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef(({ className, isValid, ...rest }, ref) => {
  const classes = `${className} ${styles.input} ${
    !isValid ? styles.invalid : ""
  }`;
  return <input className={classes} {...rest} ref={ref} />;
});

export default Input;
