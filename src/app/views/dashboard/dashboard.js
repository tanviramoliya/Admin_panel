import React, { Component, Fragment } from "react";
import { Grid, Card, Icon, IconButton, Tooltip, Fab, Chip, FormControl, Select, MenuItem, FormHelperText, InputLabel, Typography } from "@material-ui/core";

import { withStyles } from "@material-ui/styles";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import {
  getAdminCountApi, getSubscriberCountApi, getInquiryCountApi, getMasterCountApi

} from "../../../redux/actions/index";
import { status } from "../../../utility/config";
import { red } from "@material-ui/core/colors";
import AccessDeniedPage from "../sessions/accessdeniedPage";

class Dashboard1 extends Component {
  state = {
    adminCardData: "",
    subscriberCardData: "",
    inquiryCardData: "",
    subscriberFilterBy: "",
    masterFilterBy: "category",
    masterCardData: "",
    permission:true
  };

  componentDidMount = async () => {
    const perData = JSON.parse(localStorage.getItem("permission"));
    if(perData[0].key === 'Dashboard' && perData[0].value === "N/A"){      
      this.setState({permission:false});
      return false;
    }
    this.getAdminCount();
    this.getSubscriberCount();
    this.getInquiryCount();
    this.getMasterCount();
  }
  getAdminCount = async () => {
    const adminCount = await getAdminCountApi();
    if (adminCount) {
      if (adminCount.status === status.success) {
        this.setState({
          adminCardData: adminCount.data
        });

      }
    }
  };
  getSubscriberCount = async () => {
    const subscriberCount = await getSubscriberCountApi();
    if (subscriberCount) {
      if (subscriberCount.status === status.success) {

        this.setState({
          subscriberCardData: subscriberCount.data
        });

      }
    }
  };
  getMasterCount = async () => {
    const masterCount = await getMasterCountApi();
    if (masterCount) {
      if (masterCount.status === status.success) {
        this.setState({
          masterCardData: masterCount.data
        });

      }
    }
  };
  getInquiryCount = async () => {
    const inqueryCount = await getInquiryCountApi();
    if (inqueryCount) {
      if (inqueryCount.status === status.success) {

        this.setState({
          inquiryCardData: inqueryCount.data
        });

      }
    }
  };
  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    let { theme } = this.props;
    const { adminCardData, subscriberFilterBy, subscriberCardData, inquiryCardData, masterFilterBy, masterCardData,permission } = this.state;
   

    if (!Cookies.get("GNTV-SESSIONID")) {
      return <Redirect to="/login" />;
    }
    else {
      if (!permission) {
        return (
          <AccessDeniedPage/>
        )
      }
      else {

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
                            color: theme.palette.primary.main,
                          }}
                        >
                          group
                      </Icon>
                        <div className="ml-12">
                          <small className="text-muted">New Leads</small>
                          <h6 className="m-0 mt-4 text-primary font-weight-500">
                            3050
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
                            color: theme.palette.primary.main,
                          }}
                        >
                          attach_money
                      </Icon>
                        <div className="ml-12">
                          <small className="text-muted">This week Sales</small>
                          <h6 className="m-0 mt-4 text-primary font-weight-500">
                            $80500
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
                            color: theme.palette.primary.main,
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
                    <Card elevation={3} className="p-16">
                      <div className="flex flex-middle flex-space-between">
                        <Icon
                          style={{
                            fontSize: "44px",
                            opacity: 0.6,
                            color: theme.palette.primary.main,
                          }}
                        >
                          subscriptions
                      </Icon>
                        <div className="ml-12" style={{ flex: 2 }}>
                          <medium className="text-muted">GNTV Subscriber</medium>
                          <h6 className="m-0 mt-4 text-primary font-weight-500">
                            Total : {subscriberCardData.totalCount}
                          </h6>
                        </div>

                        <Tooltip title="View Details" placement="top">
                          <IconButton>
                            <Icon>arrow_right_alt</Icon>
                          </IconButton>
                        </Tooltip>
                      </div>
                      <div className="pl-56 pt-4 flex flex-middle flex-space-between">
                        <FormControl style={{ width: 200 }}>
                          <InputLabel id="demo-controlled-open-select-label">Filter By</InputLabel>
                          <Select
                            labelId="demo-controlled-open-select-label"
                            id="filter"
                            name="subscriberFilterBy"
                            onChange={this.handleChange}
                            value={subscriberFilterBy}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                          >
                            <MenuItem value={'today'}>Todays</MenuItem>
                            <MenuItem value={'week'}>This Week</MenuItem>
                            <MenuItem value={'month'}>This Month</MenuItem>
                          </Select>

                        </FormControl>
                        <div className="pt-12">
                          <h2 className="m-0 text-muted flex-grow-1"> {subscriberFilterBy ? subscriberCardData[subscriberFilterBy] : '0'} {" / " + subscriberCardData.totalCount}</h2>

                        </div>
                      </div>
                    </Card>
                  </Grid>
                </Grid>

                <Grid container spacing={3} className="mb-24">
                  <Grid item xs={12} md={6}>
                    <Card elevation={3} className="p-16">
                      <div className="flex flex-middle flex-start">
                        <Icon
                          style={{
                            fontSize: "44px",
                            opacity: 0.6,
                            color: theme.palette.primary.main,
                          }}
                        >
                          group
                      </Icon>
                        <div className="ml-12">
                          <medium className="text-muted">Active Admin Users</medium>
                          <h6 className="m-0 mt-4 text-primary font-weight-500">
                            Total : {adminCardData.totalCount}
                          </h6>
                        </div>
                        {/* <h5 className="font-weight-500 text-green m-0 ml-12" style={{flex:2}}>
                        Active Admin Users
                      </h5> */}
                      </div>
                      <div className=" px-56 pt-16 flex flex-middle flex-space-between">
                        {
                          adminCardData && adminCardData.data !== [] ? adminCardData
                            .data.map((AdminData, index) => (

                              <Chip label={AdminData.role + ' : ' + AdminData.count} variant="outlined" color="primary" />
                            )) : null
                        }

                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card elevation={3} className="p-16">
                      <div className="flex flex-middle flex-start">
                        <Icon
                          style={{
                            fontSize: "44px",
                            opacity: 0.6,
                            color: theme.palette.primary.main,
                          }}
                        >
                          trending_up
                      </Icon>
                        <div className="ml-12" style={{ flex: 2 }}>
                          <medium className="text-muted">Active Master Data</medium>

                        </div>
                        <div className="ml-12">
                          <FormControl style={{ width: 200 }}>
                            <Select
                              id="filter"
                              name="masterFilterBy"
                              onChange={this.handleChange}
                              value={masterFilterBy}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem value={'category'}>Category</MenuItem>
                              <MenuItem value={'subCategory'}>Sub Category</MenuItem>
                              <MenuItem value={'newsType'}>News type</MenuItem>
                            </Select>

                          </FormControl>
                        </div>

                      </div>
                      <div className=" px-56 pt-16 flex flex-middle flex-space-between">
                        {
                          masterCardData ? <>
                            <Chip label={'Active : ' + masterCardData[masterFilterBy].active} variant="outlined" color="primary" />
                            <Chip label={'InActive : ' + masterCardData[masterFilterBy].unActive} variant="outlined" color="primary" />
                            <Chip label={'Total : ' + masterCardData[masterFilterBy].totalCount} variant="outlined" color="primary" />
                          </>

                            : null
                        }

                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card className="play-card p-sm-24 bg-paper" elevation={6}>
                      <div className="flex flex-middle">

                        <Icon
                          style={{
                            fontSize: "44px",
                            opacity: 0.6,
                            color: red[500],
                          }}
                        >
                          live_help
                      </Icon>
                        <div className="ml-12" style={{ flex: 2 }}>
                          <medium className="text-muted">User's Inquiries</medium>
                          <h6 className="m-0 mt-4  text-error font-weight-500">
                            {(inquiryCardData.totalCount - inquiryCardData.unreadInquery) + ' / ' + inquiryCardData.totalCount} Inquiries Solved
                        </h6>
                        </div>

                      </div>
                      <Tooltip title="Unsolved Inquires Details" placement="top">
                        <IconButton>
                          <Icon>arrow_right_alt</Icon>
                        </IconButton>
                      </Tooltip>


                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Fragment>
        );
      }
    }

  }
}

export default withStyles({}, { withTheme: true })(Dashboard1);
