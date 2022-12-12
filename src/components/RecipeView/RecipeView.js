import { useContext, useState } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./RecipeView.module.css";
import ReactDOM from "react-dom";
import RecipeForm from "./RecipeForm/RecipeForm";
import RecipePreview from "./RecipePreview/RecipePreview";

function RecipeView({ data, onClose }) {
  const { isMobile } = useContext(LayoutContext);

  const [isEditing, setIsEditing] = useState(false);

  const onToggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const handleClose = () => {
    onClose();
  };

  const root = document.getElementById("modal");
  const content = (
    <>
      {!isMobile && <div onClick={handleClose} id="backdrop"></div>}
      <div className={`${styles.content} ${isMobile && styles.mobile}`}>
        <div className={styles.grid}>
          {isEditing ? (
            <RecipeForm data={data} onToggleEdit={onToggleEdit} />
          ) : (
            <RecipePreview
              data={data}
              onToggleEdit={onToggleEdit}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </>
  );
  return <>{ReactDOM.createPortal(content, root)}</>;
}

export default RecipeView;
