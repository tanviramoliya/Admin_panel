import React, { Component, Fragment } from "react";
import { Grid, Card, Icon, IconButton, Tooltip, Chip, FormControl, Select, MenuItem, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core";

import { withStyles } from "@material-ui/styles";
import {
  getAdminCountApi,getTodaysCommentCountApi,updateLIVEURLApi, getLIVEURLApi, getPublishNewsCountApi, getSubscriberCountApi, getInquiryCountApi, getMasterCountApi, getNewsHeadlineCountApi, getNewsByNewsTypeCountApi

} from "../../../redux/actions/index";
import { status } from "../../../utility/config";
import { red } from "@material-ui/core/colors";
import AccessDeniedPage from "../sessions/accessdeniedPage";
import { ValidatorForm } from "react-material-ui-form-validator";
import { toastr } from "react-redux-toastr";
import { setLoader } from "../../../redux/actions/loaderAction/loaderAction";
import {connect} from "react-redux";




class Dashboard1 extends Component {
  state = {
    adminCardData: "",
    subscriberCardData: "",
    inquiryCardData: "",
    subscriberFilterBy: "today",
    masterFilterBy: "category",
    masterCardData: "",
    newsHeadlineCardData: "",
    newsByNewsTypeCardData: '',
    articleCountForNewsType: 0,
    newsTypeForNews: "",
    videoCountForNewsType: 0,
    todaysCommentsData : '',
    permission: true,
    publishNewsCardData: "",
    openLiveModel: false,
    liveURL: '',
    liveURLToken: '',
    liveURL1 : ''
  };

  componentDidMount = async () => {
    const perData = JSON.parse(localStorage.getItem("permission"));
    if (perData && perData[0].key === 'Dashboard' && perData[0].value === "N/A") {
      this.setState({ permission: false });
      return false;
    }
    this.getPublishNewsCount();
    this.getAdminCount();
    this.getSubscriberCount();
    this.getInquiryCount();
    this.getMasterCount();
    this.getNewsHeadlineCount();
    this.getNewsByNewsTypeCount();
    this.getLiveUrl();
    this.getTodaysCommentsCount();
  }
  getPublishNewsCount = async () => {
    const publishNewsCount = await getPublishNewsCountApi();
    if (publishNewsCount) {
      if (publishNewsCount.status === status.success) {
        this.setState({
          publishNewsCardData: publishNewsCount.data
        });

      }
    }
  };
  getLiveUrl = async () => {
    const liveUrl = await getLIVEURLApi();
    if (liveUrl) {
      if (liveUrl.status === status.success) {

        if(liveUrl.data.data){
          this.setState({
            liveURL1: liveUrl.data.data.url,
            liveURL: liveUrl.data.data.url,
            liveURLToken : liveUrl.data.data.token
          });
        }
      }
    }
  };

  updateLiveUrl = async () => {
    const {
      liveURL,
      liveURLToken
    } = this.state;
    
    let data = new FormData();
    data.append("url",liveURL);
    data.append("token",liveURLToken);
    this.props.setLoader(true);
    const updateLiveUrl = await updateLIVEURLApi(data);
    if (updateLiveUrl) {
      if (updateLiveUrl.status === status.success) {
        if (updateLiveUrl.data.code === status.success) {
          toastr.success(updateLiveUrl.data.message);

          this.getLiveUrl();
          this.setState({openLiveModel:false})
         
        } else {
          toastr.warning(updateLiveUrl.data.message);
        }
      } else {
        toastr.error(updateLiveUrl.data.message);
      }
    }
    this.props.setLoader(false);
    
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
  getTodaysCommentsCount = async () => {
    const commentCount = await getTodaysCommentCountApi();
    if (commentCount) {
      if (commentCount.status === status.success) {

        this.setState({
          todaysCommentsData : commentCount.data.data
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
  getNewsHeadlineCount = async () => {
    const newsHeadlineCount = await getNewsHeadlineCountApi();
    if (newsHeadlineCount) {
      if (newsHeadlineCount.status === status.success) {

        this.setState({
          newsHeadlineCardData: newsHeadlineCount.data
        });

      }
    }
  };
  getNewsByNewsTypeCount = async () => {
    const newsByNewsTypeCount = await getNewsByNewsTypeCountApi();
    if (newsByNewsTypeCount) {
      if (newsByNewsTypeCount.status === status.success) {

        this.setState({
          newsByNewsTypeCardData: newsByNewsTypeCount.data
        });

      }
    }
  };

  
  handleNewsType = (newsType) => {
    this.setState({
      articleCountForNewsType: newsType.article,
      videoCountForNewsType: newsType.video
    })
  }

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    let { theme } = this.props;
    const { openLiveModel, liveURL,liveURL1,todaysCommentsData, adminCardData, publishNewsCardData, newsTypeForNews, newsByNewsTypeCardData, articleCountForNewsType, videoCountForNewsType, subscriberFilterBy, subscriberCardData, inquiryCardData, masterFilterBy, masterCardData, newsHeadlineCardData, permission } = this.state;
    if (!permission) {
      return (
        <AccessDeniedPage />
      )
    }
    else {

      return (
        <Fragment>
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12} className="m-20">
              <Grid container spacing={3} className="mb-24">
                <Grid item xs={12} md={3}>
                  <Card elevation={3} className="p-16">
                    <div className="flex flex-middle">
                      <Icon
                        style={{
                          fontSize: "44px",
                          opacity: 0.6,
                          color: theme.palette.primary.main,
                        }}
                      >
                        publish
                      </Icon>
                      <div className="ml-12">
                        <medium className="text-muted">Published Articles</medium>
                        <h6 className="m-0 mt-4 text-primary font-weight-500">
                          {publishNewsCardData.articleNews}
                        </h6>
                      </div>
                    </div>

                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card elevation={3} className="p-16">
                    <div className="flex flex-middle">
                      <Icon
                        style={{
                          fontSize: "44px",
                          opacity: 0.6,
                          color: theme.palette.primary.main,
                        }}
                      >
                        publish
                      </Icon>
                      <div className="ml-12">
                        <medium className="text-muted">Published Videos</medium>
                        <h6 className="m-0 mt-4 text-primary font-weight-500">
                          {publishNewsCardData.videoNews}
                        </h6>
                      </div>
                    </div>

                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card elevation={3} className="p-16">
                    <div className="flex flex-start">
                      <Icon
                        style={{
                          fontSize: "44px",
                          opacity: 0.6,
                          color: theme.palette.primary.main,
                        }}
                      >
                        widgets
                      </Icon>
                      <div className="ml-12">
                        <medium className="text-muted">Todays News Headline</medium>
                        <h6 className="m-0 mt-4 text-primary font-weight-500">
                          Total : {newsHeadlineCardData.totalCount}
                        </h6>
                      </div>
                      <h2 style={{ marginBottom: 0, flex: 2, textAlign: "right", alignSelf: "center" }}>{newsHeadlineCardData.today}</h2>
                    </div>

                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card elevation={3} className="p-16">
                    <div className="flex flex-middle">
                      <Icon
                        style={{
                          fontSize: "44px",
                          opacity: 0.6,
                          color: theme.palette.primary.main,
                        }}
                      >
                        description
                      </Icon>
                      <div className="ml-12" style={{ flex: 2 }}>
                        <medium className="text-muted">News by News Type</medium>
                        <h6 className="m-0 mt-4 text-primary font-weight-500">
                          {newsByNewsTypeCardData.totalCount} News Types
                        </h6>
                      </div>
                      <div className="ml-12">
                        <FormControl style={{ width: 200 }}>
                          <Select
                            id="filter"
                            name="newsTypeForNews"
                            onChange={this.handleChange}
                            value={newsTypeForNews}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                          >
                            {newsByNewsTypeCardData && newsByNewsTypeCardData.data ? newsByNewsTypeCardData.data.map((newsType) => (
                              <MenuItem value={newsType.key} onClick={() => this.handleNewsType(newsType)} >{newsType.key} </MenuItem>

                            )) : null}

                          </Select>

                        </FormControl>
                      </div>
                    </div>
                    <div className=" px-56 pt-16 flex flex-middle flex-space-between">


                      <Chip icon={<Icon>assignment</Icon>} label={'Article News : ' + articleCountForNewsType} variant="outlined" color="primary" />
                      <Chip icon={<Icon>video_library</Icon>} label={'Video News : ' + videoCountForNewsType} variant="outlined" color="primary" />



                    </div>

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
                        <Select
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
                        <h2 className="m-0 text-muted flex-grow-1"> {(subscriberCardData ? subscriberCardData[subscriberFilterBy] : 0) + " / " + (subscriberCardData ? subscriberCardData.totalCount : 0)}</h2>

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
                  <Card elevation={3} className="p-16">
                    <div className="flex flex-start">
                      <i className="fa fa-podcast" style={{ fontSize: "44px", opacity: 0.6, color: red[500]}}></i>

                      <div className="ml-12">
                        <medium className="text-muted">Live News URL</medium>
                        <h6 className="m-0 mt-4 text-primary font-weight-500">
                          {liveURL1}
                        </h6>
                      </div>
                      <div style={{ marginBottom: 0, flex: 2, textAlign: "right", alignSelf: "center" }}>
                        <IconButton onClick={() => this.setState({ openLiveModel: true })}>
                          <Icon style={{color : red[500]}}>edit</Icon>
                        </IconButton>
                      </div>

                    </div>

                  </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Card elevation={3} className="p-16">
                    <div className="flex flex-middle">

                      <Icon
                        style={{
                          fontSize: "44px",
                          opacity: 0.6,
                          color: theme.palette.primary.main,

                        }}
                      >
                        live_help
                      </Icon>
                      <div className="ml-12" style={{ flex: 2 }}>
                        <medium className="text-muted">Total Inquiries</medium>
                        <h6 className="m-0 mt-4  text-primary font-weight-500">
                          Total : {inquiryCardData.totalCount}
                        </h6>
                      </div>
                      <Tooltip title="View Inquires Details" placement="top">
                        <IconButton onClick={() =>  this.props.history.push('/inquiry')}>
                          <Icon >arrow_right_alt</Icon>
                        </IconButton>
                      </Tooltip>
                    </div>

                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card elevation={3} className="p-16">
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
                        <medium className="text-muted">Unsolved Inquiries</medium>
                        <h6 className="m-0 mt-4  text-error font-weight-500">
                          Unsolved : {inquiryCardData.unreadInquery}
                        </h6>
                      </div>

                    </div>



                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card elevation={3} className="p-16">
                    <div className="flex flex-start">
                      <Icon
                        style={{
                          fontSize: "44px",
                          opacity: 0.6,
                          color: theme.palette.primary.main,
                        }}
                      >
                        question_answer
                      </Icon>
                      <div className="ml-12">
                        <medium className="text-muted">Todays News Comments</medium>
                        <h6 className="m-0 mt-4 text-primary font-weight-500">
                          Total : {todaysCommentsData.total}
                        </h6>
                      </div>
                      <h2 style={{ marginBottom: 0, flex: 2, textAlign: "right", alignSelf: "center" }}>{todaysCommentsData.today}</h2>
                    </div>

                  </Card>
                </Grid>
             
             </Grid>
            </Grid>
          </Grid>
          <div>
            <Dialog
              open={openLiveModel}
              aria-labelledby="form-dialog-title"
              fullWidth={true}
            >
              <DialogTitle id="form-dialog-title">
                {"Update Live URL"}
              </DialogTitle>
              <DialogContent>
                <ValidatorForm
                  ref="form"
                  onSubmit={this.updateLiveUrl}
                  onError={(errors) => null}
                >
                  <FormControl
                    style={{ width: "-webkit-fill-available" }}
                  // error={!serialNo}
                  >
                    <TextField
                      className="mb-16 w-100"
                      label="Live News URL"
                      onChange={this.handleChange}
                      type="url"
                      name="liveURL"
                      placeholder="Enter Live News URL"
                      variant="outlined"
                      value={liveURL}
                      
                    />
                  </FormControl>

                  <DialogActions className="p-0">
                    <Button onClick={() => this.setState({openLiveModel:false})} color="primary">
                      Cancel
                  </Button>

                    <Button color="primary" type="submit">
                      Update
                    </Button>

                  </DialogActions>
                </ValidatorForm>
              </DialogContent>
            </Dialog>
          </div>
        </Fragment>
      );
    }
  }
}
const mapStateToProps = (state) => {  
  return {}
};

export default withStyles({}, { withTheme: true })(
  connect(
    mapStateToProps,
    {setLoader,getLIVEURLApi,updateLIVEURLApi}
  )(Dashboard1)
);

// export default withStyles({}, { withTheme: true })(Dashboard1);
