import { createContext, useState } from "react";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  // § PRODUCT CATALOG
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
    {
      id: 124,
      name: "Makaron",
      amount: 100,
      group: 0,
      unit: "g",
      expiry: 100,
      bookmark: false,
    },
    {
      id: 125,
      name: "Jajka",
      amount: 10,
      group: 0,
      unit: "szt.",
      expiry: 14,
      bookmark: false,
    },
    {
      id: 126,
      name: "Makaron",
      amount: 100,
      group: 0,
      unit: "g",
      expiry: 100,
      bookmark: false,
    },
    {
      id: 127,
      name: "Jajka",
      amount: 10,
      group: 0,
      unit: "szt.",
      expiry: 14,
      bookmark: false,
    },
    {
      id: 128,
      name: "Makaron",
      amount: 100,
      group: 0,
      unit: "g",
      expiry: 100,
      bookmark: false,
    },
    {
      id: 129,
      name: "Jajka",
      amount: 10,
      group: 0,
      unit: "szt.",
      expiry: 14,
      bookmark: false,
    },
    {
      id: 130,
      name: "Makaron",
      amount: 100,
      group: 0,
      unit: "g",
      expiry: 100,
      bookmark: false,
    },
    {
      id: 131,
      name: "Jajka",
      amount: 10,
      group: 0,
      unit: "szt.",
      expiry: 14,
      bookmark: false,
    },
  ]);
  const [tagsIng] = useState(["świeże", "suche", "mrożone"]);
  const [tagsRec] = useState(["śniadanie", "obiad", "przekąska"]);

  const addProduct = (newProduct) => {
    setCatalog((current) => [...current, newProduct]);
  };

  const getProductByID = (id) => {
    return catalog.find((item) => item.id === id);
  };

  const editProduct = (updatedProduct) => {
    const index = catalog.indexOf(
      catalog.find((item) => item.id === updatedProduct.id)
    );
    if (index === -1) return; //! Display error

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

  // § RECIPES
  const [recipes, setRecipes] = useState([
    {
      id: 123,
      title: "Jajecznica",
    },
  ]);

  const editRecipe = (updatedRecipe) => {
    const index = recipes.indexOf(
      recipes.find((item) => item.id === updatedRecipe.id)
    );
    if (index === -1) return; //! Display error

    setRecipes((current) => {
      current.splice(index, 1, updatedRecipe);

      return [...current];
    });
  };

  return (
    <UserDataContext.Provider
      value={{
        addProduct,
        editProduct,
        deleteProduct,
        getProductByID,
        catalog,
        tagsIng,
        tagsRec,
        recipes,
        editRecipe,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
