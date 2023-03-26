"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOMClient = require("react-dom/client");
const app_1 = require("./app");
ReactDOMClient.createRoot(document.getElementById('app') || document.body).render(React.createElement(app_1.App, null));
