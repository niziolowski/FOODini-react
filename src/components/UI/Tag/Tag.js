import styles from "./Tag.module.css";

function Tag({ children, tag, className }) {
  const classes = `${styles.tag} ${styles[`color-${tag}`]} ${className}`;
  return (
    <div className={classes}>
      <span>{children}</span>
    </div>
  );
}

export default Tag;
