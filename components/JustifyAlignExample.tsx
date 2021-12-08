import * as React from "react";
import { Container, Row, Col, Justify, Align } from 'react-grid-system';
import FlexRow from "./FlexRow";

const children = <>
    <div className="flex-child">1 of 3</div>
    <div className="flex-child">2 of 3</div>
    <div className="flex-child">3 of 3</div>
</>;

export type FlexDirection = "column" | "row" | "column-reverse" | "row-reverse";
// align-items: stretch|center|flex-start|flex-end|baseline|initial|inherit;
// justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly



interface ILinkItem<T extends string> {
    linkText: T;
    active?: boolean;
    onClick?: () => void;
    propVal?: string;
}

const LinkItemGenerator = (props: ILinkItem<Justify | Align | FlexDirection>) =>
    <li className="nav-item">
        <a
            onClick={props.onClick}
            className={"nav-link" + (props.active ? " active" : "")} >
            {props.linkText}
        </a>
    </li>;

const justifyLinkItems: ILinkItem<Justify>[] = [
    {
        linkText: "start",
        propVal: "flex-start"
    },
    {
        linkText: "center"
    },
    {
        linkText: "end",
        propVal: "flex-end"
    },
    {
        linkText: "between",
        propVal: "space-between"
    },
    {
        linkText: "around",
        propVal: "space-around"
    },
    // {
    //     linkText: "evenly",
    //     propVal: "space-evenly"
    // },
    // {
    //     linkText: "initial"
    // },
    // {
    //     linkText: "inherit"
    // },
];


const alignLinkItems: ILinkItem<Align>[] = [
    {
        linkText: "start",
        propVal: "flex-start"

    },
    {
        linkText: "center"
    },
    {
        linkText: "end",
        propVal: "flex-end"
    },
    {
        linkText: "normal"
    },
    {
        linkText: "stretch"
    }
];

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

const JustifyAlignExample = () => {

    const [justifyValue, setJustifyValue] = React.useState("center" as Justify);
    const [justifyValue2, setJustifyValue2] = React.useState("center");
    const [alignValue, setAlignValue] = React.useState("center" as Align);
    const [alignValue2, setAlignValue2] = React.useState("center");
    const [flexDirection, setFlexDirection] = React.useState("row" as FlexDirection);


    return (
        <Container fluid>
            <Row justify="center">
                <Col xs={10}>
                    <Row style={{ flexDirection: "column" }}>
                        <h5>justify={justifyValue}</h5>
                        <ul className="nav nav-pills">
                            {justifyLinkItems.map((linkItem, i) => <LinkItemGenerator key={"justify-navpill-" + i} linkText={linkItem.linkText} active={linkItem.linkText === justifyValue} onClick={() => { setJustifyValue(linkItem.linkText); setJustifyValue2(linkItem.propVal || linkItem.linkText); }} />)}
                        </ul>
                    </Row>
                    <hr />
                    <Row style={{ flexDirection: "column" }}>
                        <h5>align={alignValue}</h5>
                        <ul className="nav nav-pills">
                            {alignLinkItems.map((linkItem, i) => <LinkItemGenerator key={"align-navpill-" + i} linkText={linkItem.linkText} active={linkItem.linkText === alignValue} onClick={() => { setAlignValue(linkItem.linkText); setAlignValue2(linkItem.propVal || linkItem.linkText)}} />)}
                        </ul>
                    </Row>
                    <hr />
                    <Row style={{ flexDirection: "column" }}>
                        <h5>direction=</h5>
                        <ul className="nav nav-pills">
                            {flexDirectionLinkItems.map((linkItem, i) => <LinkItemGenerator key={"flexdirection-navpill-" + i} linkText={linkItem.linkText} active={linkItem.linkText === flexDirection} onClick={() => setFlexDirection(linkItem.linkText)} />)}
                        </ul>
                    </Row>
                    <hr />
                </Col>
            </Row>
            <br />
            {/* <FlexRow style={{ height: "300px" }} direction={flexDirection} justify={justifyValue} align={alignValue} debug>{children}</FlexRow> */}
            <div className="flex-container" style={{ height: "300px", flexDirection: flexDirection, justifyContent: justifyValue2, alignItems: alignValue2 }} >{children}</div>
            <br />
            <hr />
            <br />
            <div style={{ backgroundColor: "lightGray" }}>
                <div>
                    <pre>{`
                    <div
                        className="flex-container"
                        style={{
                            height: "300px",
                            flexDirection: ${flexDirection},
                            justifyContent: ${justifyValue2},
                            alignItems: ${alignValue2} }} >
                        {children}
                    </div>`}</pre>
                </div>
            </div>
        </Container>
    );
};

export default JustifyAlignExample;
