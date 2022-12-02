import { createContext, useState } from "react";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [catalog, setCatalog] = useState([]);
  const [tags, setTags] = useState(["świeże", "suche", "mrożone"]);
  return (
    <UserDataContext.Provider
      value={{
        catalog,
        setCatalog,
        tags,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
