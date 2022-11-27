import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LayoutProvider } from "./contexts/layout";
import { StateProvider } from "./contexts/state";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LayoutProvider>
    <StateProvider>
      <App />
    </StateProvider>
  </LayoutProvider>
);
