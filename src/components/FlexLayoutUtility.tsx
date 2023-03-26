import * as React from "react";
import { Container, Row, Col } from 'react-grid-system';

// Types

// change these to enums? 

type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
type JustifyContent = "flex-start" | "center" | "flex-end" | "space-evenly" | "space-around" | "space-between";
type AlignItems = "flex-start" | "center" | "flex-end" | "stretch" | "baseline" | "initial" | "inherit";
type ColumnName = "flex-direction" | "justify-content" | "align-items";
type AllOptions = FlexDirection | JustifyContent | AlignItems;

interface IFlexOption<T extends AllOptions> {
    cssValue: T;
    disabled?: boolean;
}

interface IRadioButtonGenerator extends IFlexOption<AllOptions> {
    propkey: string;
    onChange: () => void;
    checked: boolean;
}

interface IOptionColumnData {
    name: ColumnName;
    flexOptionsArr: IFlexOption<AllOptions>[];
    currentSelection: AllOptions;
    setSelection: React.Dispatch<React.SetStateAction<AllOptions>>;
}

// Data

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

// functions

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

const RadioButtonGenerator = (props: IRadioButtonGenerator): JSX.Element =>
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

  const ControlColumn = (props: IOptionColumnData): JSX.Element =>
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
    </Col>;
  
  const FlexLayoutUtility = (): JSX.Element => {
      
    const [flexDirection, setFlexDirection] = React.useState<FlexDirection>("row");
    const [justifyContent, setJustifyContent] = React.useState<JustifyContent>("center");
    const [alignItems, setAlignItems] = React.useState<AlignItems>("center");
    const copyButtonRef = React.useRef<HTMLButtonElement>();
      
    const children = <>
        <div className="flex-child box-1">1 of 3</div>
        <div className="flex-child box-2">2 of 3</div>
        <div className="flex-child box-3">3 of 3</div>
    </>;
    
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
            <div className="flex-parent"
                style={{
                    flexDirection,
                    justifyContent,
                    alignItems
                }} >
                {children}
            </div>
            <br />
            <pre className="code-display">
                {codeSample}
                {navigator.clipboard ?
                    <button
                        className="copy-button"
                        ref={copyButtonRef as React.RefObject<HTMLButtonElement>}
                        onFocus={() => {if (copyButtonRef?.current) copyButtonRef.current.blur()}}
                        onClick={() => copyToClipBoard(codeSample)}>
                            Copy
                    </button>: ""}
            </pre>
        </Container>
    );
};

export default FlexLayoutUtility;
