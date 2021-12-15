import * as React from "react";
import NewLayoutUtility from "../components/NewLayoutUtility";

export const App = (): JSX.Element => <>
            <div className="container-fluid title-bar">
                <h3><pre className="preformatted-pagetitle">Flex layout utility</pre></h3>
            </div>
            <div className="container">
                <br />
                <NewLayoutUtility />
                <br />
            </div>
        </>;