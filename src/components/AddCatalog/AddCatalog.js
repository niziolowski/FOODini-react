import { useContext } from "react";
import ReactDOM from "react-dom";
import { FiX } from "react-icons/fi";
import LayoutContext from "../../contexts/layout";
import Button from "../UI/Button";
import styles from "./AddCatalog.module.css";

function AddCatalog() {
  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const isActive = isVisible.addCatalog;

  function handleClose() {
    dispatchIsVisible({ type: "addCatalog", mode: "toggle" });
  }

  const root = document.getElementById("modal");

  const content = (
    <>
      {!isMobile && <div onClick={handleClose} id="backdrop"></div>}
      <div className={styles["add-catalog"]}>
        <header className={styles.header}>
          <h1>szablon produktu</h1>
          <Button onClick={handleClose} round>
            <FiX />
          </Button>
        </header>
        <form className={styles.form}>
          <div className={styles["row-1"]}>
            <div className={styles.col}>
              <label>Produkt</label>
              <input
                name="name"
                className="add-to-catalog-content__form__product"
                type="text"
                autocomplete="off"
              />

              <ul className="suggestions"></ul>
            </div>
            <div className={styles.col}>
              <label>Grupa</label>
              <select
                name="group"
                className="add-to-catalog-content__form__group"
              >
                <option>świeże</option>
                <option>suche</option>
                <option>mrożone</option>
              </select>
            </div>
          </div>
          <div className={styles["row-2"]}>
            <div className={styles.col}>
              <label>Ilość</label>
              <input
                name="amount"
                className="add-to-catalog-content__form__amount"
                type="number"
              />
            </div>
            <div className={styles.col}>
              <label>Jedn.</label>
              <select
                name="unit"
                className="add-to-catalog-content__form__unit"
              >
                <option>szt.</option>
                <option>kg</option>
                <option>ml</option>
                <option>g</option>
              </select>
            </div>

            <div className={styles.col}>
              <label>Wazność</label>
              <input
                name="expiry"
                className="add-to-catalog-content__form__expiry"
                type="number"
                placeholder="ilość dni"
              />
            </div>
          </div>
        </form>
        <Button>Zapisz</Button>
      </div>
    </>
  );

  return <>{isActive && ReactDOM.createPortal(content, root)}</>;
}

export default AddCatalog;
