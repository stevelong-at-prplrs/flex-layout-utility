import * as React from "react";
import { Container, Row, Col } from 'react-grid-system';

// Types

type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
type JustifyContent = "flex-start" | "center" | "flex-end" | "space-evenly" | "space-around" | "space-between";
type AlignItems = "flex-start" | "center" | "flex-end" | "stretch" | "baseline" | "initial" | "inherit";
type ColumnName = "flex-direction" | "justify-content" | "align-items" | "box-1" | "box-2" | "box-3";
type AllOptions = FlexDirection | JustifyContent | AlignItems;
type OrderOverrideOptions = 1 | 2 | 3 | undefined;

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

interface IOrderOptionColumnData {
    name: ColumnName;
    flexOptionsArr: IChildOrderOptions[];
    currentSelection: OrderOverrideOptions;
    setSelection: React.Dispatch<React.SetStateAction<OrderOverrideOptions>>;
}

interface IFlexChildProps {
    sourceOrder: number;
    orderOverride?: number;
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

interface IChildOrderOptions {
    orderOverride: number
}

const childOrderOptions: IChildOrderOptions[] = [
    {
        orderOverride: undefined
    }, {
        orderOverride: 1
    }, {
        orderOverride: 2
    }, {
        orderOverride: 3
    },
    
];

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
            name={props.propkey + (props.cssValue)}
            id={props.propkey + props.cssValue}
            onChange={props.onChange}
            checked={props.checked} />
        <label className="form-check-label" htmlFor={props.propkey + props.cssValue}>
            {props.cssValue || "don't set order"}
        </label>
    </div>;

const ControlColumn = (props: IOptionColumnData | IOrderOptionColumnData): JSX.Element =>
    <Col>
        <h5>{props.name}</h5>
        {props.flexOptionsArr.map((radioOption, ind) =>
            radioOption.orderOverride >= 0 ?
            <RadioButtonGenerator
                    key={props.name + ind}
                    propkey={props.name + ind}
                    cssValue={radioOption.orderOverride}
                    checked={props.currentSelection === radioOption.orderOverride}
                    onChange={() => props.setSelection(radioOption.orderOverride)}
                    disabled={radioOption.disabled} />
            :
            <RadioButtonGenerator
                key={props.name + ind}
                propkey={props.name + ind}
                cssValue={radioOption.cssValue}
                checked={props.currentSelection === radioOption.cssValue}
                onChange={() => props.setSelection(radioOption.cssValue)}
                disabled={radioOption.disabled} />)}
    </Col>;

const BoxGenerator = (props: IFlexChildProps) => <div className={"flex-child box-" + props.sourceOrder} style={props.orderOverride ? { order: props.orderOverride} : {}}>{props.sourceOrder} of 3</div>
  
const NewLayoutUtility = (): JSX.Element => {
      
    const [flexDirection, setFlexDirection] = React.useState<FlexDirection>("row");
    const [justifyContent, setJustifyContent] = React.useState<JustifyContent>("center");
    const [alignItems, setAlignItems] = React.useState<AlignItems>("center");
    const copyButtonRef: React.LegacyRef<HTMLButtonElement> = React.useRef();
    const [orderOverrideBox1, setOrderOverrideBox1] = React.useState<OrderOverrideOptions>();
    const [orderOverrideBox2, setOrderOverrideBox2] = React.useState<OrderOverrideOptions>();
    const [orderOverrideBox3, setOrderOverrideBox3] = React.useState<OrderOverrideOptions>();

    const childrenArr: IFlexChildProps[] = [
        {
            sourceOrder: 1,
            orderOverride: orderOverrideBox1
        },
        {
            sourceOrder: 2,
            orderOverride: orderOverrideBox2
        },
        {
            sourceOrder: 3,
            orderOverride: orderOverrideBox3
        }
    ];

    const generatedChildren = childrenArr.sort((a, b) => a.sourceOrder - b.sourceOrder).map(child => <BoxGenerator {...child}/>);
    
    const codeSample =
`<div style="display: flex; flex-direction: ${flexDirection}; justify-content: ${justifyContent}; align-items: ${alignItems};">${childrenArr.sort((a, b) => a.sourceOrder - b.sourceOrder).map(child => `\n\t<div class="flex-child box-${child.sourceOrder}"` + (child.orderOverride ? ` style="order: ${child.orderOverride};"`: "")  + `>${child.sourceOrder} of 3</div>`)}
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

    const orderColumnData: IOrderOptionColumnData[] = [
        {
            name: "box-1",
            flexOptionsArr: childOrderOptions,
            currentSelection: orderOverrideBox1,
            setSelection: setOrderOverrideBox1
        },
        {
            name: "box-2",
            flexOptionsArr: childOrderOptions,
            currentSelection: orderOverrideBox2,
            setSelection: setOrderOverrideBox2
        },
        {
            name: "box-3",
            flexOptionsArr: childOrderOptions,
            currentSelection: orderOverrideBox3,
            setSelection: setOrderOverrideBox3
        },
    ];

    return (
        <Container fluid>
            <Row justify="center">
                {columnData.map((propsObj, index) => <ControlColumn key={"control-columnAlpha" + index} {...propsObj} />)}
            </Row>
            <Row justify="center">
                {orderColumnData.map((propsObj, index) => <ControlColumn key={"control-columnBeta" + index} {...propsObj} />)}
            </Row>
            <br />
            <div className="flex-parent"
                style={{
                    flexDirection,
                    justifyContent,
                    alignItems
                }} >
                {generatedChildren}
            </div>
            <br />
            <pre className="code-display">
                {codeSample}
                {navigator.clipboard ?
                    <button
                        className="copy-button"
                        ref={copyButtonRef}
                        onFocus={() => {if (copyButtonRef?.current) copyButtonRef.current.blur()}}
                        onClick={() => copyToClipBoard(codeSample)}>
                            Copy
                    </button>: ""}
            </pre>
        </Container>
    );
};

export default NewLayoutUtility;
