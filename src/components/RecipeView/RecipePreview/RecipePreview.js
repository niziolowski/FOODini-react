import { useContext } from "react";
import {
  FiEdit,
  FiX,
  FiStar,
  FiCheck,
  FiDisc,
  FiDroplet,
  FiChevronRight,
} from "react-icons/fi";
import LayoutContext from "../../../contexts/layout";
import BarIndicator from "../../UI/BarIndicator/BarIndicator";
import Button from "../../UI/Button/Button";
import DifficultyIndicator from "../../UI/DifficultyIndicator/DifficultyIndicator";
import Tag from "../../UI/Tag/Tag";
import styles from "../RecipeView.module.css";

function RecipePreview({ data, onToggleEdit }) {
  const { isMobile } = useContext(LayoutContext);
  const nav = (
    <>
      <Button className={styles["btn-edit"]} onClick={onToggleEdit} round>
        <FiEdit />
      </Button>
      <h1 className={styles.title}>{data.title}</h1>
      <Button className={styles["btn-close"]} round>
        <FiX />
      </Button>
    </>
  );
  return (
    <>
      <section className={styles.summary}>
        <img src="https://na-talerzu.pl/wp-content/uploads/2021/05/Kulki-mocy-z-kokosem-5177.jpg" />
        <Tag className={styles.tag} tag={1}>
          obiad
        </Tag>
        {isMobile && nav}
        <div className={styles.indicators}>
          <DifficultyIndicator value={2} />
          <Button round mini fillIcon>
            <FiStar />
          </Button>
          <BarIndicator label="Składniki" value={50} />
        </div>
        <div className={styles.ingredients}>
          <h2 className={styles.title}>Składniki</h2>
          <ul className={styles["ingredient-list"]}>
            <li className={styles["list-item"]}>
              <FiCheck className={styles.check} />
              <p className={styles.name}>Jajka</p>
              <p>4</p>
              <p>szt.</p>
            </li>
            <li className={styles["list-item"]}>
              <FiX className={styles.check} />
              <p className={styles.name}>Boczek</p>
              <p>50</p>
              <p>g.</p>
            </li>
          </ul>
        </div>
        <div className={styles.spices}>
          <h2 className={styles.title}>Przyprawy</h2>
          <ul className={styles["spices-list"]}>
            <li className={styles["list-item"]}>
              <FiChevronRight />
              <p className={styles.name}>Sól</p>
            </li>
            <li className={styles["list-item"]}>
              <FiChevronRight />
              <p className={styles.name}>Pieprz</p>
            </li>
          </ul>
        </div>
      </section>
      <section className={styles.description}>
        <header className={styles.header}>{!isMobile && nav}</header>
        {isMobile && <h2>Sposób przygotowania</h2>}
        <div className={styles.instructions}>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </div>
      </section>
    </>
  );
}
export default RecipePreview;
