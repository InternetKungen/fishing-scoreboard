import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import App from "./App.jsx";
import UserProvider from "./UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CookiesProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </CookiesProvider>
  </StrictMode>
);
