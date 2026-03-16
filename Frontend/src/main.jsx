import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Datacontextprovied } from "./Context/Datacontextprovied";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Datacontextprovied>
      <App />
    </Datacontextprovied>
  </React.StrictMode>
);
