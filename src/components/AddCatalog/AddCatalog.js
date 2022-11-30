import { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { FiX } from "react-icons/fi";
import { TbInfinity } from "react-icons/tb";
import LayoutContext from "../../contexts/layout";
import Button from "../UI/Button";
import styles from "./AddCatalog.module.css";
import Input from "../UI/Input/Input";

function AddCatalog() {
  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const [isExpiry, setIsExpiry] = useState(true);
  const isActive = isVisible.addCatalog;

  const [inputName, setInputName] = useState("");

  function handleClose() {
    dispatchIsVisible({ type: "addCatalog", mode: "toggle" });
  }

  function handleSubmit(e) {}

  function handleBtnExpiry() {
    setIsExpiry(!isExpiry);
  }

  function handleInputName(e) {
    const val = e.target.value.trimStart();
    setInputName(val);
    //!THIS IS WHERE YOU LEFT OF WORK ON INPUT CONTROLLER
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
        <form id="addCatalog" onSubmit={handleSubmit} className={styles.form}>
          <div className={styles["row-1"]}>
            <div className={styles.col}>
              <label>Produkt</label>
              <Input
                value={inputName}
                onChange={handleInputName}
                type="text"
                name="name"
                maxLength={100}
                autocomplete="off"
              />

              <ul className="suggestions"></ul>
            </div>
            <div className={styles.col}>
              <label>Grupa</label>
              <select name="group">
                <option>świeże</option>
                <option>suche</option>
                <option>mrożone</option>
              </select>
            </div>
          </div>
          <div className={styles["row-2"]}>
            <div className={styles.col}>
              <label>Ilość</label>
              <Input name="amount" type="number" autocomplete="off" min={0} />
            </div>
            <div className={styles.col}>
              <label>Jedn.</label>
              <select name="unit">
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
                type="number"
                placeholder="ilość dni"
                disabled={!isExpiry}
              />
              <Button
                onClick={handleBtnExpiry}
                className={`${styles["btn-expiry"]}`}
                type="button"
                round
                mini
                warning={!isExpiry}
              >
                <TbInfinity />
              </Button>
            </div>
          </div>
        </form>
        <Button form="addCatalog" type="submit">
          Zapisz
        </Button>
      </div>
    </>
  );

  return <>{isActive && ReactDOM.createPortal(content, root)}</>;
}

export default AddCatalog;
