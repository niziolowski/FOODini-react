import { useContext, useState } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./StorageList.module.css";
import StorageItem from "./StorageItem/StorageItem";
import FilterOptions from "../UI/FilterOptions/FilterOptions";
import Spotlight from "../Spotlight/Spotlight";
import UserDataContext from "../../contexts/user-data";
import AddCatalog from "../AddCatalog/AddCatalog";

function StorageList() {
  const { isMobile } = useContext(LayoutContext);
  const { catalog, getProductByID } = useContext(UserDataContext);
  const [isSpotlight, setIsSpotlight] = useState(false);
  const [isAddCatalog, setIsAddCatalog] = useState(false);
  const [addCatalogData, setAddCatalogData] = useState({});
  const testData = [
    {
      id: Math.floor(Math.random() * 9999),
      name: "Jajka",
      amount: 10,
      group: 1,
      unit: "szt.",
      expiry: 10,
      bookmark: false,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Makaron",
      amount: 10,
      group: 2,
      unit: "szt.",
      expiry: Infinity,
      bookmark: true,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Jajka",
      amount: 10,
      group: 1,
      unit: "szt.",
      expiry: 10,
      bookmark: false,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Makaron",
      amount: 10,
      group: 2,
      unit: "szt.",
      expiry: Infinity,
      bookmark: true,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Jajka",
      amount: 10,
      group: 1,
      unit: "szt.",
      expiry: 10,
      bookmark: false,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Makaron",
      amount: 10,
      group: 2,
      unit: "szt.",
      expiry: Infinity,
      bookmark: true,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Jajka",
      amount: 10,
      group: 1,
      unit: "szt.",
      expiry: 10,
      bookmark: false,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Makaron",
      amount: 10,
      group: 2,
      unit: "szt.",
      expiry: Infinity,
      bookmark: true,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Jajka",
      amount: 10,
      group: 1,
      unit: "szt.",
      expiry: 10,
      bookmark: false,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Makaron",
      amount: 10,
      group: 2,
      unit: "szt.",
      expiry: Infinity,
      bookmark: true,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Jajka",
      amount: 10,
      group: 1,
      unit: "szt.",
      expiry: 10,
      bookmark: false,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Makaron",
      amount: 10,
      group: 2,
      unit: "szt.",
      expiry: Infinity,
      bookmark: true,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Jajka",
      amount: 10,
      group: 1,
      unit: "szt.",
      expiry: 10,
      bookmark: false,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Makaron",
      amount: 10,
      group: 2,
      unit: "szt.",
      expiry: Infinity,
      bookmark: true,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Jajka",
      amount: 10,
      group: 1,
      unit: "szt.",
      expiry: 10,
      bookmark: false,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Makaron",
      amount: 10,
      group: 2,
      unit: "szt.",
      expiry: Infinity,
      bookmark: true,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Jajka",
      amount: 10,
      group: 1,
      unit: "szt.",
      expiry: 10,
      bookmark: false,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Makaron",
      amount: 10,
      group: 2,
      unit: "szt.",
      expiry: Infinity,
      bookmark: true,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Jajka",
      amount: 10,
      group: 1,
      unit: "szt.",
      expiry: 10,
      bookmark: false,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Makaron",
      amount: 10,
      group: 2,
      unit: "szt.",
      expiry: Infinity,
      bookmark: true,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Jajka",
      amount: 10,
      group: 1,
      unit: "szt.",
      expiry: 10,
      bookmark: false,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Makaron",
      amount: 10,
      group: 2,
      unit: "szt.",
      expiry: Infinity,
      bookmark: true,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Jajka",
      amount: 10,
      group: 1,
      unit: "szt.",
      expiry: 10,
      bookmark: false,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Makaron",
      amount: 10,
      group: 2,
      unit: "szt.",
      expiry: Infinity,
      bookmark: true,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Jajka",
      amount: 10,
      group: 1,
      unit: "szt.",
      expiry: 10,
      bookmark: false,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Makaron",
      amount: 10,
      group: 2,
      unit: "szt.",
      expiry: Infinity,
      bookmark: true,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Jajka",
      amount: 10,
      group: 1,
      unit: "szt.",
      expiry: 10,
      bookmark: false,
    },
    {
      id: Math.floor(Math.random() * 9999),
      name: "Makaron",
      amount: 10,
      group: 2,
      unit: "szt.",
      expiry: Infinity,
      bookmark: true,
    },
  ];

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
        {testData.map((item) => (
          <StorageItem key={item.id} item={item}></StorageItem>
        ))}
      </ul>
    </div>
  );
}

export default StorageList;
