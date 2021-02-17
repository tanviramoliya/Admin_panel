import React, { Component } from "react";
import { ValidatorComponent } from "react-material-ui-form-validator";


class FileValidator extends ValidatorComponent {
  render() {
    const { errorMessages, validators, requiredError, validatorListener, value, ...rest } = this.props;
    return (
      <div>
        <input type="file" {...rest}/>
        {this.errorText()}
      </div>
    );
  }

  errorText() {
    const { isValid } = this.state;

    if (isValid) {
      return null;
    }

    return <div style={{ color: "red" }}>{this.getErrorMessage()}</div>;
  }
}
export default FileValidator;