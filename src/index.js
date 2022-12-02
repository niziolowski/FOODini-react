import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LayoutProvider } from "./contexts/layout";
import { UserDataProvider } from "./contexts/user-data";
import { AddCatalogProvider } from "./contexts/add-catalog";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LayoutProvider>
    <UserDataProvider>
      <AddCatalogProvider>
        <div className="wrapper">
          <App />
        </div>
      </AddCatalogProvider>
    </UserDataProvider>
  </LayoutProvider>
);
