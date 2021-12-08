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
}

const justifyContentLinkItems: ILinkItem<JustifyContent>[] = [
    {
        linkText: "flex-start"
    },
    {
        linkText: "flex-end"
    },
    {
        linkText: "center"
    },
    {
        linkText: "space-between"
    },
    {
        linkText: "space-around"
    },
    {
        linkText: "space-evenly"
    },
]

const alignItemsLinkItems: ILinkItem<AlignItems>[] = [
    {
        linkText: "flex-start"
    },
    {
        linkText: "flex-end"
    },
    {
        linkText: "center"
    },
    {
        linkText: "stretch"
    },
    // { // commenting these out for now becasue they might be confusing and doesn't add utility to the... utility.
    //     linkText: "baseline"
    // },
    // {
    //     linkText: "initial"
    // },
    // {
    //     linkText: "inherit"
    // },
]

const flexDirectionLinkItems: ILinkItem<FlexDirection>[] = [
    {
        linkText: "row"
    }, {
        linkText: "row-reverse"
    }, {
        linkText: "column"
    }, {
        linkText: "column-reverse"
    },
];

const RadioButtonGenerator = (props) =>
    <div className="form-check">
        <input
            className="form-check-input"
            type="radio"
            name={props.propkey + props.linkText}
            id={props.propkey + props.linkText}
            onChange={() => props.updateSelection(props.linkText)}
            checked={props.linkText === props.active} />
        <label className="form-check-label" htmlFor={props.propkey + props.linkText}>
            {props.linkText}
        </label>
    </div>;

const FlexLayoutUtility = () => {

    const [justifyValue, setJustifyValue] = React.useState("center" as JustifyContent);
    const [alignValue, setAlignValue] = React.useState("center" as AlignItems);
    const [flexDirection, setFlexDirection] = React.useState("row" as FlexDirection);


    return (
        <Container fluid>
            <Row justify="center">
                <Col>
                    <h5>justify-content</h5>
                    {justifyContentLinkItems.map((linkItem, ind) => <RadioButtonGenerator key={"justifyRadioButton" + ind} propkey={"justifyRadioButton" + ind} linkText={linkItem.linkText} active={justifyValue} updateSelection={setJustifyValue} />)}
                </Col>
                <Col>
                    <h5>align-items</h5>
                    {alignItemsLinkItems.map((linkItem, ind) => <RadioButtonGenerator key={"alignRadioButton" + ind} propkey={"alignRadioButton" + ind} linkText={linkItem.linkText} active={alignValue} updateSelection={setAlignValue} />)}
                </Col>
                <Col>
                    <h5>flex-direction</h5>
                    {flexDirectionLinkItems.map((linkItem, ind) => <RadioButtonGenerator key={"flexRadioButton" + ind} propkey={"flexRadioButton" + ind} linkText={linkItem.linkText} active={flexDirection} updateSelection={setFlexDirection} />)}
                </Col>
            </Row>
            <br />
            <div className={"background"} style={{ display: "flex", height: "600px", flexDirection: flexDirection, justifyContent: justifyValue, alignItems: alignValue }} >{children}</div>
            <br />
            <div style={{ backgroundColor: "lightGray" }}>
                <div>
                    <pre>{`
                    <div style="display: flex; flex-direction: ${flexDirection}; justify-content: ${justifyValue}; align-items: ${alignValue};">
                        <div className="box-1">1 of 3</div>
                        <div className="box-2">2 of 3</div>
                        <div className="box-3">3 of 3</div>
                    </div>`}</pre>
                </div>
            </div>
            <div>
        </div>
    </Container>
    );
};

export default FlexLayoutUtility;
