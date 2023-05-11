import * as React from "react";
import FlexLayoutUtility from "./components/FlexLayoutUtility";

type AppProps = { theme?: string; }

export const App = ({theme}: AppProps): JSX.Element => <>
            <div className={"container-fluid title-bar" + (theme ? " " + theme + " loaded" : " default loaded")}>
                <h3><pre className="preformatted-pagetitle">Flex layout utility</pre></h3>
            </div>
            <div className="container">
                <br />
                <FlexLayoutUtility />
                <br />
            </div>
        </>;