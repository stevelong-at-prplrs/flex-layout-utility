import * as React from "react";
import { Container, Row, Col } from 'react-grid-system';

const children = <>
    <div className="flex-child box-1">1 of 3</div>
    <div className="flex-child box-2">2 of 3</div>
    <div className="flex-child box-3">3 of 3</div>
</>;

type Align = 'normal' | 'start' | 'center' | 'end' | 'stretch'
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'initial' | 'inherit';
type Direction = "column" | "row" | "column-reverse" | "row-reverse";
// align-items: stretch|center|flex-start|flex-end|baseline|initial|inherit;
// justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly



interface ILinkItem<T extends string> {
    linkText: T;
    active?: boolean;
    onClick?: () => void;
    propVal?: string;
}

const LinkItemGenerator = (props: ILinkItem<Justify | Align | Direction>) =>
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

const flexDirectionLinkItems: ILinkItem<Direction>[] = [
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
    const [flexDirection, setFlexDirection] = React.useState("row" as Direction);


    return (
        <Container fluid>
            <Row justify="center">
                <Col xs={10}>
                    <Row style={{ flexDirection: "column" }}>
                        <h5>justify-content={justifyValue}</h5>
                        <ul className="nav nav-pills">
                            {justifyLinkItems.map((linkItem, i) => <LinkItemGenerator key={"justify-navpill-" + i} linkText={linkItem.linkText} active={linkItem.linkText === justifyValue} onClick={() => { setJustifyValue(linkItem.linkText); setJustifyValue2(linkItem.propVal || linkItem.linkText); }} />)}
                        </ul>
                    </Row>
                    <hr />
                    <Row style={{ flexDirection: "column" }}>
                        <h5>align-items={alignValue}</h5>
                        <ul className="nav nav-pills">
                            {alignLinkItems.map((linkItem, i) => <LinkItemGenerator key={"align-navpill-" + i} linkText={linkItem.linkText} active={linkItem.linkText === alignValue} onClick={() => { setAlignValue(linkItem.linkText); setAlignValue2(linkItem.propVal || linkItem.linkText)}} />)}
                        </ul>
                    </Row>
                    <hr />
                    <Row style={{ flexDirection: "column" }}>
                        <h5>flex-direction=</h5>
                        <ul className="nav nav-pills">
                            {flexDirectionLinkItems.map((linkItem, i) => <LinkItemGenerator key={"flexdirection-navpill-" + i} linkText={linkItem.linkText} active={linkItem.linkText === flexDirection} onClick={() => setFlexDirection(linkItem.linkText)} />)}
                        </ul>
                    </Row>
                    <hr />
                </Col>
            </Row>
            <br />
            <div className={"background"} style={{ display: "flex", height: "600px", flexDirection: flexDirection, justifyContent: justifyValue2, alignItems: alignValue2 }} >{children}</div>
            <br />
            <hr />
            <br />
            <div style={{ backgroundColor: "lightGray" }}>
                <div>
                    <pre>{`
                    <div style="display: flex; flex-direction: ${flexDirection}; justify-content: ${justifyValue2}; align-items: ${alignValue2};">
                        <div className="box-1">1 of 3</div>
                        <div className="box-2">2 of 3</div>
                        <div className="box-3">3 of 3</div>
                    </div>`}</pre>
                </div>
            </div>
        </Container>
    );
};

export default JustifyAlignExample;
