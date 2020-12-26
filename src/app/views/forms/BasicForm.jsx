import React, { Component } from "react";
import {Breadcrumb}  from "../../../components/matx/index";
import SimpleForm from "./SimpleFrom";

class BasicForm extends Component {
  render() {
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Forms", path: "/forms" },
              { name: "Basic" }
            ]}
          />
        </div>
        <SimpleForm />
      </div>
    );
  }
}

export default BasicForm;
