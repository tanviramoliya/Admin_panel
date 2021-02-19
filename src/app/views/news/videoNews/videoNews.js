import React, { Component } from "react";
import {
  videoNewsListApi,
  deleteVideoNewsApi,
  addVideoNewsApi,
  updateVideoNewsApi,
} from "../../../../redux/actions/index";
import { status } from "../../../../utility/config";
import { toastr } from "react-redux-toastr";
import { Breadcrumb } from "../../../../components/matx/Breadcrumb";
import {
  Card, Button, Table,
  TableHead, TableRow, TableCell, TableBody, IconButton,
  Icon, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Grid, InputAdornment, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl, Chip, Avatar, Tooltip, Slide, Toolbar, AppBar, Typography
} from "@material-ui/core";
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PhoneIphone, Email, Person, GroupAdd } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import  history  from "../../../../history";




class videoNews extends Component {
  state = {
    videoNewsList: [],
    rowsPerPage: 8,
    page: 0,
    deleteModal: false,
    deleteVideoNewsId: null,
    openModal: false,
    videoNewsId: "",
    videoLink: "",
    title: "",
    description: "",
    publishedBy: "",
    city: "",
    state: "",
    country: "",
    createdTime: "",
    updatedTime: "",
    publishedTime: "",
    publish: "",
    critical: "",
    tags: "",
    type: "new"
  };
  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

  componentDidMount = async () => {
    await this.getVideoNewsList();
    // custom rule will have name 'isPasswordMatch'
  };

  getVideoNewsList = async () => {
    await this.props.videoNewsListApi();
    this.setState({ videoNewsList: this.props.videoNewsList });
  };
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };
  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };


  //to delete Category
  deletvideoNewsClicked = async (vId) => {
    if (vId) {
      this.setState({ deleteVideoNewsId: vId });
    }
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  };

  yesDeleteClicked = async () => {
    //call delete Api
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteVideoNewsId: null,
    });
    // this.props.setLoader(true);
    const deleteVideoNews = await deleteVideoNewsApi(
      this.state.deleteVideoNewsId
    );
    if (deleteVideoNews && deleteVideoNews.data.code === status.success) {
      await this.getVideoNewsList();
      toastr.success(deleteVideoNews.data.message);
    } else if (
      deleteVideoNews &&
      deleteVideoNews.data.code === status.badRequest
    ) {
      toastr.warning(deleteVideoNews.data.message);
    } else {
      toastr.error(deleteVideoNews.data.message);
    }
    // this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteVideoNewsId: null,
    });
  };
  // for open a modal
  setModel = (type, data) => {
    this.setState({ openModal: true, type: type });
    if (type === "edit") {
      this.setState({
        videoNewsId: data.videoNewsId,
        videoLink: data.videoLink,
        title: data.title,
        description: data.description,
        publishedBy: data.publishedBy,
        city: data.city,
        state: data.state,
        country: data.country,
        publish: data.publish,
        critical: data.critical,
        tags: data.tags,

      });
    }
  };
  //for close a modal
  handleClose = () => {
    this.setState({
      openModal: false,
      type: "new",
      videoNewsId: "",
      videoLink: "",
      title: "",
      description: "",
      publishedBy: "",
      city: "",
      state: "",
      country: "",
      createdTime: "",
      updatedTime: "",
      publishedTime: "",
      publish: "",
      critical: "",
      tags: "",

    });
  };
  AddVideoNews = async () => {
    const { type, firstName, lastName, role, email, contactNumber } = this.state;
    if (type === "new") {
      if (!firstName) {
        toastr.error("firstName is required");
        return;
      }
      if (!lastName) {
        toastr.error("lastName is required");
        return;
      }
      if (!role) {
        toastr.error("role is required");
        return;
      }
      if (!email) {
        toastr.error("email is required");
        return;
      }
      if (!contactNumber) {
        toastr.error("contactNumber is required");
        return;
      }

      // this.props.setLoader(true);
      // this.setState({
      //   addOrg: false,
      // });
      let data = {
        firstName: firstName,
        lastName: lastName,
        role: role,
        email: email,
        contactNumber: contactNumber
      };
      const createVideoNews = await addVideoNewsApi(data);
      if (createVideoNews) {
        if (createVideoNews.status === status.success) {
          if (createVideoNews.data.code === status.success) {
            toastr.success(createVideoNews.data.message);
            this.getVideoNewsList();
            this.setState({
              openModal: false,
              type: "new",
              adminId: "",
              adminToken: "",
              firstName: "",
              lastName: "",
              role: "",
              roleToken: "",
              email: "",
              contactNumber: ""

            });
          } else {
            toastr.warning(createVideoNews.data.message);
          }
        } else {
          toastr.error(createVideoNews.data.message);
        }
      }
      // this.props.setLoader(false);

    }
  };
  UpdateVideoNews = async () => {
    const {
      type,
      adminToken, firstName, lastName, role, email, contactNumber } = this.state;
    if (type === "edit") {
      if (!firstName) {
        toastr.error("firstName is required");
        return;
      }
      if (!lastName) {
        toastr.error("lastName is required");
        return;
      }
      if (!role) {
        toastr.error("role is required");
        return;
      }
      if (!email) {
        toastr.error("email is required");
        return;
      }
      if (!contactNumber) {
        toastr.error("contactNumber is required");
        return;
      }
      // if (!passWord) {
      //   toastr.error("password is required");
      //   return;
      // }
      // if (!confirmPassWord) {
      //   toastr.error("confirmPassword is required");
      //   return;
      // }
      // this.props.setLoader(true);
      // this.setState({
      //   addOrg: false,
      // });
      let data = {
        adminToken: adminToken,
        firstName: firstName,
        lastName: lastName,
        role: role,
        email: email,
        contactNumber: contactNumber
      };
      const updateVideoNews = await updateVideoNewsApi(data);
      if (updateVideoNews) {
        if (updateVideoNews.status === status.success) {
          if (updateVideoNews.data.code === status.success) {
            toastr.success(updateVideoNews.data.message);
            this.getVideoNewsList();
            this.setState({
              openModal: false,
              newsText: "",
              type: "new",
              adminToken: "",
              firstName: "",
              lastName: "",
              role: "",
              roleToken: "",
              email: "",
              contactNumber: ""
            });
          } else {
            toastr.warning(updateVideoNews.data.message);
          }
        } else {
          toastr.error(updateVideoNews.data.message);
        }
      }
      // this.props.setLoader(false);

    }
  };
  

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    const {
      page,
      rowsPerPage, videoNewsList,
      videoNewsId, videoLink, title, description, publishedBy, city, state, country, createdTime, updatedTime, publishedTime, publish, critical, tags,
      type,
      openModal

    } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
        <Breadcrumb
            routeSegments={[
              { name: "News", path: "/news/videoNews" },
              { name: "Video News" },
            ]}
          />
        </div>
          <div className="py-12">
          <Card elevation={6} className="px-24 pt-12 h-100">
            <div className="flex flex-middle flex-space-between pb-12">
              <div className="card-title">Vidoe News Infromation</div>
              <Button
                className="capitalize text-white bg-circle-primary"
                onClick={() => this.props.history.push('/news/videoNews/edit')}
              >
                Add Video News
                  </Button>
            </div>
            <TableContainer style={{ maxHeight: "405px" }}>
              <Table style={{ whiteSpace: "pre" }} stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0"  >VidoeNewsId</TableCell>
                    <TableCell className="px-0" >title</TableCell>
                    <TableCell className="px-0"  >Location</TableCell>
                    <TableCell className="px-0" >publish</TableCell>
                    <TableCell className="px-0" >critical</TableCell>
                    <TableCell className="px-0" >publishedBy</TableCell>
                    <TableCell className="px-0" >CreatedTime</TableCell>
                    <TableCell className="px-0"  >Actions</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {videoNewsList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((VideoNews, index) => (
                      <TableRow key={index}>
                        <TableCell className="ellipse p-0" >
                          {VideoNews.videoNewsId}
                        </TableCell>
                        <TableCell className="ellipse p-0" >
                          {VideoNews.title}
                        </TableCell>
                        <TableCell className="ellipse p-0">
                          {VideoNews.city + "," + VideoNews.state + "," + VideoNews.country}
                        </TableCell>
                        <TableCell className="ellipse p-0" >
                          {VideoNews.publish}
                        </TableCell>
                        <TableCell className="ellipse p-0" >
                          {VideoNews.critical}
                        </TableCell>
                        <TableCell className="ellipse p-0">
                          {VideoNews.publishedBy}
                        </TableCell>
                        <TableCell className="ellipse p-0" >
                          {VideoNews.CreatedTime}
                        </TableCell>

                        <TableCell className="p-0">
                          <IconButton className="p-8">
                            <Icon
                              color="primary"
                              onClick={() => this.setModel("edit", VideoNews)}
                            >
                              edit
                                </Icon>
                          </IconButton>
                          <IconButton className="p-8">
                            <Icon
                              color="error"
                              onClick={() =>
                                this.deleteAdminUserClicked(VideoNews.videoNewsId)
                              }
                            >
                              delete
                                </Icon>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              className="px-16"
              rowsPerPageOptions={[8, 16, 24]}
              component="div"
              count={videoNewsList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "Previous Page",
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page",
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />

          </Card>
          </div>
          <div>
          <ConfirmationDialog
            open={this.state.deleteModal}
            title="Delete Confirmation"
            message={"are you sure want to delete this Admin User?"}
            toggle={this.deletvideoNewsClicked}
            onYesClick={() =>
              this.yesDeleteClicked(this.state.deleteVideoNewsId)
            }
            onNoClick={this.noDeleteClicked}
          />
          </div>
          <div>
          <Dialog fullScreen open={openModal} onClose={this.handleClose} TransitionComponent={this.Transition}>
          <AppBar position="relative">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className="capitalize text-white"
 >
              Sound
            </Typography>
            <Button autoFocus color="secondary" onClick={this.handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
            <DialogTitle id="form-dialog-title" >
              {type === "new" ? <div style={{ display: "contents" }}>Add a Video News</div> : "Edit Video News"}
            </DialogTitle>
            {/* <DialogContent>
              <ValidatorForm
                ref="form"
                onSubmit={
                  type === "new" ? this.AddAdminUser : this.UpdateAdminUser
                }
                onError={(errors) => null}
              >
                <Grid container spacing={1} >
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextValidator
                      className="mb-16 "
                      label="first Name"

                      onChange={this.handleChange}

                      name="firstName"
                      placeholder="Enter First Name"
                      value={firstName}
                      validators={["required", "minStringLength: 2"]}
                      errorMessages={["this field is required"]}
                      style={{ width: "-webkit-fill-available" }}
                      variant="outlined"
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextValidator
                      className="mb-16 "
                      label="last Name"
                      onChange={this.handleChange}
                      placeholder="Enter Last Name"
                      type="text"
                      name="lastName"
                      value={lastName}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                      style={{ width: "-webkit-fill-available" }}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <TextValidator
                  className="mb-16 "
                  label="role"
                  onChange={this.handleChange}
                  type="text"
                  name="role"
                  value={role}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  style={{ width: "-webkit-fill-available" }}
                  variant="outlined"
                />

                <TextValidator
                  className="mb-16 "
                  label="email"
                  placeholder="Enter Email"
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  value={email}
                  validators={["required", "isEmail"]}
                  errorMessages={["this field is required", "Enter valid email"]}
                  style={{ width: "-webkit-fill-available" }}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextValidator
                  className="mb-16 "
                  label="contact Number"
                  onChange={this.handleChange}
                  type="number"
                  name="contactNumber"
                  placeholder="Enter Contact Number"
                  value={contactNumber}
                  validators={["required", "minStringLength:10",
                    "maxStringLength: 10"]}
                  errorMessages={["this field is required", "Contact Number must contains 10 digits", "Contact Number must contains 10 digits"]}
                  style={{ width: "-webkit-fill-available" }}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIphone />
                      </InputAdornment>
                    ),
                  }}
                />

                <DialogActions className="p-0">
                  <div className="swiper-container-no-flexbox">
                    <Tooltip title="Password will generated by The System" placement="right">

                      <IconButton className="p-0">
                        <Icon>info_outlined</Icon>
                      </IconButton>
                    </Tooltip>
                  </div>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                        </Button>
                  {type === "new" ? (
                    <Button color="primary" type="submit">
                      Add
                          </Button>
                  ) : (
                      <Button color="primary" type="submit">
                        Save
                          </Button>
                    )}
                </DialogActions>
              </ValidatorForm>
            </DialogContent> */}
          </Dialog>
          </div>
        </div>
      
    );
  }
}
const mapStateToProps = (state) => {
  const { videoNewsList } = state.videoNews;
  return {
    videoNewsList

  };
};

export default connect(mapStateToProps, { videoNewsListApi, addVideoNewsApi })(
  videoNews
);