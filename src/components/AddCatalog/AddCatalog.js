import { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FiInfo, FiX } from "react-icons/fi";
import { TbInfinity } from "react-icons/tb";
import LayoutContext from "../../contexts/layout";
import Button from "../UI/Button/Button";
import styles from "./AddCatalog.module.css";
import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";
import UserDataContext from "../../contexts/user-data";
import IngredientsContext from "../../contexts/ingredients";
import { useForm } from "react-hook-form";

// data gets passed in and out from other places to quickly create a new template
function AddCatalog({ isActive, isEditing, data, onClose }) {
  const { isMobile } = useContext(LayoutContext);
  const { tagsIng } = useContext(UserDataContext);
  const [isExpiry, setIsExpiry] = useState(true);
  const { tags, addIngredient, editIngredient } =
    useContext(IngredientsContext);

  const [message, setMessage] = useState(null);
  const root = document.getElementById("modal");
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    trigger,
  } = useForm({
    defaultValues: data ? { ...data, tag: tags[data.tag] } : null,
  });

  function onSubmit(form) {
    console.log("submit");
    const tag = tags.indexOf(form.tag);

    // Create new Ingredient object
    const newProduct = {
      id: isEditing ? data?.id : null,
      app_id: isEditing ? data?.app_id : null,
      name: form.name,
      type: "template",
      amount: form.amount,
      unit: form.unit,
      expiry: form.expiry,
      purchase_date: new Date(),
      tag: tag,
      bookmark: form?.bookmark || false,
      created_at: null,
      users_id: null, // ID is added in IngredientsContext
      recipes_id: null,
    };

    if (isEditing) {
      editIngredient(newProduct);
    }
    // Create mode
    if (!isEditing) addIngredient(newProduct);

    // close the form and pass the data
    onClose(newProduct);
  }

  // handle BTN no expiry
  function handleBtnExpiry() {
    setValue("expiry", isExpiry ? 0 : 1);
    trigger("expiry");

    setIsExpiry(!isExpiry);
  }

  useEffect(() => {
    if (errors.name) return setMessage(errors.name.message);

    if (errors.amount?.type === "min")
      return setMessage("Minimalna ilość to 1");
    if (errors.amount?.type === "required")
      return setMessage(errors.amount.message);
    if (errors.amount) return setMessage(errors.amount.message);

    if (errors.expiry?.type === "min")
      return setMessage("Ujemne wartości nie są dozwolone");
    if (errors.expiry?.type === "required")
      return setMessage(errors.expiry.message);

    return setMessage(null);
  }, [errors.name, errors.amount, errors.expiry]);

  const content = (
    <>
      {!isMobile && <div onClick={onClose} id="backdrop"></div>}
      <div className={`${styles["add-catalog"]} ${isMobile && styles.mobile}`}>
        <header className={styles.header}>
          <h1>szablon produktu</h1>
          <Button onClick={onClose} round>
            <FiX />
          </Button>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="addCatalog"
          className={styles.form}
        >
          <div className={styles["row-1"]}>
            <div className={styles.col}>
              <label>Produkt</label>
              <Input
                type="text"
                name="name"
                maxLength={100}
                autoComplete="off"
                placeholder="Jajka od Pana Stefana"
                autoFocus
                {...register("name", {
                  required: "Podaj nazwę produktu",
                })}
                isValid={!errors.name}
              />

              <ul className="suggestions"></ul>
            </div>
            <div className={styles.col}>
              <label>Grupa</label>
              <Select options={tagsIng} name="tag" {...register("tag")} />
            </div>
          </div>
          <div className={styles["row-2"]}>
            <div className={styles.col}>
              <label>Ilość</label>
              <Input
                name="amount"
                type="number"
                min={1}
                autoComplete="off"
                {...register("amount", {
                  required: "Podaj ilość",
                  min: 1,
                })}
                isValid={!errors.amount}
              />
            </div>
            <div className={styles.col}>
              <label>Jedn.</label>
              <Select
                name="unit"
                options={["szt.", "kg", "ml", "g"]}
                {...register("unit")}
              />
            </div>

            <div className={styles.col}>
              <label>Wazność</label>
              <Input
                name="expiry"
                type="number"
                placeholder="ilość dni"
                disabled={!isExpiry}
                min={0}
                {...register("expiry", {
                  required: "Wpisz wazność produktu lub zaznacz opcję '∞'",
                  min: 0,
                })}
                isValid={!errors.expiry}
              />
              <Button
                onClick={handleBtnExpiry}
                className={`${styles["btn-expiry"]}`}
                type="button"
                round
                mini
                primary={!isExpiry}
              >
                <TbInfinity />
              </Button>
            </div>
          </div>
          <div className={styles.message}>
            {message && <FiInfo />}
            {message}
          </div>
        </form>
        <Button form="addCatalog" type="submit" primary>
          Zapisz
        </Button>
      </div>
    </>
  );

  return <>{isActive && ReactDOM.createPortal(content, root)}</>;
}

export default AddCatalog;
