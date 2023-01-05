import { useContext } from "react";
import { FiEdit, FiStar, FiTrash } from "react-icons/fi";
import { TbInfinity } from "react-icons/tb";
import IngredientsContext from "../../../contexts/ingredients";
import Button from "../../UI/Button/Button";
import styles from "./CatalogItem.module.css";

function CatalogItem({ item, onEdit }) {
  const { editIngredient, removeIngredient, tags } =
    useContext(IngredientsContext);
  function handleEdit() {
    onEdit(item);
  }

  function handleDelete(e) {
    removeIngredient(item.id);
  }

  function handleBookmark(e) {
    const btn = e.target.closest("button");
    btn.classList.add("pulsate");
    const updatedProduct = { ...item, bookmark: !item.bookmark };

    editIngredient(updatedProduct);
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
