import React from "react";
import ReactDOM from "react-dom";

import GooglePermissionRequest from "./GooglePermissionRequest";

const onLogin = (data) => {
  console.log(data);
  // send to server ...
};

ReactDOM.render(
  <React.StrictMode>
    <GooglePermissionRequest onLogin={onLogin} />
  </React.StrictMode>,
  document.getElementById("root")
);
