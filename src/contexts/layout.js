import { createContext, useState, useEffect, useReducer } from "react";

const LayoutContext = createContext();

/**
 * Manages components visibility state
 * @param {Object} state
 * @param {Object} action {type: 'component-name', mode: 'toggle/switch' }
 * @returns
 */

const visibilityInitialState = {
  shoppingList: false,
  settings: false,
};

function visibilityReducer(state, action) {
  if (action.mode === "toggle") {
    switch (action.type) {
      case "shopping-list":
        return { ...state, shoppingList: !state.shoppingList };

      default:
        return { ...state };
    }
  }

  if (action.mode === "switch") {
    switch (action.type) {
      case "shopping-list":
        return { ...visibilityInitialState, shoppingList: true };

      default:
        return { ...visibilityInitialState };
    }
  }
}

export const LayoutProvider = ({ children }) => {
  // Get client width for responsive layout
  const breakPoint = 520;
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
