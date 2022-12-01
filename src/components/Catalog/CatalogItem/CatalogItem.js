import { FiEdit, FiStar, FiTrash } from "react-icons/fi";
import Button from "../../UI/Button";

function CatalogItem({ item, onEdit }) {
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
        <div>{item.group}</div>
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
