import styles from "./Button.module.css";

function Button(props) {
  const classes = `${styles.button} ${props.round ? styles.round : ""} ${
    props.mini ? styles.mini : ""
  } ${props.fillIcon ? styles["fill-icon"] : ""} ${
    props.warning ? styles.warning : ""
  } ${props.className || ""} ${props.active ? styles.active : ""}`;

  const handleDoubleAction = (e) => {
    const btn = e.target.closest("button");
    if (btn.classList.contains(styles.warning)) return props.onClick(e);

    btn.classList.add(styles.warning);
    setTimeout(() => {
      btn.classList.remove(styles.warning);
    }, 1000);
  };

  return (
    <button
      form={props.form}
      type={props.type}
      onClick={props.doubleAction ? handleDoubleAction : props.onClick}
      className={classes}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;
