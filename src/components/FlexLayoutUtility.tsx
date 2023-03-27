import * as React from "react";
import { Container, Row, Col } from 'react-grid-system';

// Types

enum AllOptions {
    Row = "row",
    Column = "column",
    RowReverse = "row-reverse",
    ColumnReverse = "column-reverse",
    FlexStart = "flex-start",
    SpaceEvenly = "space-evenly",
    SpaceAround =  "space-around",
    SpaceBetween = "space-between",
    Center = "center",
    FlexEnd =  "flex-end",
    Stretch = "stretch",
    Baseline =  "baseline",
    Initial = "initial",
    Inherit = "inherit"
}

type FlexDirection = AllOptions.Row | AllOptions.Column | AllOptions.RowReverse | AllOptions.ColumnReverse;
type JustifyContent = AllOptions.FlexStart | AllOptions.Center | AllOptions.FlexEnd | AllOptions.SpaceEvenly | AllOptions.SpaceAround | AllOptions.SpaceBetween;
type AlignItems = AllOptions.FlexStart | AllOptions.Center | AllOptions.FlexEnd | AllOptions.Stretch | AllOptions.Baseline | AllOptions.Initial | AllOptions.Inherit;;

// enum FlexDirection {
    // Row = "row",
    // Column = "column",
    // RowReverse = "row-reverse",
    // ColumnReverse = "column-reverse"
// }

// enum JustifyContent {
//     FlexStart = "flex-start",
//     Center = "center",
//     FlexEnd =  "flex-end",
//     SpaceEvenly = "space-evenly",
//     SpaceAround =  "space-around",
//     SpaceBetween = "space-between"
// }

// enum AlignItems {
//     FlexStart = "flex-start",
//     Center = "center",
//     FlexEnd =  "flex-end",
//     Stretch = "stretch",
//     Baseline =  "baseline",
//     Initial = "initial",
//     Inherit = "inherit"
// }

// type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
// type JustifyContent = "flex-start" | "center" | "flex-end" | "space-evenly" | "space-around" | "space-between";
// type AlignItems = "flex-start" | "center" | "flex-end" | "stretch" | "baseline" | "initial" | "inherit";
// type AllOptions = FlexDirection | JustifyContent | AlignItems;
type ColumnName = "flex-direction" | "justify-content" | "align-items";

interface IFlexOption<T extends any> {
    cssValue: T;
    disabled?: boolean;
}

interface IRadioButtonGenerator extends IFlexOption<FlexDirection | JustifyContent | AlignItems> {
    propkey: string;
    onChange: () => void;
    checked: boolean;
}

interface IOptionColumnData<T extends any> {
    name: ColumnName;
    flexOptionsArr: IFlexOption<T>[];
    currentSelection: T;
    setSelection: (x: T) => void;
}

interface IControlColumnProps {
    name: ColumnName;
    flexOptionsArr: IFlexOption<any>[];
    currentSelection: FlexDirection | JustifyContent | AlignItems;
    setSelection: (value: any) => void;
}

// Data

const flexDirectionOptions: IFlexOption<FlexDirection>[] = [
    {
        cssValue: AllOptions.Row
    }, {
        cssValue: AllOptions.Column
    }, {
        cssValue: AllOptions.RowReverse
    }, {
        cssValue: AllOptions.ColumnReverse
    },
];

const justifyContentOptions: IFlexOption<JustifyContent>[] = [
    {
        cssValue: AllOptions.FlexStart
    }, {
        cssValue: AllOptions.Center
    }, {
        cssValue: AllOptions.FlexEnd
    }, {
        cssValue: AllOptions.SpaceEvenly
    }, {
        cssValue: AllOptions.SpaceAround
    }, {
        cssValue: AllOptions.SpaceBetween
    }
]

const alignItemsOptions: IFlexOption<AlignItems>[] = [
    {
        cssValue: AllOptions.FlexStart
    }, {
        cssValue: AllOptions.Center
    }, {
        cssValue: AllOptions.FlexEnd
    }, {
        cssValue: AllOptions.Stretch
    }, {
        cssValue: AllOptions.Baseline
    }, {
        cssValue: AllOptions.Initial,
        disabled: true
    }, {
        cssValue: AllOptions.Inherit,
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

  const ControlColumn = (props: IControlColumnProps): JSX.Element =>
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
      
    const [flexDirection, setFlexDirection] = React.useState<FlexDirection>(AllOptions.Row);
    const [justifyContent, setJustifyContent] = React.useState<JustifyContent>(AllOptions.Center);
    const [alignItems, setAlignItems] = React.useState<AlignItems>(AllOptions.Center);
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

    const columnData: [IOptionColumnData<FlexDirection>, IOptionColumnData<JustifyContent>, IOptionColumnData<AlignItems>] = [
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
                }}>
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
