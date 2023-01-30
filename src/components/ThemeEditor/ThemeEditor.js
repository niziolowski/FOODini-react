import styles from "./ThemeEditor.module.css";
function ThemeEditor() {
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
          className={styles["swatch-preview"]}
          type="color"
          value="#eeeeee"
        ></input>
        <div className={styles["swatch-label"]}>
          <div className={styles["label-target"]}>Tło</div>
          <div className={styles["label-value"]}>#eeeeee</div>
        </div>
      </div>
      <div className={styles.swatch}>
        <input
          id="swatch-accent"
          data-color="--accent-color"
          className={styles["swatch-preview"]}
          type="color"
          value="#333333"
        ></input>
        <div className={styles["swatch-label"]}>
          <div className={styles["label-target"]}>Akcent</div>
          <div className={styles["label-value"]}>#333333</div>
        </div>
      </div>
      <div className={styles.swatch}>
        <input
          id="swatch-font"
          data-color="--font-color"
          className={styles["swatch-preview"]}
          type="color"
          value="#333333"
        ></input>
        <div className={styles["swatch-label"]}>
          <div className={styles["label-target"]}>Tekst</div>
          <div className={styles["label-value"]}>#eeeeee</div>
        </div>
      </div>
      <div className={styles.swatch}>
        <input
          id="swatch-tag-1"
          data-color="--tag-0-color"
          className={styles["swatch-preview"]}
          type="color"
          value="#eeeeee"
        ></input>
        <div className={styles["swatch-label"]}>
          <div className={styles["label-target"]}>Tag1</div>
          <div className={styles["label-value"]}>#eeeeee</div>
        </div>
      </div>
      <div className={styles.swatch}>
        <input
          id="swatch-tag-2"
          data-color="--tag-1-color"
          className={styles["swatch-preview"]}
          type="color"
          value="#eeeeee"
        ></input>
        <div className={styles["swatch-label"]}>
          <div className={styles["label-target"]}>Tag2</div>
          <div className={styles["label-value"]}>#eeeeee</div>
        </div>
      </div>
      <div className={styles.swatch}>
        <input
          id="swatch-tag-3"
          data-color="--tag-2-color"
          className={styles["swatch-preview"]}
          type="color"
          value="#eeeeee"
        ></input>
        <div className={styles["swatch-label"]}>
          <div className={styles["label-target"]}>Tag3</div>
          <div className={styles["label-value"]}>#eeeeee</div>
        </div>
      </div>
    </div>
  );
}
export default ThemeEditor;
