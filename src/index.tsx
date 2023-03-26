import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { App } from "./app";

ReactDOMClient.createRoot(document.getElementById('app')).render(<App />);
