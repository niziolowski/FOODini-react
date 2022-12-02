import styles from "./Button.module.css";

function Button(props) {
  const classes = `${styles.button} ${props.round ? styles.round : ""} ${
    props.mini ? styles.mini : ""
  } ${props.fill ? styles.fill : ""} ${props.warning ? styles.warning : ""} ${
    props.className || ""
  }`;

  return (
    <button
      form={props.form}
      type={props.type}
      onClick={props.onClick}
      className={classes}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;
