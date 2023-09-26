import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles.css";
import { ThemeProvider, createTheme } from "@mui/material/node/styles";
import { ContextProvider } from "./SocketContext";

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
