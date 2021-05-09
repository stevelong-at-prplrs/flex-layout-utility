import * as React from "react";
import { Container, Row, Col } from 'react-grid-system'; // RowProps

const children = <>
    <Col xs={3} debug>1 of 3</Col>
    <Col xs={3} debug>2 of 3</Col>
    <Col xs={3} debug>3 of 3</Col>
</>;

type Justify = "start" | "center" | "end" | "between" | "around" | "initial" | "inherit";
type Align = "start" | "center" | "end" | "normal" | "stretch"

interface ILinkItem<T extends string> {
    linkText: T;
    active?: boolean;
    onClick?: () => void;
}

const LinkItemGenerator = (props: ILinkItem<Justify | Align>) =>
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

const JustifyAlignExample = () => {

    const [justifyValue, setJustifyValue] = React.useState("center" as Justify);
    const [alignValue, setAlignValue] = React.useState("center" as Align);

    return (
        <Container fluid>
            <h5>justify={justifyValue}</h5>
            <ul className="nav nav-pills">
                {justifyLinkItems.map(linkItem => <LinkItemGenerator linkText={linkItem.linkText} active={linkItem.linkText === justifyValue} onClick={() => setJustifyValue(linkItem.linkText)} />)}
            </ul>
            <br />
            <h5>align={alignValue}</h5>
            <ul className="nav nav-pills">
                {alignLinkItems.map(linkItem => <LinkItemGenerator linkText={linkItem.linkText} active={linkItem.linkText === alignValue} onClick={() => setAlignValue(linkItem.linkText)} />)}
            </ul>
            <Row justify={justifyValue} align={alignValue} debug>{children}</Row>
        </Container>
    );
};

export default JustifyAlignExample;