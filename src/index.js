import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LayoutProvider } from "./contexts/layout";
import { AuthContextProvider } from "./contexts/auth";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <LayoutProvider>
      <App />
    </LayoutProvider>
  </AuthContextProvider>
);
