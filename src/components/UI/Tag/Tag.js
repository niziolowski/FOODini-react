import styles from "./Tag.module.css";

function Tag({ children, tag, className, small }) {
  const classes = `${styles.tag} ${styles[`color-${tag}`]} ${className} ${
    small && styles.small
  } `;
  return (
    <div className={classes}>
      <span>{children}</span>
    </div>
  );
}

export default Tag;
