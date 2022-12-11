import { useContext, useState } from "react";
import LayoutContext from "../../contexts/layout";
import styles from "./RecipeView.module.css";
import ReactDOM from "react-dom";
import RecipeForm from "./RecipeForm/RecipeForm";
import RecipePreview from "./RecipePreview/RecipePreview";
import UserDataContext from "../../contexts/user-data";

function RecipeView() {
  const { isMobile } = useContext(LayoutContext);
  const [isEditing, setIsEditing] = useState(false);

  const { recipes } = useContext(UserDataContext);
  const data = recipes[0];
  const onToggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const root = document.getElementById("modal");
  const content = (
    <>
      {!isMobile && <div id="backdrop"></div>}
      <div className={`${styles.content} ${isMobile && styles.mobile}`}>
        <div className={styles.grid}>
          {isEditing ? (
            <RecipeForm data={data} onToggleEdit={onToggleEdit} />
          ) : (
            <RecipePreview data={data} onToggleEdit={onToggleEdit} />
          )}
        </div>
      </div>
    </>
  );
  return <>{ReactDOM.createPortal(content, root)}</>;
}

export default RecipeView;
