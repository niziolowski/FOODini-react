import { createContext, useState } from "react";

const stateContext = createContext();

export function StateProvider({ children }) {
  const [isShoppingListActive, setIsShoppingListActive] = useState(false);

  return (
    <stateContext.Provider
      value={{
        isShoppingListActive,
        setIsShoppingListActive,
      }}
    >
      {children}
    </stateContext.Provider>
  );
}

export default stateContext;
