import { useContext, useState, useReducer } from "react";
import ReactDOM from "react-dom";
import { FiX } from "react-icons/fi";
import { TbInfinity } from "react-icons/tb";
import LayoutContext from "../../contexts/layout";
import Button from "../UI/Button";
import styles from "./AddCatalog.module.css";
import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";
import UserDataContext from "../../contexts/user-data";

const validateForm = (state) => {
  if (state.name.trim().length === 0) {
    return {
      isNameValid: false,
      isFormValid: false,
      message: "Wpisz nazwę produktu",
    };
  }

  if (+state.amount < 1)
    return {
      isAmountValid: false,
      isFormValid: false,
      message: "Wpisz poprawną ilość",
    };
  if (+state.expiry < 0 || state.expiry.length === 0)
    return {
      isExpiryValid: false,
      isFormValid: false,
      message: "Wpisz wazność produktu lub zaznacz opcję '∞'",
    };

  return {
    isFormValid: true,
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

    case "SUBMIT_FORM":
      const result = validateForm(state);
      return { ...state, ...result };

    default:
      return state;
  }
};

function AddCatalog() {
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
    isFormValid: true,
    message: "",
  };

  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const { catalog, setCatalog, tags } = useContext(UserDataContext);
  const [isExpiry, setIsExpiry] = useState(true);
  const isActive = isVisible.addCatalog;
  const [form, dispatchForm] = useReducer(formReducer, initialState);

  // const { payload, setPayload } = useContext(AddCatalogContext);

  // toggle no expiry date
  function handleBtnExpiry() {
    dispatchForm({
      type: "UPDATE_FIELD",
      field: "expiry",
      value: isExpiry ? 0 : 1,
    });

    dispatchForm({
      type: "VALIDATE_FIELD",
      field: "expiry",
      value: form.expiry,
    });

    setIsExpiry(!isExpiry);
  }

  // handle input change
  const handleChange = (e) => {
    dispatchForm({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });

    dispatchForm({
      type: "VALIDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchForm({
      type: "SUBMIT_FORM",
    });
  };

  // const [inputName, setInputName] = useState("");
  // const [inputAmount, setInputAmount] = useState(1);
  // const [inputGroup, setInputGroup] = useState(tags[0]);
  // const [inputUnit, setInputUnit] = useState("szt.");
  // const [inputExpiry, setInputExpiry] = useState(1);
  // const [nameIsValid, setNameIsValid] = useState(true);
  // const [formIsValid, setFormIsValid] = useState(false);
  // const [invalidMessage, setInvalidMessage] = useState("");

  // function handleClose(e) {
  //   dispatchIsVisible({ type: "addCatalog", mode: "toggle" });

  //   setInputName("");
  //   setInputAmount(1);
  //   setInputGroup(tags[0]);
  //   setInputUnit("szt.");
  //   setInputExpiry(1);
  //   setInvalidMessage("");
  //   setNameIsValid(true);
  //   setInitialRender(true);
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const isValid = validateForm();

  //   if (isValid) {
  //     console.log(inputGroup);
  //     const newProduct = {
  //       id: payload?.id || Math.floor(Math.random() * 9999),
  //       name: inputName,
  //       amount: inputAmount,
  //       group: +tags.indexOf(inputGroup),
  //       unit: inputUnit,
  //       expiry: inputExpiry,
  //       bookmark: false,
  //     };
  //     console.log(newProduct);

  //     // Check if Editing
  //     if (payload) {
  //       const catalogUpdated = catalog.map((item) => {
  //         if (item.id === payload.id) return newProduct;
  //         else return item;
  //       });
  //       setCatalog([...catalogUpdated]);
  //     }

  //     if (!payload) {
  //       setCatalog((current) => [...current, newProduct]);
  //     }
  //     setInputName("");
  //     setNameIsValid(true);
  //     setInitialRender(true);
  //   }
  // }

  // const validateForm = useCallback(() => {
  //   console.log("validation");
  //   if (inputName.length === 0) {
  //     setInvalidMessage("Wpisz nazwę produktu");
  //     setNameIsValid(false);
  //     setFormIsValid(false);
  //     return false;
  //   }

  //   setNameIsValid(true);
  //   setFormIsValid(true);
  //   setInvalidMessage("");
  //   return true;
  // }, [inputName.length]);

  // // This skips useEffect on first render
  // const [initialRender, setInitialRender] = useState(true);

  // // Validate the form on input change
  // useEffect(() => {
  //   if (!initialRender) validateForm();
  //   else setInitialRender(false);
  // }, [inputName, initialRender, validateForm]);

  // // On render update the form using props.data or use default values
  // useEffect(() => {
  //   setInputName(payload?.name || "");
  //   setInputAmount(payload?.amount || 1);
  //   setInputGroup(payload?.group || tags[0]);
  //   setInputUnit(payload?.unit || "szt.");
  //   setInputExpiry(payload?.expiry || 1);
  //   setInitialRender(true);
  // }, [payload, tags]);

  // function handleInputName(e) {
  //   const val = e.target.value.trimStart();
  //   setInputName(val);
  // }

  // function handleInputAmount(e) {
  //   const val = +e.target.value;

  //   setInputAmount(val === 0 ? "" : val);
  // }

  // function handleInputGroup(e) {
  //   const val = e.target.value;
  //   setInputGroup(val);
  // }
  // function handleInputUnit(e) {
  //   const val = e.target.value;
  //   setInputUnit(val);
  // }

  // function handleInputExpiry(e) {
  //   const val = +e.target.value;
  //   setInputExpiry(val);
  // }

  const root = document.getElementById("modal");

  const content = (
    <>
      {!isMobile && <div id="backdrop"></div>}
      <div className={styles["add-catalog"]}>
        <header className={styles.header}>
          <h1>szablon produktu</h1>
          <Button round>
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
                min={1}
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
        <div className={styles.message}>{form.message}</div>
        <Button form="addCatalog" type="submit">
          Zapisz
        </Button>
      </div>
    </>
  );

  return <>{isActive && ReactDOM.createPortal(content, root)}</>;
}

export default AddCatalog;
