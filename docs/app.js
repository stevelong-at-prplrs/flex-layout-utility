"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const React = require("react");
const FlexLayoutUtility_1 = require("./components/FlexLayoutUtility");
const App = () => React.createElement(React.Fragment, null,
    React.createElement("div", { className: "container-fluid title-bar" },
        React.createElement("h3", null,
            React.createElement("pre", { className: "preformatted-pagetitle" }, "Flex layout utility"))),
    React.createElement("div", { className: "container" },
        React.createElement("br", null),
        React.createElement(FlexLayoutUtility_1.default, null),
        React.createElement("br", null)));
exports.App = App;
