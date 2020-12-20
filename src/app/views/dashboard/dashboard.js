import React, { Component, Fragment } from "react";
import {
  Grid,
  Card,
  Icon,
  IconButton,
  Tooltip,
  Fab
} from "@material-ui/core";

import { withStyles } from "@material-ui/styles";

class Dashboard1 extends Component {
  state = {};

  render() {
    let { theme } = this.props;

    return (
      <Fragment>     
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12} className="m-20">
            <Grid container spacing={3} className="mb-24">
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <Icon
              style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main
              }}
            >
              group
            </Icon>
            <div className="ml-12">
              <small className="text-muted">New Leads</small>
              <h6 className="m-0 mt-4 text-primary font-weight-500">3050</h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <Icon
              style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main
              }}
            >
              attach_money
            </Icon>
            <div className="ml-12">
              <small className="text-muted">This week Sales</small>
              <h6 className="m-0 mt-4 text-primary font-weight-500">$80500</h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <Icon
              style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main
              }}
            >
              store
            </Icon>
            <div className="ml-12">
              <small className="text-muted">Inventory Status</small>
              <h6 className="m-0 mt-4 text-primary font-weight-500">
                8.5% Stock Surplus
              </h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <Icon
              style={{
                fontSize: "44px",
                opacity: 0.6,
                color: theme.palette.primary.main
              }}
            >
              shopping_cart
            </Icon>
            <div className="ml-12">
              <small className="text-muted">Orders to deliver</small>
              <h6 className="m-0 mt-4 text-primary font-weight-500">
                305 Orders
              </h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
    </Grid>
  
    <Grid container spacing={3} className="mb-24">
      <Grid item xs={12} md={6}>
        <Card elevation={3} className="p-16">
          <div className="flex flex-middle">
            <Fab
              size="medium"
              className="bg-light-green circle-44 box-shadow-none"
            >
              <Icon className="text-green">trending_up</Icon>
            </Fab>
            <h5 className="font-weight-500 text-green m-0 ml-12">
              Active Users
            </h5>
          </div>
          <div className="pt-16 flex flex-middle">
            <h2 className="m-0 text-muted flex-grow-1">10.8k</h2>
            <div className="ml-12 small-circle bg-green text-white">
              <Icon className="small-icon">expand_less</Icon>
            </div>
            <span className="font-size-13 text-green ml-4"> (+21%)</span>
          </div>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card elevation={3} className="p-16">
          <div className="flex flex-middle">
            <Fab
              size="medium"
              className="bg-light-error circle-44 box-shadow-none overflow-hidden"
            >
              <Icon className="text-error">star_outline</Icon>
            </Fab>
            <h5 className="font-weight-500 text-error m-0 ml-12">
              Transactions
            </h5>
          </div>
          <div className="pt-16 flex flex-middle">
            <h2 className="m-0 text-muted flex-grow-1">$2.8M</h2>
            <div className="ml-12 small-circle bg-error text-white">
              <Icon className="small-icon">expand_less</Icon>
            </div>
            <span className="font-size-13 text-error ml-4">(+21%)</span>
          </div>
        </Card>
      </Grid>
    </Grid>
  
            </Grid>
          </Grid>
      </Fragment>
    );
  }
}

export default withStyles({}, { withTheme: true })(Dashboard1);
