import React, { Component } from "react";

class Brand extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-middle flex-space-between brand-area">
        <div className="flex flex-middle brand">
          <img src="/assets/images/sidebar/gntv.png" alt="company-logo" style={{backgroundColor:"whitesmoke"}} />
          {/* <span className="brand__text">GNTV</span> */}
        </div>
        {/* {this.props.children} */}
      </div>
    );
  }
}

export default Brand;
