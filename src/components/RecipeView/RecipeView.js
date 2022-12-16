import { useContext } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./RecipeView.module.css";
import ReactDOM from "react-dom";
import { FiEdit, FiX, FiStar, FiCheck, FiChevronRight } from "react-icons/fi";
import UserDataContext from "../../contexts/user-data";
import BarIndicator from "../UI/BarIndicator/BarIndicator";
import Button from "../UI/Button/Button";
import DifficultyIndicator from "../UI/DifficultyIndicator/DifficultyIndicator";
import Tag from "../UI/Tag/Tag";
import RecipeForm from "../RecipeForm/RecipeForm";

function RecipeView({ data, onClose }) {
  const { isMobile } = useContext(LayoutContext);
  const { tagsRec } = useContext(UserDataContext);

  const onToggleEdit = () => {};

  const handleClose = () => {
    onClose();
  };

  const root = document.getElementById("modal");

  const controls = (
    <>
      <Button className={styles["btn-edit"]} onClick={onToggleEdit} round>
        <FiEdit />
      </Button>
      <h1 className={styles.title}>{data.title}</h1>
      <Button onClick={onClose} className={styles["btn-close"]} round>
        <FiX />
      </Button>
    </>
  );
  const content = (
    <>
      {!isMobile && <div onClick={handleClose} id="backdrop"></div>}
      <div className={`${styles.content} ${isMobile && styles.mobile}`}>
        <div className={styles.grid}>
          <section className={styles.summary}>
            <img src="https://na-talerzu.pl/wp-content/uploads/2021/05/Kulki-mocy-z-kokosem-5177.jpg" />
            <Tag className={styles.tag} tag={data.tag}>
              {tagsRec[data.tag]}
            </Tag>
            {isMobile && controls}
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
                  <li key={spice} className={styles["list-item"]}>
                    <FiChevronRight />
                    <p className={styles.name}>{spice}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className={styles.description}>
            <header className={styles.header}>{!isMobile && controls}</header>
            {isMobile && <h2>Sposób przygotowania</h2>}
            <div className={styles.instructions}>{data.instructions}</div>
          </section>
        </div>
      </div>
      <RecipeForm isActive={false} />
    </>
  );

  return <>{ReactDOM.createPortal(content, root)}</>;
}

export default RecipeView;
