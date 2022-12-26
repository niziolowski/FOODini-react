import { useContext, useState } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./StorageList.module.css";
import StorageItem from "./StorageItem/StorageItem";
import FilterOptions from "../UI/FilterOptions/FilterOptions";
import Spotlight from "../Spotlight/Spotlight";
import UserDataContext from "../../contexts/user-data";
import AddCatalog from "../AddCatalog/AddCatalog";
import IngredientsContext from "../../contexts/ingredients";

function StorageList() {
  const { isMobile } = useContext(LayoutContext);
  const { ingredients, addIngredient, getIngredientById } =
    useContext(IngredientsContext);
  const [isSpotlight, setIsSpotlight] = useState(false);
  const [isAddCatalog, setIsAddCatalog] = useState(false);
  const [addCatalogData, setAddCatalogData] = useState({});

  // Filter out storage ingredients
  const filteredIngredients = ingredients.filter(
    (ing) => ing.type === "storage"
  );

  // Filter out template ingredients
  const filteredTemplates = ingredients.filter(
    (ing) => ing.type === "template"
  );

  const toggleSpotlight = () => {
    setIsSpotlight(!isSpotlight);
  };

  const handleFormAddCatalog = (query) => {
    console.log(query);
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
      id: null,
      app_id: null,
      type: "storage",
    };

    console.log(newIngredient);
  };

  return (
    <div
      className={`${styles["storage-list"]} ${isMobile ? styles.mobile : ""}`}
    >
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
      <FilterOptions onAddItem={toggleSpotlight} />
      <ul className={styles.list}>
        {filteredIngredients.map((item) => (
          <StorageItem key={item.id} item={item}></StorageItem>
        ))}
      </ul>
    </div>
  );
}

export default StorageList;
