"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_grid_system_1 = require("react-grid-system");
// Data
const flexDirectionOptions = [
    {
        cssValue: "row"
    }, {
        cssValue: "column"
    }, {
        cssValue: "row-reverse"
    }, {
        cssValue: "column-reverse"
    },
];
const justifyContentOptions = [
    {
        cssValue: "flex-start"
    }, {
        cssValue: "center"
    }, {
        cssValue: "flex-end"
    }, {
        cssValue: "space-evenly"
    }, {
        cssValue: "space-around"
    }, {
        cssValue: "space-between"
    }
];
const alignItemsOptions = [
    {
        cssValue: "flex-start"
    }, {
        cssValue: "center"
    }, {
        cssValue: "flex-end"
    }, {
        cssValue: "stretch"
    }, {
        cssValue: "baseline"
    }, {
        cssValue: "initial",
        disabled: true
    }, {
        cssValue: "inherit",
        disabled: true
    }
];
// functions
const copyToClipBoard = (txtToCopy) => __awaiter(void 0, void 0, void 0, function* () {
    if (navigator.clipboard) {
        try {
            yield navigator.clipboard.writeText(txtToCopy);
            alert("Copied to clipboard.");
        }
        catch (err) {
            alert("Failed to copy to clipboard.");
        }
    }
    else
        alert("Copy to clipboard not supported in your browser");
});
const RadioButtonGenerator = (props) => React.createElement("div", { className: "form-check" },
    React.createElement("input", { disabled: props.disabled, className: "form-check-input", type: "radio", name: props.propkey + props.cssValue, id: props.propkey + props.cssValue, onChange: props.onChange, checked: props.checked }),
    React.createElement("label", { className: "form-check-label", htmlFor: props.propkey + props.cssValue }, props.cssValue));
const ControlColumn = (props) => React.createElement(react_grid_system_1.Col, null,
    React.createElement("h5", null, props.name),
    props.flexOptionsArr.map((radioOption, ind) => React.createElement(RadioButtonGenerator, { key: props.name + ind, propkey: props.name + ind, cssValue: radioOption.cssValue, checked: props.currentSelection === radioOption.cssValue, onChange: () => props.setSelection(radioOption.cssValue), disabled: radioOption.disabled })));
const FlexLayoutUtility = () => {
    const [flexDirection, setFlexDirection] = React.useState("row");
    const [justifyContent, setJustifyContent] = React.useState("center");
    const [alignItems, setAlignItems] = React.useState("center");
    const copyButtonRef = React.useRef();
    const children = React.createElement(React.Fragment, null,
        React.createElement("div", { className: "flex-child box-1" }, "1 of 3"),
        React.createElement("div", { className: "flex-child box-2" }, "2 of 3"),
        React.createElement("div", { className: "flex-child box-3" }, "3 of 3"));
    const codeSample = `<div style="display: flex; flex-direction: ${flexDirection}; justify-content: ${justifyContent}; align-items: ${alignItems};">
    <div className="box-1">1 of 3</div>
    <div className="box-2">2 of 3</div>
    <div className="box-3">3 of 3</div>
</div>`;
    const columnData = [
        {
            name: "flex-direction",
            flexOptionsArr: flexDirectionOptions,
            currentSelection: flexDirection,
            setSelection: setFlexDirection
        }, {
            name: "justify-content",
            flexOptionsArr: justifyContentOptions,
            currentSelection: justifyContent,
            setSelection: setJustifyContent
        }, {
            name: "align-items",
            flexOptionsArr: alignItemsOptions,
            currentSelection: alignItems,
            setSelection: setAlignItems
        }
    ];
    return (React.createElement(react_grid_system_1.Container, { fluid: true },
        React.createElement(react_grid_system_1.Row, { justify: "center" }, columnData.map((propsObj, index) => React.createElement(ControlColumn, Object.assign({ key: "control-column" + index }, propsObj)))),
        React.createElement("br", null),
        React.createElement("div", { className: "flex-parent", style: {
                flexDirection,
                justifyContent,
                alignItems
            } }, children),
        React.createElement("br", null),
        React.createElement("pre", { className: "code-display" },
            codeSample,
            navigator.clipboard ?
                React.createElement("button", { className: "copy-button", ref: copyButtonRef, onFocus: () => { if (copyButtonRef === null || copyButtonRef === void 0 ? void 0 : copyButtonRef.current)
                        copyButtonRef.current.blur(); }, onClick: () => copyToClipBoard(codeSample) }, "Copy") : "")));
};
exports.default = FlexLayoutUtility;
