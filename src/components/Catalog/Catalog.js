import { useContext } from "react";
import { FiEdit, FiPlus, FiStar, FiTrash, FiX } from "react-icons/fi";
import LayoutContext from "../../contexts/layout";
import styles from "./Catalog.module.css";
import Button from "../UI/Button";
import SearchBar from "../UI/SearchBar/SearchBar";

function Catalog() {
  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const isActive = isVisible.catalog;

  function handleClose() {
    dispatchIsVisible({ type: "catalog", mode: "toggle" });
    dispatchIsVisible({ type: "settings", mode: "toggle" });
  }

  return (
    <>
      {isActive && (
        <div className={`${styles.catalog} ${isMobile ? styles.mobile : ""}`}>
          <header className={styles.header}>
            <h1>Katalog składników</h1>
            <Button onClick={handleClose} round>
              <FiX />
            </Button>
          </header>
          <div className={styles.content}>
            <div className={styles.options}>
              <Button round mini>
                <FiPlus />
              </Button>
              <SearchBar />
            </div>
            <div className={styles["table-wrapper"]}>
              <table className={styles.table}>
                <tr>
                  <th>
                    <Button round mini>
                      <FiStar />
                    </Button>
                  </th>
                  <th>Produkt</th>
                  <th>Ilość</th>
                  <th>Jend.</th>
                  <th>Grupa</th>
                  <th>Ważność</th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <td>
                    <Button round mini>
                      <FiStar />
                    </Button>
                  </td>
                  <td>name</td>
                  <td>amount</td>
                  <td>unit</td>
                  <td>
                    <div>group</div>
                  </td>
                  <td>10 dni</td>
                  <td>
                    <Button round mini>
                      <FiEdit />
                    </Button>
                  </td>
                  <td>
                    <Button round mini>
                      <FiTrash />
                    </Button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Catalog;
