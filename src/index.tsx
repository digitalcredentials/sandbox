import "./styles/main.css";
import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Dashboard } from "./navigation";

ReactDOM.render(
  <>
    <CssBaseline />
    <Dashboard />
  </>,
  document.querySelector("#root")
);
