import React, { Component, Fragment } from "react";
import {
  Grid,
  Card
} from "@material-ui/core";

import DoughnutChart from "../charts/echarts/Doughnut";

import ModifiedAreaChart from "./shared/ModifiedAreaChart";
import StatCards from "./shared/StatCards";
import TableCard from "./shared/TableCard";
import RowCards from "./shared/RowCards";
import StatCards2 from "./shared/StatCards2";
import UpgradeCard from "./shared/UpgradeCard";
import Campaigns from "./shared/Campaigns";
import { withStyles } from "@material-ui/styles";

class Dashboard1 extends Component {
  state = {};

  render() {
    let { theme } = this.props;

    return (
      <Fragment>     
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12} className="m-20">
              <StatCards theme={theme}/>
              <StatCards2/>
            </Grid>
          </Grid>
      </Fragment>
    );
  }
}

export default withStyles({}, { withTheme: true })(Dashboard1);
