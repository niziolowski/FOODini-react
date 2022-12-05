import { useContext, useState } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./StorageList.module.css";
import StorageItem from "./StorageItem/StorageItem";
import FilterOptions from "../UI/FilterOptions/FilterOptions";
import Spotlight from "../Spotlight/Spotlight";
import UserDataContext from "../../contexts/user-data";

function StorageList() {
  const { isMobile } = useContext(LayoutContext);
  const { catalog } = useContext(UserDataContext);
  const [isSpotlight, setIsSpotlight] = useState(false);
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
  ];

  const toggleSpotlight = () => {
    setIsSpotlight(!isSpotlight);
  };

  const handleAddItem = () => {
    console.log("add item");
  };

  return (
    <div
      className={`${styles["storage-list"]} ${isMobile ? styles.mobile : ""}`}
    >
      {isSpotlight && <Spotlight onClose={toggleSpotlight} data={catalog} />}
      <FilterOptions onAddItem={toggleSpotlight} />
      {testData.map((item) => (
        <StorageItem key={item.id} item={item}></StorageItem>
      ))}
    </div>
  );
}

export default StorageList;
