import * as React from "react";
import { Container, Row, Col } from 'react-grid-system';

type FlexDirection = "column" | "row" | "column-reverse" | "row-reverse";
type AlignItems = "stretch"|"center"|"flex-start"|"flex-end"|"baseline"|"initial"|"inherit";
type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
type ColumnName = "flex-direction" | "justify-content" | "align-items";
type AllOptions = FlexDirection | AlignItems | JustifyContent

interface IFlexOption<T extends AllOptions> {
    cssValue: T;
    disabled?: boolean;
}

interface IOptionColumnData {
    name: ColumnName;
    flexOptionsArr: IFlexOption<AllOptions>[];
    currentSelection: AllOptions;
    setSelection: React.Dispatch<React.SetStateAction<AllOptions>>;
}

interface IRadioButtonGenerator extends IFlexOption<AllOptions> {
    propkey: string;
    onChange: () => void;
    checked: boolean;
}

const children = <>
    <div className="flex-child box-1">1 of 3</div>
    <div className="flex-child box-2">2 of 3</div>
    <div className="flex-child box-3">3 of 3</div>
</>;

const justifyContentOptions: IFlexOption<JustifyContent>[] = [
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
]

const alignItemsOptions: IFlexOption<AlignItems>[] = [
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
]

const flexDirectionOptions: IFlexOption<FlexDirection>[] = [
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

const RadioButtonGenerator = (props: IRadioButtonGenerator) =>
    <div className="form-check">
        <input
            disabled={props.disabled}
            className="form-check-input"
            type="radio"
            name={props.propkey + props.cssValue}
            id={props.propkey + props.cssValue}
            onChange={props.onChange}
            checked={props.checked} />
        <label className="form-check-label" htmlFor={props.propkey + props.cssValue}>
            {props.cssValue}
        </label>
    </div>;

  const ControlColumn = (props: IOptionColumnData) =>
    <Col>
        <h5>{props.name}</h5>
        {props.flexOptionsArr.map((radioOption, ind) =>
            <RadioButtonGenerator
                key={props.name + ind}
                propkey={props.name + ind}
                cssValue={radioOption.cssValue}
                checked={props.currentSelection === radioOption.cssValue}
                onChange={() => props.setSelection(radioOption.cssValue)}
                disabled={radioOption.disabled} />)}
    </Col>
  
  const FlexLayoutUtility = () => {
      
    const [flexDirection, setFlexDirection] = React.useState<FlexDirection>("row");
    const [justifyContent, setJustifyContent] = React.useState<JustifyContent>("center");
    const [alignItems, setAlignItems] = React.useState<AlignItems>("center");
    const copyButtonRef: React.LegacyRef<HTMLButtonElement> = React.useRef()
      
    
    const codeSample =
`<div style="display: flex; flex-direction: ${flexDirection}; justify-content: ${justifyContent}; align-items: ${alignItems};">
    <div className="box-1">1 of 3</div>
    <div className="box-2">2 of 3</div>
    <div className="box-3">3 of 3</div>
</div>`;

    const columnData: IOptionColumnData[] = [
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

    return (
        <Container fluid>
            <Row justify="center">
                {columnData.map((propsObj, index) => <ControlColumn key={"control-column" + index} {...propsObj} />)}
            </Row>
            <br />
            <div className={"background"}
                style={{
                    display: "flex",
                    height: "600px",
                    flexDirection,
                    justifyContent,
                    alignItems
                }} >
                {children}
            </div>
            <br />
            <div style={{ backgroundColor: "lightGray" }}>
                <div style={{ position: "relative" }}>
                    <pre style={{ padding: "1.5rem" }}>
                        {codeSample}
                        {navigator.clipboard ?
                            <button
                                ref={copyButtonRef}
                                onFocus={() => {if (copyButtonRef?.current) copyButtonRef.current.blur()}}
                                onClick={() => copyToClipBoard(codeSample)}
                                style={{ position: "absolute", right: 0, bottom: 0, border: "none" }}>Copy
                            </button>: ""}
                    </pre>
                </div>
            </div>
            <div>
        </div>
    </Container>
    );
};

export default FlexLayoutUtility;
