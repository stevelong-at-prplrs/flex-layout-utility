import * as React from "react";
import { Container, Row, Col } from 'react-grid-system';

// Types

enum PropertyName {
    FlexDirection = "flex-direction",
    JustifyContent = "justify-content",
    AlignItems = "align-items"
}

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

interface IFlexOption<T> {
    cssValue: T;
    disabled?: boolean;
}

interface IRadioButtonGenerator<T> extends IFlexOption<T> {
    propkey: string;
    onChange: () => void;
    checked: boolean;
}

interface IControlColumnProps<T> {
    name: PropertyName;
    flexOptionsArr: IFlexOption<T>[];
    currentSelection: T;
    setSelection: React.Dispatch<React.SetStateAction<T>>;
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

const RadioButtonGenerator = (props: IRadioButtonGenerator<AllOptions>): JSX.Element =>
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

  const ControlColumn = (props: IControlColumnProps<any>): JSX.Element =>
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
    <div class="box-1">1 of 3</div>
    <div class="box-2">2 of 3</div>
    <div class="box-3">3 of 3</div>
</div>`;

    const columnData: [IControlColumnProps<FlexDirection>, IControlColumnProps<JustifyContent>, IControlColumnProps<AlignItems>] = [
        {
            name: PropertyName.FlexDirection,
            flexOptionsArr: flexDirectionOptions,
            currentSelection: flexDirection,
            setSelection: setFlexDirection
        }, {
            name: PropertyName.JustifyContent,
            flexOptionsArr: justifyContentOptions,
            currentSelection: justifyContent,
            setSelection: setJustifyContent
        }, {
            name: PropertyName.AlignItems,
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
