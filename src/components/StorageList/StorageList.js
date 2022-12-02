import { useContext } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./StorageList.module.css";
import StorageItem from "./StorageItem/StorageItem";
import FilterOptions from "../UI/FilterOptions/FilterOptions";

function StorageList() {
  const { isMobile } = useContext(LayoutContext);

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

  return (
    <div
      className={`${styles["storage-list"]} ${isMobile ? styles.mobile : ""}`}
    >
      <FilterOptions />
      {testData.map((item) => (
        <StorageItem key={item.id} item={item}></StorageItem>
      ))}
    </div>
  );
}

export default StorageList;
