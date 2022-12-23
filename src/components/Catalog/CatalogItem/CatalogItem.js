import { useContext } from "react";
import { FiEdit, FiStar, FiTrash } from "react-icons/fi";
import { TbInfinity } from "react-icons/tb";
import UserDataContext from "../../../contexts/user-data";
import Button from "../../UI/Button/Button";
import styles from "./CatalogItem.module.css";

function CatalogItem({ item, onEdit }) {
  const { tagsIng, deleteProduct, editProduct } = useContext(UserDataContext);
  function handleEdit() {
    onEdit(item);
  }

  function handleDelete(e) {
    deleteProduct(item.id);
  }

  function handleBookmark() {
    const updatedProduct = { ...item, bookmark: !item.bookmark };

    editProduct(updatedProduct);
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
          {tagsIng[item.tag]}
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
