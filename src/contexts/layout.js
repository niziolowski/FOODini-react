import { createContext, useState, useEffect, useReducer } from "react";

const LayoutContext = createContext();

const visibilityInitialState = {
  shoppingList: false,
  settings: false,
  storage: false,
  recipes: false,
  sidebar: false,
  catalog: false,
  addCatalog: false,
};

/**
 * Manages components visibility state
 * @param {Object} state
 * @param {Object} action {type: 'component-name', mode: 'toggle/switch' }
 * @returns
 */
function visibilityReducer(state, action) {
  // For desktop modals and sidebars
  if (action.mode === "toggle") {
    switch (action.type) {
      case "shopping-list":
        return { ...state, shoppingList: !state.shoppingList };
      case "settings":
        return {
          ...state,
          settings: !state.settings,
        };
      case "sidebar":
        return {
          ...state,
          sidebar: !state.sidebar,
        };
      case "catalog":
        return {
          ...state,
          catalog: !state.catalog,
        };
      case "addCatalog":
        return {
          ...state,
          addCatalog: !state.addCatalog,
        };

      default:
        return { ...state };
    }
  }

  // For mobile tabs
  if (action.mode === "switch") {
    switch (action.type) {
      case "shopping-list":
        return { ...visibilityInitialState, shoppingList: true };
      case "settings":
        return { ...visibilityInitialState, settings: true };
      case "storage":
        return { ...visibilityInitialState, storage: true };
      case "recipes":
        return { ...visibilityInitialState, recipes: true };
      default:
        return { ...visibilityInitialState };
    }
  }
}

export const LayoutProvider = ({ children }) => {
  // Get client width for responsive layout
  const breakPoint = 770;
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakPoint);

  // Components visibility state
  const [isVisible, dispatchIsVisible] = useReducer(
    visibilityReducer,
    visibilityInitialState
  );

  // Update width whenever user resizes the window
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      const width = window.innerWidth;
      setIsMobile(width < breakPoint);
    });
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        isMobile,
        setIsMobile,
        isVisible,
        dispatchIsVisible,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContext;
