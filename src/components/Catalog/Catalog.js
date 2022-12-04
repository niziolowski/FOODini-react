import { useContext, useState } from "react";
import { FiPlus, FiStar, FiX } from "react-icons/fi";
import LayoutContext from "../../contexts/layout";
import styles from "./Catalog.module.css";
import Button from "../UI/Button";
import SearchBar from "../UI/SearchBar/SearchBar";
import CatalogItem from "./CatalogItem/CatalogItem";
import UserDataContext from "../../contexts/user-data";
import AddCatalog from "../AddCatalog/AddCatalog";

function Catalog() {
  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const { catalog } = useContext(UserDataContext);
  const isActive = isVisible.catalog;
  const [isFormActive, setIsFormActive] = useState(false);
  const [formData, setFormData] = useState(null);

  function handleClose() {
    dispatchIsVisible({ type: "catalog", mode: "toggle" });
  }

  function handleAddProduct() {
    setIsFormActive(true);
    setFormData(null);
  }

  function handleEditProduct(item) {
    setFormData(item);
    setIsFormActive(true);
  }

  function handleFormClose() {
    setIsFormActive(false);
    setFormData(null);
  }

  return (
    <>
      <AddCatalog
        isActive={isFormActive}
        data={formData}
        onClose={handleFormClose}
      />

      {isActive && (
        <div className={`${styles.catalog} ${isMobile ? styles.mobile : ""}`}>
          <header className={styles.header}>
            <h1>Katalog produktów</h1>
            <Button onClick={handleClose} round>
              <FiX />
            </Button>
          </header>
          <div className={styles.content}>
            <div className={styles.options}>
              <Button onClick={handleAddProduct} round mini>
                <FiPlus />
              </Button>
              <SearchBar />
            </div>
            <div className={styles["table-wrapper"]}>
              <table className={styles.table}>
                <tbody>
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
                  {catalog.map((item) => (
                    <CatalogItem
                      onEdit={handleEditProduct}
                      key={item.id}
                      item={item}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Catalog;
