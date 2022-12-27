import { useCallback, useContext, useEffect, useState } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./StorageList.module.css";
import StorageItem from "./StorageItem/StorageItem";
import FilterOptions from "../UI/FilterOptions/FilterOptions";
import Spotlight from "../Spotlight/Spotlight";
import AddCatalog from "../AddCatalog/AddCatalog";
import IngredientsContext from "../../contexts/ingredients";
import AddStorage from "../AddStorage/AddStorage";

function StorageList() {
  const { isMobile } = useContext(LayoutContext);
  const { ingredients, addIngredient, getIngredientById } =
    useContext(IngredientsContext);
  const [isSpotlight, setIsSpotlight] = useState(false);
  const [isAddCatalog, setIsAddCatalog] = useState(false);
  const [isAddStorage, setIsAddStorage] = useState(false);
  const [addCatalogData, setAddCatalogData] = useState({});
  const [addStorageData, setAddStorageData] = useState(null);
  const [storage, setStorage] = useState([]);
  const [filteredStorage, setFilteredStorage] = useState(storage);

  // Filter out template ingredients
  const filteredTemplates = ingredients.filter(
    (ing) => ing.type === "template"
  );

  const toggleSpotlight = () => {
    setIsSpotlight(!isSpotlight);
  };

  const handleFormAddCatalog = (query) => {
    const data = { name: query };
    setIsSpotlight(false);
    setIsAddCatalog(true);
    setAddCatalogData(data);
  };

  const onFormAddCatalogSubmit = (newProduct) => {
    if (newProduct) {
      const newIngredient = {
        ...newProduct,
        id: null,
        app_id: null,
        type: "storage",
        created_at: null,
        recipes_id: null,
      };
      // Add to storage
      addIngredient(newIngredient);
    }
    setIsAddCatalog(false);
  };

  const handleSuggestionClick = (id) => {
    const product = getIngredientById(id);

    const newIngredient = {
      ...product,
    };

    setIsSpotlight(false);
    setIsAddStorage(true);
    setAddStorageData(newIngredient);
  };

  const handleAddStorageClose = () => {
    setIsAddStorage(false);
  };

  const handleFilterChange = useCallback((data) => {
    setFilteredStorage(data);
  }, []);

  // Update storage when ingredients change
  useEffect(() => {
    setStorage(ingredients.filter((ing) => ing.type === "storage"));
  }, [ingredients]);

  return (
    <div
      className={`${styles["storage-list"]} ${isMobile ? styles.mobile : ""}`}
    >
      {isAddStorage && (
        <AddStorage onClose={handleAddStorageClose} data={addStorageData} />
      )}
      {isSpotlight && (
        <Spotlight
          onClose={toggleSpotlight}
          onAddNew={handleFormAddCatalog}
          onSuggestionClick={handleSuggestionClick}
          data={filteredTemplates}
        />
      )}

      {isAddCatalog && (
        <AddCatalog
          isActive={isAddCatalog}
          isEditing={false}
          data={addCatalogData}
          onClose={onFormAddCatalogSubmit}
        />
      )}
      {}
      <FilterOptions
        onAddItem={toggleSpotlight}
        onFilterChange={handleFilterChange}
        options={["ważność", "nazwa"]}
        data={storage}
      />
      <ul className={styles.list}>
        {filteredStorage.map((item) => (
          <StorageItem key={item.id} item={item}></StorageItem>
        ))}
      </ul>
    </div>
  );
}

export default StorageList;
