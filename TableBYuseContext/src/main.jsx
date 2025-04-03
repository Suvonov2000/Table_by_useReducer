import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TableContextProvider from "./context/table.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TableContextProvider>
      <App />
    </TableContextProvider>
  </StrictMode>
);
