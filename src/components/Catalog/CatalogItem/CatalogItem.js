import { useContext } from "react";
import { FiEdit, FiStar, FiTrash } from "react-icons/fi";
import UserDataContext from "../../../contexts/user-data";
import Button from "../../UI/Button";
import styles from "./CatalogItem.module.css";

function CatalogItem({ item, onEdit }) {
  const { tags } = useContext(UserDataContext);

  function handleEdit() {
    onEdit(item);
  }

  return (
    <tr>
      <td>
        <Button round mini>
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
            backgroundColor: `var(--tag-${item.group}-color)`,
          }}
        >
          {tags[item.group]}
        </div>
      </td>
      <td>{item.expiry} dni</td>
      <td>
        <Button onClick={handleEdit} round mini>
          <FiEdit />
        </Button>
      </td>
      <td>
        <Button round mini>
          <FiTrash />
        </Button>
      </td>
    </tr>
  );
}

export default CatalogItem;
