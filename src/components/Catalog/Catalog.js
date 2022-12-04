import { useContext, useEffect, useState } from "react";
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
  const [catalogFiltered, setCatalogFiltered] = useState(catalog);
  const [isFormActive, setIsFormActive] = useState(false);
  const [formData, setFormData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFavorites, setIsFavorites] = useState(false);

  function handleClose() {
    dispatchIsVisible({ type: "catalog", mode: "toggle" });
  }

  function handleChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleAddProduct() {
    setFormData(null);
    setIsFormActive(true);
  }

  function handleEditProduct(item) {
    setFormData(item);
    setIsFormActive(true);
  }

  function handleFormClose() {
    setIsFormActive(false);
  }

  function handleFavorites() {
    setIsFavorites(!isFavorites);
  }

  // Filter catalog with search query
  useEffect(() => {
    let filtered = catalog.filter((item) =>
      item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    if (isFavorites) {
      filtered = filtered.filter((item) => item.bookmark);
    }

    setCatalogFiltered(filtered);
  }, [catalog, searchQuery, isFavorites]);

  return (
    <>
      {isFormActive && (
        <AddCatalog
          isActive={isFormActive}
          data={formData}
          onClose={handleFormClose}
        />
      )}

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
              <SearchBar onChange={handleChange} />
            </div>
            <div className={styles["table-wrapper"]}>
              <table className={styles.table}>
                <tbody>
                  <tr>
                    <th>
                      <Button
                        onClick={handleFavorites}
                        round
                        mini
                        fillIcon
                        active={isFavorites}
                      >
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
                  {catalogFiltered.map((item) => (
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
