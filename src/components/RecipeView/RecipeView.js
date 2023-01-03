import { useContext } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./RecipeView.module.css";
import ReactDOM from "react-dom";
import { FiEdit, FiX, FiStar, FiCheck, FiChevronRight } from "react-icons/fi";

import BarIndicator from "../UI/BarIndicator/BarIndicator";
import Button from "../UI/Button/Button";
import DifficultyIndicator from "../UI/DifficultyIndicator/DifficultyIndicator";
import Tag from "../UI/Tag/Tag";

import RecipesContext from "../../contexts/recipes";

function RecipeView({ data, onClose, onEdit }) {
  const { isMobile } = useContext(LayoutContext);
  const { tags } = useContext(RecipesContext);

  const root = document.getElementById("modal");

  const header = (
    <>
      <Button className={styles["btn-edit"]} onClick={onEdit} round>
        <FiEdit />
      </Button>
      <h1 className={styles.title}>{data.name}</h1>
      <Button onClick={onClose} className={styles["btn-close"]} round>
        <FiX />
      </Button>
    </>
  );
  const content = (
    <>
      {!isMobile && <div onClick={onClose} id="backdrop"></div>}
      <div className={`${styles.content} ${isMobile && styles.mobile}`}>
        <div className={styles.grid}>
          <section className={styles.summary}>
            <img src={data.image} alt="recipe" />
            <Tag className={styles.tag} tag={data.tag}>
              {tags[data.tag]}
            </Tag>
            {isMobile && header}
            <div className={styles.indicators}>
              <DifficultyIndicator value={data.difficulty} />
              <Button round mini fillIcon active={data.bookmark}>
                <FiStar />
              </Button>
              <BarIndicator label="Składniki" value={50} />
            </div>
            <div className={styles.ingredients}>
              <h2 className={styles.title}>Składniki</h2>
              <ul className={styles["ingredient-list"]}>
                {data.ingredients.map((ing) => (
                  <li key={ing.name} className={styles["list-item"]}>
                    <FiCheck className={styles.check} />
                    <p className={styles.name}>{ing.name}</p>
                    <p>{ing.amount}</p>
                    <p>{ing.unit}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.spices}>
              <h2 className={styles.title}>Przyprawy</h2>
              <ul className={styles["spices-list"]}>
                {data.spices.map((spice) => (
                  <li key={spice.name} className={styles["list-item"]}>
                    <FiChevronRight />
                    <p className={styles.name}>{spice.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className={styles.description}>
            <header className={styles.header}>{!isMobile && header}</header>
            {isMobile && <h2>Sposób przygotowania</h2>}
            <div className={styles.instructions}>{data.instructions}</div>
          </section>
        </div>
      </div>
    </>
  );

  return <>{ReactDOM.createPortal(content, root)}</>;
}

export default RecipeView;
