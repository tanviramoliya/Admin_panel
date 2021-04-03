import React, { Component } from "react";

class AccessDeniedPage extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-center flex-middle w-100 mt-86">
        <div className="flex flex-column flex-center" >
          <img className="mb-32" src="/assets/images/illustrations/designer.svg" alt="access denied" />
          <medium>You havn't permission to access this page! Please contact to administartor.</medium>
        </div>
      </div>
    );
  }
}

export default AccessDeniedPage;
