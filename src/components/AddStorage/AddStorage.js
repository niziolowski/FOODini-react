import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { FiInfo, FiX } from "react-icons/fi";
import { TbInfinity } from "react-icons/tb";
import IngredientsContext from "../../contexts/ingredients";
import LayoutContext from "../../contexts/layout";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";
import styles from "./AddStorage.module.css";
import { formatDate } from "../../utils/dates";

function AddStorage({ onClose, data }) {
  const { isMobile } = useContext(LayoutContext);
  const { tags, addIngredient } = useContext(IngredientsContext);
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: data
      ? { ...data, tag: tags[data.tag], date: formatDate(new Date()) }
      : null,
  });
  const [message, setMessage] = useState(null);
  const [isExpiry, setIsExpiry] = useState(true);
  const root = document.getElementById("modal");

  const handleClose = () => {
    onClose();
  };

  function handleBtnExpiry() {
    setValue("expiry", isExpiry ? 0 : 1);
    trigger("expiry");
    setIsExpiry(!isExpiry);
  }

  const onSubmit = (data) => {
    const tag = tags.indexOf(data.tag);
    const newIngredient = {
      id: null,
      app_id: null,
      name: data.name,
      amount: data.amount,
      unit: data.unit,
      type: "storage",
      expiry: data.expiry,
      purchase_date: data.date,
      tag: tag,
      bookmark: false,
    };
    addIngredient(newIngredient);
  };

  useEffect(() => {
    // if (errors.name) return setMessage(errors.name.message);
    if (errors.amount?.type === "required")
      return setMessage(errors.amount.message);
    if (errors.amount?.type === "min")
      return setMessage("Minimalna ilość to 1");

    if (errors.expiry?.type === "min")
      return setMessage("Ujemne wartości nie są dozwolone");
    if (errors.expiry?.type === "required")
      return setMessage(errors.expiry.message);

    if (errors.date) return setMessage(errors.date.message);
    setMessage(null);
  }, [errors.amount, errors.expiry, errors.date]);

  const content = (
    <>
      {!isMobile && <div onClick={handleClose} id="backdrop"></div>}
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Dodaj składnik</h1>
          <Button onClick={handleClose} round>
            <FiX />
          </Button>
        </div>
        <form
          id="add-storage"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <div className={styles.row}>
            <div className={`${styles.field} ${styles.name}`}>
              <label>Produkt</label>
              <Input
                type="text"
                name="name"
                {...register("name", { required: "Podaj nazwę produktu" })}
                disabled
                isValid={!errors.name}
              />
            </div>
            <div className={`${styles.field} ${styles.medium}`}>
              <label>Grupa</label>
              <Select name="tag" options={tags} {...register("tag")} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={`${styles.field} ${styles.small}`}>
              <label>Ilość</label>
              <Input
                type="number"
                name="amount"
                {...register("amount", { required: "Podaj ilość", min: 1 })}
                isValid={!errors.amount}
              />
            </div>
            <div className={`${styles.field} ${styles.small}`}>
              <label>Jedn.</label>
              <Select
                name="unit"
                options={["szt.", "kg", "ml", "g"]}
                {...register("unit")}
              />
            </div>
            <div className={`${styles.field} ${styles.medium}`}>
              <label>Ważność</label>
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
            <div className={`${styles.field} ${styles.medium}`}>
              <label>Data zakupu</label>
              <Input
                type="date"
                name="date"
                {...register("date", { required: "Podaj datę zakupu" })}
                isValid={!errors.date}
              />
            </div>
          </div>
        </form>
        <div className={styles.message}>
          {message && <FiInfo />}
          {message}
        </div>
        <Button
          className={styles.submit}
          type="submit"
          form="add-storage"
          primary
        >
          Dodaj
        </Button>
      </div>
    </>
  );
  return ReactDOM.createPortal(content, root);
}
export default AddStorage;
