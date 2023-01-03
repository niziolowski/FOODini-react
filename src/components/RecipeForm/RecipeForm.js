import { useContext, useEffect, useState } from "react";
import { FiInfo, FiTrash, FiX } from "react-icons/fi";
import RecipesContext from "../../contexts/recipes";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";
import styles from "./RecipeForm.module.css";
import ReactDOM from "react-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { toBase64 } from "../../utils/helpers";
import { img } from "../../assets/images/recipe-placeholder";

function RecipeForm({ data, onClose }) {
  const { tags } = useContext(RecipesContext);
  const root = document.getElementById("modal");
  const [message, setMessage] = useState("test message");
  const [isEditing] = useState(data ? true : false);
  const { addRecipe, editRecipe } = useContext(RecipesContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: data ? { ...data, tag: tags[data.tag] } : null,
  });

  const {
    fields: ingredientsFields,
    append: ingredientsAppend,
    remove: ingredientsRemove,
  } = useFieldArray({
    name: "ingredients",
    control,
    rules: {
      required: "Dodaj składniki",
    },
  });

  const {
    fields: spicesFields,
    append: spicesAppend,
    remove: spicesRemove,
  } = useFieldArray({
    name: "spices",
    control,
  });

  // Validate form
  useEffect(() => {
    // 1. Title
    if (errors.name) return setMessage(errors.name.message);

    // 2. Ingredients (find first case and display)

    // if ingredients are missing
    if (errors.ingredients?.root)
      return setMessage(errors.ingredients.root.message);

    // if name is missing
    let error = errors?.ingredients?.find((err) => err?.name);
    if (error) return setMessage(error.name.message);

    // if amount is missing
    error = errors?.ingredients?.find((err) => err?.amount);
    if (error) return setMessage(error.amount.message);

    // if amount is too low
    error = errors?.ingredients?.find((err) => err?.amount?.min);
    if (error) return setMessage(error);

    // 3. Spices
    error = errors?.spices?.find((err) => err?.name);
    if (error) return setMessage(error.name.message);

    // 4. Instructions
    if (errors.instructions) return setMessage(errors.instructions.message);

    // 5. No errors
    return setMessage(null);
  }, [
    errors.name,
    errors.ingredients,
    errors.spices,
    errors.instructions,
    errors,
  ]);

  const onSubmit = async (data) => {
    let image = data.image;

    if (typeof data.image === "object") {
      image = await toBase64(data?.image[0]);
    }

    const tag = tags.indexOf(data.tag);
    const newRecipe = {
      name: data.name,
      tag,
      difficulty: data.difficulty,
      ingredients: data.ingredients,
      spices: data.spices,
      instructions: data.instructions,
      image: image || img,
      bookmark: false,
    };

    // Edit existing recipe
    if (isEditing) editRecipe({ ...newRecipe, id: data.id });

    // Create new recipe
    if (!isEditing) addRecipe({ ...newRecipe, id: null });
  };

  const header = (
    <header className={styles.header}>
      <h1>{isEditing ? "Edytuj przepis" : "Stwórz nowy przepis"}</h1>
      <Button onClick={onClose} round>
        <FiX />
      </Button>
    </header>
  );

  const ingredientList = (
    <section className={styles.ingredients}>
      <h2>Składniki</h2>
      {ingredientsFields.map((field, index) => {
        return (
          <div key={field.id} className={styles.row}>
            <Input
              {...register(`ingredients.${index}.name`, {
                required: "Wybierz składnik",
              })}
              placeholder="Nazwa"
              isValid={!errors?.ingredients?.at(index)?.name}
            />

            <Input
              {...register(`ingredients.${index}.amount`, {
                required: "Podaj ilość składnika",
                min: {
                  value: 0.1,
                  message: "Minimalna ilość składnika to 0.1",
                },
              })}
              className={styles["ingredients-amount"]}
              type="number"
              placeholder="Ilość"
              isValid={!errors?.ingredients?.at(index)?.amount}
            />
            <Select
              {...register(`ingredients.${index}.unit`)}
              options={["szt.", "kg", "g", "ml"]}
            />
            <Button
              onClick={() => ingredientsRemove(index)}
              type="button"
              doubleAction
              round
              mini
            >
              <FiTrash />
            </Button>
          </div>
        );
      })}
      <Button
        onClick={() => ingredientsAppend({ name: "", amount: 1, unit: "szt." })}
        type="button"
        primary
        outline
        wide
      >
        Dodaj składnik
      </Button>
    </section>
  );

  const spices = (
    <section>
      <h2>Przyprawy</h2>
      {spicesFields.map((field, index) => {
        return (
          <div key={field.id} className={styles.row}>
            <Input
              {...register(`spices.${index}.name`, {
                required: "Wybierz przyprawę",
              })}
              placeholder="Nazwa"
              isValid={!errors?.spices?.at(index)?.name}
            />
            <Button
              onClick={() => spicesRemove(index)}
              doubleAction
              type="button"
              round
              mini
            >
              <FiTrash />
            </Button>
          </div>
        );
      })}

      <Button
        onClick={() => spicesAppend({ name: "" })}
        type="button"
        primary
        outline
        wide
      >
        Dodaj przyprawę
      </Button>
    </section>
  );

  const form = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="add-recipe"
      className={styles.form}
    >
      <section>
        <div className={styles.field}>
          <label>Tytuł</label>
          <Input
            type="text"
            {...register("name", { required: "Podaj tytuł przepisu" })}
            className={styles.title}
            isValid={!errors.name}
          />
        </div>
      </section>
      <section>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Grupa</label>
            <Select {...register("tag")} options={tags} />
          </div>
          <div className={styles.field}>
            <label>Trudność</label>
            <Select {...register("difficulty")} options={[1, 2, 3, 4, 5]} />
          </div>
          <div className={styles.field}>
            <label>Zdjęcie</label>
            <label
              htmlFor="file-upload"
              className={styles["custom-file-upload"]}
            >
              Prześlij
            </label>
            <input {...register("image")} id="file-upload" type="file" />
          </div>
        </div>
      </section>
      {ingredientList}
      {spices}
      {/* Instructions */}
      <section className={styles.instructions}>
        <h2>Sposób przygotowania</h2>
        <textarea
          className={`${errors.instructions && styles.invalid}`}
          {...register("instructions", {
            required: "Opisz sposób przygotowania",
          })}
        ></textarea>
      </section>
    </form>
  );

  const content = (
    <div className={styles.content}>
      {header}
      {form}
      <div className={styles.message}>
        {message && <FiInfo />}
        {message}
      </div>
      <Button type="submit" form="add-recipe" primary>
        {isEditing ? "Zapisz" : "Stwórz"}
      </Button>
    </div>
  );
  return ReactDOM.createPortal(content, root);
}

export default RecipeForm;
