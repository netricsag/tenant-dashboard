import Dashboard from "./Components/Dashboard";
import Notifications from "./Components/Notifications";
import Settings from "./Components/Settings";
import Cost from "./Components/Cost";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { Box } from "@mui/material";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
