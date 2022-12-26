import { useContext, useEffect, useState } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./StorageList.module.css";
import StorageItem from "./StorageItem/StorageItem";
import FilterOptions from "../UI/FilterOptions/FilterOptions";
import Spotlight from "../Spotlight/Spotlight";
import AddCatalog from "../AddCatalog/AddCatalog";
import IngredientsContext from "../../contexts/ingredients";
import AddStorage from "../AddStorage/AddStorage";
import { calcDaysToExpiry } from "../../utils/dates";

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
  const [filters, setFilters] = useState({});
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

  const handleFilterChange = (data) => {
    setFilters(data);
  };

  // Filter storage
  useEffect(() => {
    let results = [...storage];

    // filter favorites
    if (filters?.favorites)
      results = results.filter((ing) => ing.bookmark === true);

    // filter query
    if (filters?.query?.length > 0) {
      results = results.filter((ing) =>
        ing.name.toLowerCase().includes(filters.query.toLowerCase())
      );
    }

    // Sort storage

    // By expiry date
    if (filters?.sorting === "ważność")
      results = results.sort((a, b) => {
        // Calculate days until the ingredient expires
        const aExpiry = calcDaysToExpiry(a.purchase_date, a.expiry);
        const bExpiry = calcDaysToExpiry(b.purchase_date, b.expiry);

        return aExpiry - bExpiry;
      });

    // By name
    if (filters?.sorting === "nazwa") {
      results = results.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }

    setFilteredStorage(results);
  }, [storage, filters]);

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
