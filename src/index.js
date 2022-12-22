import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LayoutProvider } from "./contexts/layout";
import { UserDataProvider } from "./contexts/user-data";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LayoutProvider>
    <UserDataProvider>
      <App />
    </UserDataProvider>
  </LayoutProvider>
);
