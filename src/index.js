import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use React 18+ API
import App from "./App";
import "./index.css"; // ✅ Ensure styles are loaded

// ✅ Create a root and render App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
