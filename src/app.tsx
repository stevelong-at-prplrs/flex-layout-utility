import * as React from "react";
// import FlexLayoutUtility from "./components/FlexLayoutUtility";
import NewLayoutUtulity from "./components/NewLayoutUtility";

export const App = (): JSX.Element => <>
            <div className="container-fluid title-bar">
                <h3><pre className="preformatted-pagetitle">Flex layout utility</pre></h3>
            </div>
            <div className="container">
                <br />
                <NewLayoutUtulity />
                <br />
            </div>
        </>;