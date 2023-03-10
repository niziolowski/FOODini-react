import { useContext } from "react";
import { FiSearch } from "react-icons/fi";
import LayoutContext from "../../../contexts/layout";
import styles from "./SearchBar.module.css";

function SearchBar({ onChange }) {
  const { isMobile } = useContext(LayoutContext);

  return (
    <div className={`${styles["search-bar"]} ${isMobile ? styles.mobile : ""}`}>
      <input onChange={onChange} type="search" placeholder="Szukaj" />
      <FiSearch />
    </div>
  );
}
export default SearchBar;
