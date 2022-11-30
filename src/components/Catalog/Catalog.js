import { useContext } from "react";
import { FiPlus, FiStar, FiX } from "react-icons/fi";
import LayoutContext from "../../contexts/layout";
import styles from "./Catalog.module.css";
import Button from "../UI/Button";
import SearchBar from "../UI/SearchBar/SearchBar";
import CatalogItem from "./CatalogItem/CatalogItem";

function Catalog() {
  const { isMobile, isVisible, dispatchIsVisible } = useContext(LayoutContext);
  const isActive = isVisible.catalog;

  function handleClose() {
    dispatchIsVisible({ type: "catalog", mode: "toggle" });
    dispatchIsVisible({ type: "settings", mode: "toggle" });
  }

  function handleAddProduct() {
    dispatchIsVisible({ type: "addCatalog", mode: "toggle" });
  }

  const testData = [
    {
      id: 415567,
      name: "drożdze",
      unit: "g",
      group: "suche",
      amount: "1000",
      expiry: "1000",
      bookmark: false,
    },
  ];

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
                  {testData.map((item) => (
                    <CatalogItem key={item.id} item={item} />
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
