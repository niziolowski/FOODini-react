import styles from "./App.module.css";
import Nav from "./components/Nav/Nav";
import { FiTrash } from "react-icons/fi";

function App() {
  return (
    <div className={styles.app}>
      <div>
        <Nav></Nav>
      </div>
    </div>
  );
}

export default App;
