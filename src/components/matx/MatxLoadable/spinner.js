import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import "./loader.scss";

class Spinner extends Component {
  render() {
    const { loader } = this.props;

    return (
      loader && (
          <div className="wrapper">
        <div className="loading">
          <img src="/assets/images/logo-circle.svg" alt="" className="img" />
          <CircularProgress />
        </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => {
  const { loader } = state.loaders;
  return { loader };
};

export default connect(mapStateToProps, {})(Spinner);
