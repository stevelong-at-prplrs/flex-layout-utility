import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { App } from "./app";

const root = ReactDOMClient.createRoot(document.getElementById('app') || document.body);
root.render(<App theme={'loading'}/>);

const queryParameters = new URLSearchParams(window.location.search)
const theme = queryParameters.get('t') ?? '';

setTimeout(() => {
    root.render(<App theme={theme} />);
}, 5000);