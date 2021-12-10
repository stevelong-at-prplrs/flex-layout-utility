import * as React from "react";
import FlexLayoutUtility from "../components/FlexLayoutUtility";

export const App = (): JSX.Element => <>
            <div className="container-fluid" style={{ backgroundColor: "#7c3392", color: "white", padding: "1rem", marginBottom: "1rem" }}>
                <h3><pre style={{ color: 'white', marginBottom: 0 }}>Flex layout utility</pre></h3>
            </div>
            <div className="container">
                <br />
                <FlexLayoutUtility />
                <br />
            </div>
        </>;