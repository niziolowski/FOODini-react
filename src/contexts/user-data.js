import { createContext, useState } from "react";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [catalog, setCatalog] = useState([
    {
      id: 123,
      name: "Jajka",
      amount: 10,
      group: 0,
      unit: "szt.",
      expiry: 14,
      bookmark: false,
    },
  ]);
  const [tags, setTags] = useState(["świeże", "suche", "mrożone"]);

  // § PRODUCT CATALOG
  const addProduct = (newProduct) => {
    setCatalog((current) => [...current, newProduct]);
  };

  const editProduct = (updatedProduct) => {
    const index = catalog.indexOf((item) => item.id === updatedProduct.id);

    setCatalog((current) => {
      current.splice(index, 1, updatedProduct);

      return [...current];
    });
  };

  const deleteProduct = (id) => {
    setCatalog((current) => {
      const updatedCatalog = current.filter((item) => item.id !== id);
      return [...updatedCatalog];
    });
  };

  return (
    <UserDataContext.Provider
      value={{
        addProduct,
        editProduct,
        deleteProduct,
        catalog,
        tags,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
