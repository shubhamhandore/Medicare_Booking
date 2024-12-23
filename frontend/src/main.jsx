import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";

// Rendering the App with necessary context and routing
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* AuthContextProvider wraps the app to provide authentication context */}
      <AuthContextProvider>
        {/* Toast notifications setup */}
        <ToastContainer
          theme="dark"
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover={false}
        />
        {/* Main Application */}
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
