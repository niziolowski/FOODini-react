import { useContext, useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import { FiInfo, FiX } from "react-icons/fi";
import { TbInfinity } from "react-icons/tb";
import LayoutContext from "../../contexts/layout";
import Button from "../UI/Button";
import styles from "./AddCatalog.module.css";
import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";
import UserDataContext from "../../contexts/user-data";

// Initial form state
const initialState = {
  name: "",
  isNameValid: true,
  tag: 0,
  amount: 1,
  isAmountValid: true,
  unit: "szt.",
  expiry: "",
  isExpiryValid: true,
  isValid: false,
  message: "",
};

const validateForm = (state) => {
  if (state.name.trim().length === 0) {
    return {
      isNameValid: false,
      isValid: false,
      message: "Wpisz nazwę produktu",
    };
  }

  if (+state.amount < 1)
    return {
      isAmountValid: false,
      isValid: false,
      message: "Wpisz poprawną ilość",
    };

  if (+state.expiry < 0 || state.expiry.length === 0)
    return {
      isExpiryValid: false,
      isValid: false,
      message: "Wpisz wazność produktu lub zaznacz opcję '∞'",
    };

  return {
    isValid: true,
  };
};

const validateField = (state, field) => {
  if (field === "name") {
    if (state[field].trim().length === 0)
      return {
        isNameValid: false,
        message: "Wpisz nazwę produktu",
      };
    else return { isNameValid: true, message: "" };
  }

  if (field === "amount") {
    if (+state[field] < 1)
      return {
        isAmountValid: false,
        message: "Wpisz poprawną ilość",
      };
    else return { isAmountValid: true, message: "" };
  }

  if (field === "expiry") {
    if (+state[field] < 0 || state[field].length === 0)
      return {
        isExpiryValid: false,
        message: "Wpisz wazność produktu lub zaznacz opcję '∞'",
      };
    else return { isExpiryValid: true, message: "" };
  }

  return {};
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };

    case "VALIDATE_FIELD":
      const results = validateField(state, action.field);
      return { ...state, ...results };

    case "VALIDATE_FORM":
      const result = validateForm(state);
      return { ...state, ...result };
    case "RESET_FORM":
      return { ...initialState };
    default:
      return state;
  }
};

function AddCatalog() {
  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const isActive = isVisible.addCatalog;
  const { tags, addProduct } = useContext(UserDataContext);
  const [isExpiry, setIsExpiry] = useState(true);
  const [form, dispatchForm] = useReducer(formReducer, initialState);

  // A state that prevents the validation before user action
  const [initialRender, setInitialRender] = useState(true);

  function handleClose(e) {
    setInitialRender(true);
    dispatchIsVisible({ type: "addCatalog", mode: "toggle" });
    dispatchForm({ type: "RESET_FORM" });
  }

  // handle BTN no expiry
  function handleBtnExpiry() {
    // change inputExpiry value
    dispatchForm({
      type: "UPDATE_FIELD",
      field: "expiry",
      value: isExpiry ? 0 : 1,
    });

    // validate inputExpiry
    dispatchForm({
      type: "VALIDATE_FIELD",
      field: "expiry",
      value: form.expiry,
    });

    setIsExpiry(!isExpiry);
  }

  // handle input change
  const handleChange = (e) => {
    // update field
    dispatchForm({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });

    // validate field
    dispatchForm({
      type: "VALIDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  // when user clicks on form, change initialRender state, if already true, validate form
  const handleParentClick = () => {
    setInitialRender(false);
  };

  // function for skipping form validation before user input
  useEffect(() => {
    if (!initialRender) dispatchForm({ type: "VALIDATE_FORM" });
  }, [initialRender, form.isNameValid, form.isAmountValid, form.isExpiryValid]);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatchForm({ type: "VALIDATE_FORM" });

    if (form.isValid) {
      const newProduct = {
        id: Math.floor(Math.random() * 9999),
        name: form.name,
        amount: form.amount,
        group: form.tag,
        unit: form.unit,
        expiry: form.expiry,
        bookmark: false,
      };

      addProduct(newProduct);
    }
  };

  const root = document.getElementById("modal");

  const content = (
    <>
      {!isMobile && <div onClick={handleClose} id="backdrop"></div>}
      <div onClick={handleParentClick} className={styles["add-catalog"]}>
        <header className={styles.header}>
          <h1>szablon produktu</h1>
          <Button onClick={handleClose} round>
            <FiX />
          </Button>
        </header>
        <form onSubmit={handleSubmit} id="addCatalog" className={styles.form}>
          <div className={styles["row-1"]}>
            <div className={styles.col}>
              <label>Produkt</label>
              <Input
                value={form.name}
                onChange={handleChange}
                type="text"
                name="name"
                maxLength={100}
                autocomplete="off"
                placeholder="Jajka od Pana Stefana"
                isValid={form.isNameValid}
                autoFocus
              />

              <ul className="suggestions"></ul>
            </div>
            <div className={styles.col}>
              <label>Grupa</label>
              <Select
                options={tags}
                name="tag"
                onChange={handleChange}
                value={form.tag}
              />
            </div>
          </div>
          <div className={styles["row-2"]}>
            <div className={styles.col}>
              <label>Ilość</label>
              <Input
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                autocomplete="off"
                min={0}
                isValid={form.isAmountValid}
              />
            </div>
            <div className={styles.col}>
              <label>Jedn.</label>
              <Select
                onChange={handleChange}
                value={form.unit}
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
                value={form.expiry}
                onChange={handleChange}
                min={0}
                isValid={form.isExpiryValid}
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
        <div className={styles.message}>
          {form.message.length > 0 && <FiInfo />}
          {form.message}
        </div>
        <Button form="addCatalog" type="submit">
          Zapisz
        </Button>
      </div>
    </>
  );

  return <>{isActive && ReactDOM.createPortal(content, root)}</>;
}

export default AddCatalog;
