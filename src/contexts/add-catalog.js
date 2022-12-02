import { createContext, useState } from "react";

const AddCatalogContext = createContext();

export const AddCatalogProvider = ({ children }) => {
  const [payload, setPayload] = useState(null);

  return (
    <AddCatalogContext.Provider
      value={{
        payload,
        setPayload,
      }}
    >
      {children}
    </AddCatalogContext.Provider>
  );
};

export default AddCatalogContext;
