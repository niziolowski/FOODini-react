import styles from "./DifficultyIndicator.module.css";
import { FiStar } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";

function DifficultyIndicator({ value }) {
  const [content, setContent] = useState([]);

  const generateContent = useCallback(
    (value) => {
      // clear content
      setContent([]);

      for (let i = 0; i < 5; i++) {
        if (i < value)
          setContent((current) => [
            ...current,
            <FiStar key={i} className={`${styles.indicator} ${styles.fill}`} />,
          ]);
        if (i >= value)
          setContent((current) => [
            ...current,
            <FiStar className={styles.indicator} key={i} />,
          ]);
      }
    },
    [value]
  );

  useEffect(() => {
    generateContent(value);
  }, [value]);

  return (
    <div className={styles.difficulty}>
      <p>Trudność</p>
      <div className={styles.indicator}>{content}</div>
    </div>
  );
}

export default DifficultyIndicator;
