import { FiEdit } from "react-icons/fi";
import Button from "../../UI/Button/Button";
import { useContext, useReducer } from "react";
import Input from "../../UI/Input/Input";
import styles from "../RecipeView.module.css";
import UserDataContext from "../../../contexts/user-data";

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };

    default:
      return { ...state };
  }
};

function RecipeForm({ data, onToggleEdit }) {
  const [form, dispatchForm] = useReducer(formReducer, data);
  const { editRecipe } = useContext(UserDataContext);

  const handleChange = (e) => {
    dispatchForm({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = () => {
    // update item
    const newRecipe = {
      id: 123,
      title: form.title,
    };

    editRecipe(newRecipe);

    // toggle edit

    onToggleEdit();
  };
  return (
    <>
      <Button onClick={handleSubmit} round>
        <FiEdit />
      </Button>
      <Input
        name="title"
        onChange={handleChange}
        className={styles.title}
        value={form.title}
      />
    </>
  );
}

export default RecipeForm;
