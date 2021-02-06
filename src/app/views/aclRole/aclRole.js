import React, { Component, Fragment } from "react"; import {
  aclRoleListApi,
  deleteAclRoleApi,
  addAclRoleApi,
  updateAclRoleApi,
} from "../../../redux/actions/index";
import { status } from "../../../utility/config";
import { toastr } from "react-redux-toastr";
import { Breadcrumb } from "../../../components/matx/Breadcrumb";
import {
  Card, Button, Table,
  TableHead, TableRow, TableCell, TableBody, IconButton,
  Icon, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Grid, InputAdornment, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl, Chip, Avatar, Tooltip, CardActions, CardContent, Typography, createMuiTheme, MuiThemeProvider, Divider, Checkbox, FormGroup, FormHelperText
} from "@material-ui/core";
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PhoneIphone, Email, Person, GroupAdd, CheckBox } from '@material-ui/icons';

import { withStyles } from "@material-ui/styles";
import { purple, blue, red } from "@material-ui/core/colors";
const theme = createMuiTheme({

  palette: {
    secondary: red,
  },

});
class AclRole extends Component {

  state = {
    aclRoleList: [],
    rowsPerPage: 8,
    page: 0,
    deleteModal: false,
    deleteAclRoleToken: null,
    openModal: false,
    openCard: false,
    roleToken: "",
    roleType: "",
    createdDate: "",
    updateDate: "",
    permission: "",
    type: "new"

  };

  componentDidMount = async () => {
    await this.getAclRoleList();
    // custom rule will have name 'isPasswordMatch'
  };

  getAclRoleList = async () => {
    await this.props.aclRoleListApi();
    this.setState({ aclRoleList: this.props.aclRoleList });
  };
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };
  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };


  //to delete Category
  deleteAclRoleClicked = async (token) => {
    if (token) {
      this.setState({ deleteAclRoleToken: token });
    }
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  };

  yesDeleteClicked = async () => {
    //call delete Api
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteAclRoleToken: null,
    });
    // this.props.setLoader(true);
    const deleteAclRole = await deleteAclRoleApi(
      this.state.deleteAclRoleToken
    );
    if (deleteAclRole && deleteAclRole.data.code === status.success) {
      await this.getAclRoleList();
      toastr.success(deleteAclRole.data.message);
    } else if (
      deleteAclRole &&
      deleteAclRole.data.code === status.badRequest
    ) {
      toastr.warning(deleteAclRole.data.message);
    } else {
      toastr.error(deleteAclRole.data.message);
    }
    // this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteAclRoleToken: null,
    });
  };
  // for open a modal
  setModel = (type, data) => {
    this.setState({ openModal: true, type: type });
    if (type === "edit") {
      this.setState({

        roleToken: data.roleToken,
        roleType: data.roleType,
        createdDate: data.createdDate,
        updateDate: data.updateDate,
        permission: data.permission

      });
    }
  };
  handleClick = () => {
    this.setState({ openCard: !this.state.openCard })
    console.log('click---' + this.state.openCard);
  };

  //for close a modal
  handleClose = () => {
    this.setState({
      openModal: false,
      type: "new",
      roleToken: "",
      roleType: "",
      createdDate: "",
      updateDate: "",
      permission: "",


    });
  };
  AddAdminUser = async () => {
    const { type, roleType, permission } = this.state;
    if (type === "new") {
      if (!roleType) {
        toastr.error("roleType is required");
        return;
      }
      if (!permission) {
        toastr.error("permission is required");
        return;
      }

      // this.props.setLoader(true);
      // this.setState({
      //   addOrg: false,
      // });
      let data = {
        roleType: roleType,
        permission: permission

      };
      const createAclRole = await addAclRoleApi(data);
      if (createAclRole) {
        if (createAclRole.status === status.success) {
          if (createAclRole.data.code === status.success) {
            toastr.success(createAclRole.data.message);
            this.getAclRoleList();
            this.setState({
              openModal: false,
              deleteModal: false,
              deleteAclRoleToken: null,
              openCard: false,
              roleToken: "",
              roleType: "",
              createdDate: "",
              updateDate: "",
              permission: "",
              type: "new"

            });
          } else {
            toastr.warning(createAclRole.data.message);
          }
        } else {
          toastr.error(createAclRole.data.message);
        }
      }
      // this.props.setLoader(false);

    }
  };
  UpdateAclRole = async () => {
    const {
      type,
      roleToken, roleType, permission } = this.state;
    if (type === "edit") {
      if (!roleType) {
        toastr.error("firstName is required");
        return;
      }
      if (!permission) {
        toastr.error("lastName is required");
        return;
      }

      // this.props.setLoader(true);
      // this.setState({
      //   addOrg: false,
      // });
      let data = {

        roleToken: roleToken,
        roleType: roleType,
        permission: permission,

      };
      const updateAclRole = await updateAclRoleApi(data);
      if (updateAclRole) {
        if (updateAclRole.status === status.success) {
          if (updateAclRole.data.code === status.success) {
            toastr.success(updateAclRole.data.message);
            this.getAclRoleList();
            this.setState({
              openModal: false,
              type: "new",
              roleToken: "",
              roleType: "",
              createdDate: "",
              updateDate: "",
              permission: "",
            });
          } else {
            toastr.warning(updateAclRole.data.message);
          }
        } else {
          toastr.error(updateAclRole.data.message);
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
      openCard,
      page,
      rowsPerPage,
      aclRoleList,
      roleToken,
      roleType,
      createdDate,
      updateDate,
      permission,
      type,
      openModal

    } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "User Role", path: "/" },

            ]}
          />
        </div>
        <div className="py-12">
          <Card elevation={6} className="px-20 pt-12 h-100">
            <div className="flex flex-middle flex-space-between pb-12">
              <div className="card-title">User Role And Permission</div>
              <Button
                className="capitalize text-white bg-circle-primary"
                onClick={() => this.setModel("new")}
              >
                Add New Role
                  </Button>
            </div>
          </Card>
          <Grid container className="pt-20">
            {aclRoleList.map((AclRole, index) => (
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Card elevation={6}>
                  <CardContent>
                    <Typography variant="h4" className="text-green">AclRole.roleType</Typography>
                    <Divider />

                  </CardContent>
                  <CardActions>
                    <Grid justify="space-between" container spacing={24}>
                      <Grid item>
                        <MuiThemeProvider theme={theme}>
                          <Button size="small" variant="outlined" color="primary" onClick={() => this.setModel("edit", AclRole)} endIcon={<Icon>edit</Icon>}>Edit Role</Button>
                        </MuiThemeProvider>
                      </Grid>
                      <Grid item >
                        <Button size="small" name="openCard" onClick={this.handleClick}><Icon>expand_more</Icon></Button>
                      </Grid>
                      <Grid item>
                        <MuiThemeProvider theme={theme}>
                          <Button size="small" color="secondary"
                            variant="outlined" onClick={() =>
                              this.deleteAdminUserClicked(AclRole.roleToken)
                            } endIcon={<Icon>delete</Icon>}>Delete Role</Button>
                        </MuiThemeProvider>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {openCard ?
            <Grid container className="pt-20" >
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography style={{ textAlign: "center" }}>Permissions</Typography>
                    <Divider />
                  </CardContent>
                  <div>



                    <Grid container spacing={12} >
                      <Grid item xl={12} spacing={6}>
                        <Grid item container >
                          <Grid item style={{ alignSelf: "center", paddingLeft: "20px" }} >
                            <Typography  >Permissions
                        </Typography>
                          </Grid>
                          <Grid item>
                            <Typography  >RW</Typography>
                          </Grid>
                          <Grid item>
                            <Typography  >RO</Typography>
                          </Grid>

                        </Grid>
                      </Grid>

                      <Grid item >

                        <Grid item container>
                          <Grid item style={{ alignSelf: "center" }} >
                            <Typography >Permissions
                        </Typography>
                          </Grid>
                          <Grid item>
                            <Typography  >RW</Typography>
                          </Grid>
                          <Grid item>
                            <Typography  >RO</Typography>
                          </Grid>

                        </Grid>
                        </Grid>
                        </Grid>

                      <Grid container spacing={12} justify="center">
                        <Grid item xl={12} spacing={6}>

                          <Grid item container>
                            <Grid item style={{ alignSelf: "center" }} >
                              <Typography  >UserManagement
                        </Typography>
                            </Grid>
                            <Grid item>
                              <Checkbox
                                defaultChecked
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                            </Grid>
                            <Grid item>
                              <Checkbox

                                color="secondary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                              />
                            </Grid>

                          </Grid>
                        </Grid>

                        <Grid item xl={12} spacing={6}>

                          <Grid item container >
                            <Grid item style={{ alignSelf: "center" }} >
                              <Typography  >UserManagement
                        </Typography>
                            </Grid>
                            <Grid item>
                              <Checkbox
                                defaultChecked
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                            </Grid>
                            <Grid item>
                              <Checkbox

                                color="secondary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                              />
                            </Grid>

                          </Grid>
                        </Grid>

                      </Grid>
                      <Grid container spacing={12} justify="center">
                        <Grid item xl={12} spacing={6}>

                          <Grid item container >
                            <Grid item style={{ alignSelf: "center" }} >
                              <Typography  >UserManagement
                        </Typography>
                            </Grid>
                            <Grid item>
                              <Checkbox
                                defaultChecked
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                            </Grid>
                            <Grid item>
                              <Checkbox

                                color="secondary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                              />
                            </Grid>

                          </Grid>
                        </Grid>

                        <Grid item xl={12} spacing={6}>

                          <Grid item container >
                            <Grid item style={{ alignSelf: "center" }} >
                              <Typography  >UserManagement
                        </Typography>
                            </Grid>
                            <Grid item>
                              <Checkbox
                                defaultChecked
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                            </Grid>
                            <Grid item>
                              <Checkbox

                                color="secondary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                              />
                            </Grid>

                          </Grid>
                        </Grid>

                      </Grid>
                      <Grid container spacing={12} justify="center">
                        <Grid item xl={12} spacing={6}>

                          <Grid item container >
                            <Grid item style={{ alignSelf: "center" }} >
                              <Typography  >UserManagement
                        </Typography>
                            </Grid>
                            <Grid item>
                              <Checkbox
                                defaultChecked
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                            </Grid>
                            <Grid item>
                              <Checkbox

                                color="secondary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                              />
                            </Grid>

                          </Grid>
                        </Grid>

                        <Grid item xl={12} spacing={6}>

                          <Grid item container>
                            <Grid item style={{ alignSelf: "center" }} >
                              <Typography  >UserManagement
                        </Typography>
                            </Grid>
                            <Grid item>
                              <Checkbox
                                defaultChecked
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}

                              />
                            </Grid>
                            <Grid item>
                              <Checkbox

                                color="secondary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                              />
                            </Grid>

                          </Grid>
                        </Grid>

                      </Grid>

                  </div>
                    <CardActions>
                    </CardActions>
                </Card>
            </Grid>
              </Grid>
              : null}
      
        </div>
            <div>
              <ConfirmationDialog
                open={this.state.deleteModal}
                title="Delete Confirmation"
                message={"are you sure want to delete this Admin Role?"}
                toggle={this.deleteAclRoleClicked}
                onYesClick={() =>
                  this.yesDeleteClicked(this.state.deleteAclRoleToken)
                }
                onNoClick={this.noDeleteClicked}
              />
            </div>
            <div>
              <Dialog
                open={openModal}
                aria-labelledby="max-width-dialog-title"
                fullWidth={true} maxWidth="sm"
              >
                <DialogTitle id="form-dialog-title" >
                  {type === "new" ? <div style={{ display: "contents" }}><GroupAdd fontSize="large" />Add a Admin Role</div> : "Edit Admin Role"}
                </DialogTitle>
                <DialogContent>
                  <ValidatorForm
                    ref="form"
                    onSubmit={
                      type === "new" ? this.AddAclRole : this.UpdateAclRole
                    }
                    onError={(errors) => null}
                  >
                    <Grid container spacing={1} >
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator
                          className="mb-16 "
                          label="Role Type"
                          onChange={this.handleChange}
                          type="text"
                          name="roleType"
                          placeholder="Enter Role Type"
                          value={roleType}
                          validators={["required", "minStringLength: 2"]}
                          errorMessages={["this field is required"]}
                          style={{ width: "-webkit-fill-available" }}
                          variant="outlined"
                          size="medium"

                        />
                      </Grid>
                    </Grid>
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
                </DialogContent>
              </Dialog>
            </div>
      </div >
        );
      }
    }
const mapStateToProps = (state) => {
  const {aclRoleList, roleType, createdDate, updateDate} = state.aclRole;
  return {
          aclRoleList, roleType, createdDate, updateDate

        };
      };
      
export default connect(mapStateToProps, {aclRoleListApi, addAclRoleApi})(
          AclRole
);