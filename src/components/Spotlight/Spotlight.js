import { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { FiEdit, FiSearch } from "react-icons/fi";
import LayoutContext from "../../contexts/layout";
import StorageItem from "../StorageList/StorageItem/StorageItem";

import styles from "./Spotlight.module.css";

function Spotlight({ data, onClose }) {
  const { isMobile } = useContext(LayoutContext);
  const root = document.getElementById("modal");

  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (e) => {
    const query = e.target.value;
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().startsWith(query.toLowerCase())
    );

    setFilteredData(query.length === 0 ? [] : filteredData);
  };

  const suggestions = (
    <ul className={styles["suggestion-list"]}>
      {filteredData.map((item) => (
        <StorageItem key={item.id} item={item} />
      ))}
      <li>
        Stwórz nowy produkt <FiEdit />
      </li>
    </ul>
  );
  const content = (
    <>
      {!isMobile && <div onClick={onClose} id="backdrop"></div>}
      <div className={`${styles.spotlight} ${isMobile ? styles.mobile : ""}`}>
        <div className={styles["search-bar"]}>
          <FiSearch />
          <input onChange={handleChange} autoFocus></input>
        </div>
        {filteredData.length > 0 && suggestions}
      </div>
    </>
  );

  return ReactDOM.createPortal(content, root);
}

export default Spotlight;
