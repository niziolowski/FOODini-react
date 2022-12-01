import { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { FiX } from "react-icons/fi";
import { TbInfinity } from "react-icons/tb";
import LayoutContext from "../../contexts/layout";
import Button from "../UI/Button";
import styles from "./AddCatalog.module.css";
import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";
import UserDataContext from "../../contexts/user-data";

function AddCatalog() {
  const { setCatalog } = useContext(UserDataContext);

  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const [isExpiry, setIsExpiry] = useState(true);
  const isActive = isVisible.addCatalog;

  const [inputName, setInputName] = useState("");
  const [inputAmount, setInputAmount] = useState(1);
  const [inputGroup, setInputGroup] = useState("świeże");
  const [inputUnit, setInputUnit] = useState("szt.");
  const [inputExpiry, setInputExpiry] = useState(1);
  const [nameIsValid, setNameIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");

  function handleClose(e) {
    dispatchIsVisible({ type: "addCatalog", mode: "toggle" });
  }

  function handleSubmit(e) {
    e.preventDefault();
    validateForm();

    if (formIsValid) {
      const newProduct = {
        id: Math.floor(Math.random() * 9999),
        name: inputName,
        amount: inputAmount,
        group: inputGroup,
        unit: inputUnit,
        expiry: inputExpiry,
        bookmark: false,
      };

      setCatalog((prevState) => [...prevState, newProduct]);
    }
  }

  // This skips useEffect on first render
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (!initialRender) validateForm();
    else setInitialRender(false);
  }, [inputName]);

  function validateForm() {
    if (inputName.length === 0) {
      setInvalidMessage("Wpisz nazwę produktu");
      setNameIsValid(false);
      return setFormIsValid(false);
    }

    setNameIsValid(true);
    setFormIsValid(true);
    setInvalidMessage("");
  }

  function handleBtnExpiry() {
    setIsExpiry(!isExpiry);
  }

  function handleInputName(e) {
    const val = e.target.value.trimStart();
    setInputName(val);
  }

  function handleInputAmount(e) {
    const val = +e.target.value;
    setInputAmount(val);
  }

  function handleInputGroup(e) {
    const val = e.target.value;
    setInputGroup(val);
  }
  function handleInputUnit(e) {
    const val = e.target.value;
    setInputUnit(val);
  }

  function handleInputExpiry(e) {
    const val = +e.target.value;
    setInputExpiry(val);
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
                placeholder="Jajka od Pana Stefana"
                isValid={nameIsValid}
              />

              <ul className="suggestions"></ul>
            </div>
            <div className={styles.col}>
              <label>Grupa</label>
              <Select
                options={["świeże", "suche", "mrożone"]}
                name="group"
                onChange={handleInputGroup}
                value={inputGroup}
              />
            </div>
          </div>
          <div className={styles["row-2"]}>
            <div className={styles.col}>
              <label>Ilość</label>
              <Input
                name="amount"
                type="number"
                value={inputAmount}
                onChange={handleInputAmount}
                autocomplete="off"
                min={0}
                isValid="true"
              />
            </div>
            <div className={styles.col}>
              <label>Jedn.</label>
              <Select
                onChange={handleInputUnit}
                value={inputUnit}
                name="unit"
                options={["szt.", "kg", "ml", "g"]}
              />
            </div>

            <div className={styles.col}>
              <label>Wazność</label>
              <Input
                name="expiry"
                type="number"
                placeholder="ilość dni"
                disabled={!isExpiry}
                value={inputExpiry}
                onChange={handleInputExpiry}
                min={1}
                isValid="true"
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
        <div className={styles.message}>{invalidMessage}</div>
        <Button form="addCatalog" type="submit">
          Zapisz
        </Button>
      </div>
    </>
  );

  return <>{isActive && ReactDOM.createPortal(content, root)}</>;
}

export default AddCatalog;
