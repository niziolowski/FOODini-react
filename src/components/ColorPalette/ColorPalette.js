import styles from "./ColorPalette.module.css";

function ColorPalette() {
  return (
    <div className={styles.content}>
      <div className={styles.bolt}></div>
      <div className={styles.title}>
        KO
        <br />
        LO
        <br />
        RY
      </div>
      <div className={styles.swatch}>
        <input
          id="swatch-bg"
          data-color="--bg-color"
          className={styles.preview}
          type="color"
          value="#eeeeee"
        ></input>
        <div className={styles.label}>
          <div className={styles["label-name"]}>Tło</div>
          <div className={styles["label-value"]}>#eeeeee</div>
        </div>
      </div>
    </div>
  );
}
export default ColorPalette;
