import "./styles/main.css";
import React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { Dashboard } from "./navigation";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element #root not found");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <Dashboard />
  </React.StrictMode>
);
