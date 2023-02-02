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
  recipeView: false,
  profile: false,
};

/**
 * Manages components visibility state
 * @param {Object} state
 * @param {Object} action {type: 'component-name', mode: 'toggle/switch' }
 * @returns
 */
function visibilityReducer(state, action) {
  // For desktop modals and sidebars
  if (action.type === "TOGGLE") {
    switch (action.payload) {
      case "shopping-list":
        return { ...state, shoppingList: !state.shoppingList };
      case "settings":
        return {
          ...state,
          settings: !state.settings,
        };
      case "profile":
        return {
          ...state,
          profile: !state.profile,
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
      case "recipe-view":
        return {
          ...state,
          recipeView: !state.recipeView,
        };

      default:
        return { ...state };
    }
  }

  // For mobile tabs
  if (action.type === "SWITCH") {
    switch (action.payload) {
      case "shopping-list":
        return { ...visibilityInitialState, shoppingList: true };
      case "settings":
        return { ...visibilityInitialState, settings: true };
      case "profile":
        return { ...visibilityInitialState, profile: true };
      case "storage":
        return { ...visibilityInitialState, storage: true };
      case "recipes":
        return { ...visibilityInitialState, recipes: true };
      case "catalog":
        return { ...visibilityInitialState, catalog: true };
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
