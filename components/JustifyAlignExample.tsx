import * as React from "react";
import { Container, Row, Col, Justify, Align } from 'react-grid-system';
import FlexRow from "./FlexRow";

const children = <>
    <Col xs={3} debug>1 of 3</Col>
    <Col xs={3} debug>2 of 3</Col>
    <Col xs={3} debug>3 of 3</Col>
</>;

export type FlexDirection = "column" | "row" | "column-reverse" | "row-reverse";

interface ILinkItem<T extends string> {
    linkText: T;
    active?: boolean;
    onClick?: () => void;
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
    },
    {
        linkText: "center"
    },
    {
        linkText: "end"
    },
    {
        linkText: "between"
    },
    {
        linkText: "around"
    },
    {
        linkText: "initial"
    },
    {
        linkText: "inherit"
    },
];

const alignLinkItems: ILinkItem<Align>[] = [
    {
        linkText: "start"
    },
    {
        linkText: "center"
    },
    {
        linkText: "end"
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
    const [alignValue, setAlignValue] = React.useState("center" as Align);
    const [flexDirection, setFlexDirection] = React.useState("row" as FlexDirection);


    return (
        <Container fluid>
            <Row justify="center">
                <Col xs={10}>
                    <Row style={{ flexDirection: "column" }}>
                        <h5>justify={justifyValue}</h5>
                        <ul className="nav nav-pills">
                            {justifyLinkItems.map((linkItem, i) => <LinkItemGenerator key={"justify-navpill-" + i} linkText={linkItem.linkText} active={linkItem.linkText === justifyValue} onClick={() => setJustifyValue(linkItem.linkText)} />)}
                        </ul>
                    </Row>
                    <hr />
                    <Row style={{ flexDirection: "column" }}>
                        <h5>align={alignValue}</h5>
                        <ul className="nav nav-pills">
                            {alignLinkItems.map((linkItem, i) => <LinkItemGenerator key={"align-navpill-" + i} linkText={linkItem.linkText} active={linkItem.linkText === alignValue} onClick={() => setAlignValue(linkItem.linkText)} />)}
                        </ul>
                    </Row>
                    <hr />
                    <Row style={{ flexDirection: "column" }}>
                        <h5>Flex Direction</h5>
                        <ul className="nav nav-pills">
                            {flexDirectionLinkItems.map((linkItem, i) => <LinkItemGenerator key={"flexdirection-navpill-" + i} linkText={linkItem.linkText} active={linkItem.linkText === flexDirection} onClick={() => setFlexDirection(linkItem.linkText)} />)}
                        </ul>
                    </Row>
                    <hr />
                </Col>
            </Row>
            <br />
            <FlexRow style={{ height: "300px" }} direction={flexDirection} justify={justifyValue} align={alignValue} debug>{children}</FlexRow>
            <br />
            <hr />
            <br />
            <Row justify="center" style={{ backgroundColor: "lightGray" }}>
                <Col xs={6}>
                    <br />
                    <pre>{`
import * as React from "react";
import { Justify, Align } from 'react-grid-system';
import FlexRow, { FlexRowProps } from "./FlexRow";

const FlexRowExample = (props: FlexRowProps) => {

    const { justify, align, direction } = props;

    <FlexRow
        justify="${justifyValue}"
        align="${alignValue}"
        direction="${flexDirection}">
            {children}
    </FlexRow>
};
                        `}
                    </pre>
                </Col>
            </Row>
        </Container>
    );
};

export default JustifyAlignExample;