import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LayoutProvider } from "./contexts/layout";
import { AuthContextProvider } from "./contexts/auth";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { ErrorContextProvider } from "./contexts/error";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ErrorContextProvider>
    <ErrorBoundary>
      <AuthContextProvider>
        <LayoutProvider>
          <App />
        </LayoutProvider>
      </AuthContextProvider>
    </ErrorBoundary>
  </ErrorContextProvider>
);
