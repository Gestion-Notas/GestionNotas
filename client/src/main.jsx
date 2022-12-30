import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
const Render = () => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
};
Render();
