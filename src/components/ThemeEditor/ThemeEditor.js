import { useState } from "react";
import {
  applyColorTheme,
  defaultColorTheme,
  loadColorTheme,
  saveColorTheme,
} from "../../utils/colorTheme";
import styles from "./ThemeEditor.module.css";
function ThemeEditor() {
  // Color Theme state
  const [colorTheme, setColorTheme] = useState(
    loadColorTheme() || defaultColorTheme()
  );

  const handleInputChange = (e) => {
    // Get property name
    const property = e.target.dataset.color;
    // Get value
    const value = e.target.value;
    // Get object to update
    const target = colorTheme.find((item) => item.property === property);
    // Get index of the object to update
    const index = colorTheme.indexOf(target);
    // Create updated Object
    const updatedObject = { ...target, value };

    // Create updated colorTheme
    const updatedColorTheme = [
      ...colorTheme.slice(0, index),
      updatedObject,
      ...colorTheme.slice(index + 1),
    ];

    // Update state
    setColorTheme(updatedColorTheme);

    // Update localStorage
    saveColorTheme(updatedColorTheme);

    // Apply colorTheme
    applyColorTheme(updatedColorTheme);
  };

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
      {colorTheme.map((color) => (
        <div key={color.label} className={styles.swatch}>
          <input
            id="swatch-bg"
            data-color={color.property}
            className={styles["swatch-preview"]}
            type="color"
            onChange={handleInputChange}
            value={color.value}
          ></input>
          <div className={styles["swatch-label"]}>
            <div className={styles["label-target"]}>{color.label}</div>
            <div className={styles["label-value"]}>{color.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ThemeEditor;
