import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const appContainer = document.createElement("div");
appContainer.id = "react-chrome-extension";
document.body.appendChild(appContainer);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />, document.getElementById("react-chrome-extension"));
