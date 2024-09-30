import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const appContainer = document.createElement("div");
appContainer.id = "react-chrome-extension";
document.body.appendChild(appContainer);

ReactDOM.render(<App />, document.getElementById("react-chrome-extension"));
