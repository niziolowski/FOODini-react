import { createContext, useState } from "react";

const stateContext = createContext();

export function StateProvider({ children }) {
  const [isShoppingListActive, setIsShoppingListActive] = useState(false);

  function hideAll() {
    setIsShoppingListActive(false);
  }

  return (
    <stateContext.Provider
      value={{
        isShoppingListActive,
        setIsShoppingListActive,
        hideAll,
      }}
    >
      {children}
    </stateContext.Provider>
  );
}

export default stateContext;
