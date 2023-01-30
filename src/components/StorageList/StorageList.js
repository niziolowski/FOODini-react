import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./StorageList.module.css";
import StorageItem from "./StorageItem/StorageItem";
import FilterOptions from "../UI/FilterOptions/FilterOptions";
import Spotlight from "../Spotlight/Spotlight";
import AddCatalog from "../AddCatalog/AddCatalog";
import IngredientsContext from "../../contexts/ingredients";
import AddStorage from "../AddStorage/AddStorage";
import PlanContext from "../../contexts/PlanContext";

function StorageList() {
  const { isMobile } = useContext(LayoutContext);
  const { ingredients, addIngredient, getIngredientById } =
    useContext(IngredientsContext);
  const { recalculatePlan } = useContext(PlanContext);
  const [isSpotlight, setIsSpotlight] = useState(false);
  // Templates catalog form state
  const [isCatalogForm, setIsCatalogForm] = useState(false);
  const [catalogFormData, setCatalogFormData] = useState({});
  // Storage form state
  const [isStorageForm, setIsStorageForm] = useState(false);
  const [storageFormData, setStorageFormData] = useState(null);
  // Storage data (ingredients of type 'storage')
  const [storage, setStorage] = useState([]);
  const [filteredStorage, setFilteredStorage] = useState(storage);

  // Filter out template ingredients
  const filteredTemplates = useMemo(() => {
    return ingredients.filter((ing) => ing.type === "template");
  }, [ingredients]);

  // Toggle suggestion bar
  const toggleSpotlight = () => {
    setIsSpotlight(!isSpotlight);
  };

  // Show form to add new template to catalog
  const handleCreateTemplate = (query) => {
    const data = { name: query };
    setIsSpotlight(false);
    setIsCatalogForm(true);
    setCatalogFormData(data);
  };

  // On form submit, automatically add new ingredient to storage
  //? Maybe first pass data to storage form for purchase_date edit?
  const handleCreateTemplateSubmit = async (template) => {
    // Cancel window
    if (!template) return setIsCatalogForm(false);

    // Add template
    try {
      if (template) {
        const newIngredient = {
          ...template,
          id: null,
          app_id: null,
          type: "storage",
          created_at: null,
          recipes_id: null,
        };
        // Add to storage
        const updatedIngredients = await addIngredient(newIngredient);
        const updatedStorage = updatedIngredients.filter(
          (ing) => ing.type === "storage"
        );

        recalculatePlan(null, updatedStorage);

        // Hide the form
        setIsCatalogForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fill storage form with suggestion data
  const handleSuggestionClick = (id) => {
    const product = getIngredientById(id);

    const newIngredient = {
      ...product,
    };

    setIsSpotlight(false);
    setIsStorageForm(true);
    setStorageFormData({ isEditing: false, data: newIngredient });
  };

  // Close storage form
  const handleStorageFormClose = () => {
    setIsStorageForm(false);
  };

  // Fill storage form with clicked item data
  const handleEditIngredient = (ingredient) => {
    setStorageFormData({ isEditing: true, data: ingredient });
    setIsStorageForm(true);
  };

  // Update filteredStorage on filter options change
  const handleFilterChange = useCallback((data) => {
    setFilteredStorage(data);
  }, []);

  // Update storage on ingredients change
  useEffect(() => {
    setStorage(ingredients.filter((ing) => ing.type === "storage"));
  }, [ingredients]);

  return (
    <div
      className={`${styles["storage-list"]} ${isMobile ? styles.mobile : ""}`}
    >
      {isStorageForm && (
        <AddStorage onClose={handleStorageFormClose} data={storageFormData} />
      )}
      {isSpotlight && (
        <Spotlight
          onClose={toggleSpotlight}
          onAddNew={handleCreateTemplate}
          onSuggestionClick={handleSuggestionClick}
          data={filteredTemplates}
        />
      )}

      {isCatalogForm && (
        <AddCatalog
          isActive={isCatalogForm}
          isEditing={false}
          data={catalogFormData}
          onClose={handleCreateTemplateSubmit}
        />
      )}
      <FilterOptions
        onAddItem={toggleSpotlight}
        onFilterChange={handleFilterChange}
        options={["ważność", "nazwa"]}
        data={storage}
      />
      <ul className={styles.list}>
        {filteredStorage.map((item) => (
          <StorageItem
            key={item.id}
            item={item}
            onEdit={handleEditIngredient}
          ></StorageItem>
        ))}
      </ul>
    </div>
  );
}

export default StorageList;
