import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import "./i18n";

import App from "./app/App";
import store from "./store";

import "./styles/styles.scss";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

serviceWorkerRegistration.register();
