import { useContext } from "react";
import { FiEdit, FiStar, FiTrash } from "react-icons/fi";
import { TbInfinity } from "react-icons/tb";
import IngredientsContext from "../../../contexts/ingredients";
import { animate } from "../../../utils/animate";
import Button from "../../UI/Button/Button";
import styles from "./CatalogItem.module.css";

function CatalogItem({ item, onEdit }) {
  const { editIngredient, removeIngredient, tags } =
    useContext(IngredientsContext);
  function handleEdit() {
    onEdit(item);
  }

  async function handleDelete(e) {
    const btn = e.target.closest("button");
    try {
      animate(btn, "pulsate");
      await removeIngredient(item.id);
    } catch (error) {
      animate(btn, "shake");
    }
  }

  async function handleBookmark(e) {
    const btn = e.target.closest("button");
    btn.classList.add("pulsate");
    try {
      animate(btn, "pulsate");
      const updatedProduct = { ...item, bookmark: !item.bookmark };

      await editIngredient(updatedProduct);
    } catch (error) {
      animate(btn, "shake");
    }
  }

  return (
    <tr>
      <td>
        <Button
          onClick={handleBookmark}
          round
          mini
          fillIcon
          active={item.bookmark}
        >
          <FiStar />
        </Button>
      </td>
      <td>{item.name}</td>
      <td>{item.amount}</td>
      <td>{item.unit}</td>
      <td>
        <div
          className={styles.tag}
          style={{
            backgroundColor: `var(--tag-${item.tag}-color)`,
          }}
        >
          {tags[item.tag]}
        </div>
      </td>
      <td>{item.expiry === 0 ? <TbInfinity /> : `${item.expiry} dni`}</td>
      <td>
        <Button onClick={handleEdit} round mini>
          <FiEdit />
        </Button>
      </td>
      <td>
        <Button onClick={handleDelete} doubleAction round mini>
          <FiTrash />
        </Button>
      </td>
    </tr>
  );
}

export default CatalogItem;
