import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { App } from "./app";

const queryParameters = new URLSearchParams(window.location.search)
const theme = queryParameters.get('t');
const root = ReactDOMClient.createRoot(document.getElementById('app'));
root.render(<App theme={'loading'}/>);

setTimeout(() => {
    root.render(<App theme={theme} />);
}, 5000);