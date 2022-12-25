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
  const { ingredients } = useContext(IngredientsContext);
  const { catalog, getProductByID } = useContext(UserDataContext);
  const [isSpotlight, setIsSpotlight] = useState(false);
  const [isAddCatalog, setIsAddCatalog] = useState(false);
  const [addCatalogData, setAddCatalogData] = useState({});

  // Filter out storage ingredients
  const filteredIngredients = ingredients.filter(
    (ing) => ing.type === "storage"
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
      // Add to storage
    }
    setIsAddCatalog(false);
  };

  const handleSuggestionClick = (id) => {
    console.log(id);
    const product = getProductByID(id);
    console.log(product);
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
          data={catalog}
        />
      )}

      {isAddCatalog && (
        <AddCatalog
          isActive={isAddCatalog}
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
