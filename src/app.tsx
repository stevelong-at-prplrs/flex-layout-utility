import * as React from "react";
import JustifyAlignExample from "../components/JustifyAlignExample";

export function App(): JSX.Element {

    // const params = new URLSearchParams(window.location.search);
    // console.log("queryParam:\t", params.get("queryParam"));

    // const [hash, setHash] = React.useState(window.location.hash || "#FlexRow_Example");

    // React.useEffect(() => {
    //     window.location.hash = hash;
    // }, [hash]);

    // window.addEventListener("hashchange", e => {
    //     const newHash = window.location.hash;
    //     document.title = newHash.slice(1);
    //     setHash(newHash);
    // });

    return (

        <React.Fragment>
            <div className="container-fluid" style={{ backgroundColor: "#0062cc", color: "white", padding: "1rem", marginBottom: "1rem" }}>
                {/* <h1>{hash.length > 1 ? hash.slice(1) : "#"}</h1> */}
                <h3><pre style={{ color: 'white', marginBottom: 0 }}>{`<FlexRow {...props} />`}</pre></h3>
            </div>
            <div className="container">
                <br />
                <JustifyAlignExample />
                <br />
            </div>
        </React.Fragment>
    );
}
