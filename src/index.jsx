import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";
import App from "./app/App";
import "../node_modules/react-redux-toastr/src/styles/index.scss";
import "@pathofdev/react-tag-input/build/index.css";
//import "node_modules/@pathofdev/react-tag-input/src/styles/index.scss";


ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
