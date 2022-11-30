import { createContext, useState } from "react";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [catalog, setCatalog] = useState([]);
  return (
    <UserDataContext.Provider
      value={{
        catalog,
        setCatalog,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
