import * as React from "react";
import ScreenSizeExample from "../components/screenSizeExample";
import JustifyAlignExample from "../components/JustifyAlignExample";

export function App(): JSX.Element {

    const params = new URLSearchParams(window.location.search);

    console.log("queryParam:\t", params.get("queryParam"));

    const [hash, setHash] = React.useState(window.location.hash || "#RGS_Layout");


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
                {/* <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">#</span>
                    </div>
                    <input type="text" className="form-control" value={hash.slice(1)} onChange={(e) => setHash("#" + e.currentTarget.value)} />
                </div> */}
            </div>
            <div className="container">
                <JustifyAlignExample />
                <ScreenSizeExample />
            </div>
        </React.Fragment>
    );
}