import styles from "./Button.module.css";

function Button(props) {
  const classes = `${styles.button} ${props.round && styles.round} ${
    props.mini && styles.mini
  } ${props.fill && styles.fill} ${props.warning && styles.warning} `;

  return <button className={classes}>{props.children}</button>;
}

export default Button;
