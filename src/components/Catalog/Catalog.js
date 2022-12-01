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
  // Product data for editing inside the form
  const [productData, setProductData] = useState(false);
  const isActive = isVisible.catalog;

  function handleClose() {
    dispatchIsVisible({ type: "catalog", mode: "toggle" });
    dispatchIsVisible({ type: "settings", mode: "toggle" });
  }

  function handleAddProduct() {
    setProductData(false);
    dispatchIsVisible({ type: "addCatalog", mode: "toggle" });
  }

  function handleEditProduct(item) {
    console.log(item);
    setProductData(item);
    dispatchIsVisible({ type: "addCatalog", mode: "toggle" });
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
      <AddCatalog data={productData} />
    </>
  );
}

export default Catalog;
