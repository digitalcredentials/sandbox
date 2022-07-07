import "./styles/main.css";
import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Dashboard } from "./navigation";

ReactDOM.render(
  <>
    <CssBaseline />
    <Dashboard />
  </>,
  document.querySelector("#root")
);
