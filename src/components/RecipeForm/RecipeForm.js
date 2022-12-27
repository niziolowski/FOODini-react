import { useContext } from "react";
import { FiTrash, FiX } from "react-icons/fi";
import RecipesContext from "../../contexts/recipes";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";
import styles from "./RecipeForm.module.css";
import ReactDOM from "react-dom";

function RecipeForm({ isActive }) {
  const { tags } = useContext(RecipesContext);
  const root = document.getElementById("modal");

  const content = (
    <div className={styles.content}>
      <header className={styles.header}>
        <h1>Stwórz nowy przepis</h1>
        <Button round>
          <FiX />
        </Button>
      </header>
      <form id="add-recipe" className={styles.form}>
        <section>
          <div className={styles.field}>
            <label>Tytuł</label>
            <Input />
          </div>
        </section>
        <section>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Grupa</label>
              <Select options={tags} />
            </div>
            <div className={styles.field}>
              <label>Trudność</label>
              <Select options={[1, 2, 3, 4, 5]} />
            </div>
            <div className={styles.field}>
              <label>Zdjęcie</label>
              <label for="file-upload" class={styles["custom-file-upload"]}>
                Prześlij zdjęcie
              </label>
              <input id="file-upload" type="file" />
            </div>
          </div>
        </section>
        {/* Ingredients */}
        <section className={styles.ingredients}>
          <h2>Składniki</h2>
          <div className={styles.row}>
            <Input placeholder="Nazwa" />
            <Input placeholder="Ilość" />
            <Select options={["szt.", "kg", "g", "ml"]} />
            <Button type="button" round mini>
              <FiTrash />
            </Button>
          </div>
          <Button type="button" primary outline wide>
            Dodaj składnik
          </Button>
        </section>
        {/* Spices */}
        <section>
          <h2>Przyprawy</h2>
          <div className={styles.row}>
            <Input placeholder="Nazwa" />
            <Button type="button" round mini>
              <FiTrash />
            </Button>
          </div>
          <Button type="button" primary outline wide>
            Dodaj przyprawę
          </Button>
        </section>
        {/* Instructions */}
        <section className={styles.instructions}>
          <h2>Sposób przygotowania</h2>
          <textarea></textarea>
        </section>
      </form>
      <Button type="submit" form="add-recipe" primary>
        Dodaj
      </Button>
    </div>
  );
  return <>{isActive && ReactDOM.createPortal(content, root)}</>;
}

export default RecipeForm;
