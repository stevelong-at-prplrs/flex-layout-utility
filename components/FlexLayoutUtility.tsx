import * as React from "react";
import { Container, Row, Col } from 'react-grid-system';

const children = <>
    <div className="flex-child box-1">1 of 3</div>
    <div className="flex-child box-2">2 of 3</div>
    <div className="flex-child box-3">3 of 3</div>
</>;

type FlexDirection = "column" | "row" | "column-reverse" | "row-reverse";
type AlignItems = "stretch"|"center"|"flex-start"|"flex-end"|"baseline"|"initial"|"inherit";
type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"


interface ILinkItem<T extends string> {
    linkText: T;
    active?: boolean;
    onClick?: () => void;
    propVal?: string;
    disabled?: boolean;
}

const justifyContentLinkItems: ILinkItem<JustifyContent>[] = [
    {
        linkText: "flex-start"
    }, {
        linkText: "center"
    }, {
        linkText: "flex-end"
    }, {
        linkText: "space-evenly"
    }, {
        linkText: "space-around"
    }, {
        linkText: "space-between"
    }
]

const alignItemsLinkItems: ILinkItem<AlignItems>[] = [
    {
        linkText: "flex-start"
    }, {
        linkText: "center"
    }, {
        linkText: "flex-end"
    }, {
        linkText: "stretch"
    }, {
        linkText: "baseline"
    }, {
        linkText: "initial",
        disabled: true
    }, {
        linkText: "inherit",
        disabled: true
    }
]

const flexDirectionLinkItems: ILinkItem<FlexDirection>[] = [
    {
        linkText: "row"
    }, {
        linkText: "column"
    }, {
        linkText: "row-reverse"
    }, {
        linkText: "column-reverse"
    },
];

const copyToClipBoard = async (txtToCopy: string): Promise<void> => {
    if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(txtToCopy);
            alert("Copied to clipboard.")
        } catch (err) {
            alert("Failed to copy to clipboard.")
        }
    } else alert("Copy to clipboard not supported in your browser")
  };

const RadioButtonGenerator = (props) =>
    <div className="form-check">
        <input
            disabled={props.disabled}
            className="form-check-input"
            type="radio"
            name={props.propkey + props.linkText}
            id={props.propkey + props.linkText}
            onChange={props.onChange}
            checked={props.checked} />
        <label className="form-check-label" htmlFor={props.propkey + props.linkText}>
            {props.linkText}
        </label>
    </div>;

  const ControlColumn = (props) =>
    <Col>
        <h5>{props.name}</h5>
        {props.linkItemArr.map((linkItem, ind) => <RadioButtonGenerator key={props.name + ind} propkey={props.name + ind} linkText={linkItem.linkText} checked={props.currentSelection === linkItem.linkText} onChange={() => props.setSelection(linkItem.linkText)} disabled={linkItem.disabled} />)}
    </Col>
  
  const FlexLayoutUtility = () => {
      
    const [flexDirection, setFlexDirection] = React.useState("row" as FlexDirection);
    const [justifyValue, setJustifyValue] = React.useState("center" as JustifyContent);
    const [alignValue, setAlignValue] = React.useState("center" as AlignItems);
    const copyButtonRef: React.LegacyRef<HTMLButtonElement> = React.useRef()
      
    
    const codeSample =
`<div style="display: flex; flex-direction: ${flexDirection}; justify-content: ${justifyValue}; align-items: ${alignValue};">
    <div className="box-1">1 of 3</div>
    <div className="box-2">2 of 3</div>
    <div className="box-3">3 of 3</div>
</div>`;

    const columnData = [
        {
            name: "flex-direction",
            linkItemArr: flexDirectionLinkItems,
            currentSelection: flexDirection,
            setSelection: setFlexDirection
        }, {
            name: "justify-content",
            linkItemArr: justifyContentLinkItems,
            currentSelection: justifyValue,
            setSelection: setJustifyValue
        }, {
            name: "align-items",
            linkItemArr: alignItemsLinkItems,
            currentSelection: alignValue,
            setSelection: setAlignValue
        }
    ];


    return (
        <Container fluid>
            <Row justify="center">
                {columnData.map((propsObj, index) => <ControlColumn key={"control-column" + index} {...propsObj} />)}
            </Row>
            <br />
            <div className={"background"} style={{ display: "flex", height: "600px", flexDirection: flexDirection, justifyContent: justifyValue, alignItems: alignValue }} >{children}</div>
            <br />
            <div style={{ backgroundColor: "lightGray" }}>
                <div style={{ position: "relative" }}>
                    <pre style={{ padding: "1.5rem" }}>{codeSample}
                        {navigator.clipboard ? <button ref={copyButtonRef} onFocus={() => { if (copyButtonRef?.current) copyButtonRef.current.blur()}} onClick={() => copyToClipBoard(codeSample)} style={{ position: "absolute", right: 0, bottom: 0, border: "none" }}>Copy</button> : ""}
                    </pre>
                </div>
            </div>
            <div>
        </div>
    </Container>
    );
};

export default FlexLayoutUtility;
