import * as React from "react";
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';

export function App(): JSX.Element {

    const params = new URLSearchParams(window.location.search);

    console.log("queryParam:\t", params.get("queryParam"));

    const [hash, setHash] = React.useState(window.location.hash || "#rgs");


    React.useEffect(() => {
        window.location.hash = hash;
    }, [hash]);

    window.addEventListener("hashchange", e => {
        const newHash = window.location.hash;
        document.title = newHash.slice(1);
        setHash(newHash);
    });

    return (

        <React.Fragment>
            <div className="container-fluid" style={{ backgroundColor: "#0062cc", color: "white", padding: "1rem", marginBottom: "1rem" }}>
                <h1>{hash.length > 1 ? hash.slice(1) : "#"}</h1>
            </div>
            <div className="container">
                <Container fluid>
                    <Row justify="start" debug>
                        <Col xs={3} debug>1 of 3</Col>
                        <Col xs={3} debug>2 of 3</Col>
                        <Col xs={3} debug>3 of 3</Col>
                    </Row>
                    <br />
                    <h5>justify="start"</h5>
                    <Row justify="center" debug>
                        <Col xs={3} debug>1 of 3</Col>
                        <Col xs={3} debug>2 of 3</Col>
                        <Col xs={3} debug>3 of 3</Col>
                    </Row>
                    <br />
                    <h5>justify="end"</h5>
                    <Row justify="end" debug>
                        <Col xs={3} debug>1 of 3</Col>
                        <Col xs={3} debug>2 of 3</Col>
                        <Col xs={3} debug>3 of 3</Col>
                    </Row>
                    <br />
                    <h5>justify="between"</h5>
                    <Row justify="between" debug>
                        <Col xs={3} debug>1 of 3</Col>
                        <Col xs={3} debug>2 of 3</Col>
                        <Col xs={3} debug>3 of 3</Col>
                    </Row>
                    <br />
                    <h5>justify="around"</h5>
                    <Row justify="around" debug>
                        <Col xs={3} debug>1 of 3</Col>
                        <Col xs={3} debug>2 of 3</Col>
                        <Col xs={3} debug>3 of 3</Col>
                    </Row>
                    <br />
                    <h5>justify="initial"</h5>
                    <Row justify="initial" debug>
                        <Col xs={3} debug>1 of 3</Col>
                        <Col xs={3} debug>2 of 3</Col>
                        <Col xs={3} debug>3 of 3</Col>
                    </Row>
                    <br />
                    <h5>justify="inherit"</h5>
                    <Row justify="inherit" debug>
                        <Col xs={3} debug>1 of 3</Col>
                        <Col xs={3} debug>2 of 3</Col>
                        <Col xs={3} debug>3 of 3</Col>
                    </Row>
                </Container>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">#</span>
                    </div>
                    <input type="text" className="form-control" value={hash.slice(1)} onChange={(e) => setHash("#" + e.currentTarget.value)} />
                </div>
            </div>
            <div>
                <p>
                    <span>Your current screen class is </span>
                    <Visible xs><strong>xs</strong></Visible>
                    <Visible sm><strong>sm</strong></Visible>
                    <Visible md><strong>md</strong></Visible>
                    <Visible lg><strong>lg</strong></Visible>
                    <Visible xl><strong>xl</strong></Visible>
                    <Visible xxl><strong>xxl</strong></Visible>
                    <span>.</span>
                </p>
            </div>
            <Row>
                <Col xs={6} sm={2}>
                    <Hidden xs><div style={{ color: 'gray' }}>x-small</div></Hidden>
                    <Visible xs><div style={{ color: 'green' }}>Visible on x-small</div></Visible>
                </Col>
                <Col xs={6} sm={2}>
                    <Hidden sm><div style={{ color: 'gray' }}>Small</div></Hidden>
                    <Visible sm><div style={{ color: 'green' }}>Visible on small</div></Visible>
                </Col>
                <Col xs={6} sm={2}>
                    <Hidden md><div style={{ color: 'gray' }}>Medium</div></Hidden>
                    <Visible md><div style={{ color: 'green' }}>Visible on medium</div></Visible>
                </Col>
                <Col xs={6} sm={2}>
                    <Hidden lg><div style={{ color: 'gray' }}>Large</div></Hidden>
                    <Visible lg><div style={{ color: 'green' }}>Visible on large</div></Visible>
                </Col>
                <Col xs={6} sm={2}>
                    <Hidden xl><div style={{ color: 'gray' }}>x-large</div></Hidden>
                    <Visible xl><div style={{ color: 'green' }}>Visible on x-large</div></Visible>
                </Col>
                <Col xs={6} sm={2}>
                    <Hidden xxl><div style={{ color: 'gray' }}>xx-large</div></Hidden>
                    <Visible xxl><div style={{ color: 'green' }}>Visible on xx-large</div></Visible>
                </Col>
            </Row>
        </React.Fragment>
    );
}