import React, { Component, Fragment } from "react";
import {
  aclRoleListApi,
  deleteAclRoleApi,
  addAclRoleApi,
  updateAclRoleApi,
} from "../../../redux/actions/index";
import { status } from "../../../utility/config";
import { toastr } from "react-redux-toastr";
import { Breadcrumb } from "../../../components/matx/Breadcrumb";
import Paper from "@material-ui/core/Paper";
import {
  Card,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Icon,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  Grid,
  InputAdornment,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Chip,
  Avatar,
  Tooltip,
  CardActions,
  CardContent,
  Typography,
  createMuiTheme,
  MuiThemeProvider,
  Divider,
  Checkbox,
  FormGroup,
  FormHelperText,
} from "@material-ui/core";
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import {
  PhoneIphone,
  Email,
  Person,
  GroupAdd,
  CheckBox,
} from "@material-ui/icons";

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
    permission: [
      { key: "Dashboard", value: "N/A" },
      { key: "Administrator", value: "N/A" },
      { key: "News_headline", value: "N/A" },
      { key: "News", value: "N/A" },
      { key: "Publish", value: "N/A" },
      { key: "Comments", value: "N/A" },
      { key: "Menu_serial_no", value: "N/A" },
      { key: "Master", value: "N/A" },
      { key: "Settings", value: "N/A" },
      { key: "Subscription", value: "N/A" },
      { key: "Role", value: "N/A" },
    ],
    // permission:{
    //   Dashboard:"",
    //   Administrator
    // }
    type: "new",
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
    const deleteAclRole = await deleteAclRoleApi(this.state.deleteAclRoleToken);
    if (deleteAclRole && deleteAclRole.data.code === status.success) {
      await this.getAclRoleList();
      toastr.success(deleteAclRole.data.message);
    } else if (deleteAclRole && deleteAclRole.data.code === status.badRequest) {
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
        permission: data.permission,
      });
    }
  };
  handleClick = () => {
    this.setState({ openCard: !this.state.openCard });
    console.log("click---" + this.state.openCard);
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
      // permission: "",
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
        permission: permission,
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
              type: "new",
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
    const { type, roleToken, roleType, permission } = this.state;
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

  handleChange = (event, key) => {
    console.log(event.target.name, event.target.checked, key);
    let name = event.target.name;
    let value = event.target.checked;
    event.persist();
    this.state.permission.map((item) => {
      if (item.key === key) {
        let index = this.state.permission.findIndex((i) => i.key === key);
        let permission = [...this.state.permission];
        let permissions = { ...permission[index] };
        permissions.key = key;
        if(value){
          permissions.value = name;
        }
        else{
          if(permissions.value === 'RW' && name !== 'RO'){
            permissions.value = 'N/A';
          }
          if(permissions.value === 'RO' && name !== 'RW'){
            permissions.value = 'N/A';
          }
        }
        // if(name === 'RO' && value === true){
        //   permissions.value = 'RO';
        // }
        // if(name === 'RW' && value === true){
        //   permissions.value = 'RW';
        // }
        // if((name === 'RW' && value === false) && (name === 'RO' && value === true)){
        //   permissions.value = 'RO';
        // }
        // if((name === 'RW' && value === true) && (name === 'RO' && value === false)){
        //   permissions.value = 'RW';
        // }
        // if((name === 'RW' && value === true) && (name === 'RO' && value === true)){
        //   permissions.value = 'RW';
        // }
        // if((name === 'RW' && value === false) && (name === 'RO' && value === false)){
        //   permissions.value = 'N/A';
        // }
        permission[index] = permissions;
        this.setState({ permission });
        console.log(this.state.permission);
      }
    });
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
      openModal,
    } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "User Role", path: "/" }]} />
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
              <Grid
                item
                lg={4}
                md={4}
                sm={12}
                xs={12}
                style={{ paddingRight: "6px" }}
              >
                <Card elevation={6}>
                  <CardContent>
                    <Typography variant="h4" className="text-green px-6">
                      {AclRole.roleType}
                      <MuiThemeProvider theme={theme}>
                        <IconButton className="p-8">
                          <Icon
                            color="primary"
                            onClick={() => this.setModel("edit", AclRole)}
                          >
                            edit
                          </Icon>
                        </IconButton>
                        <IconButton className="p-8">
                          <Icon
                            color="secondary"
                            onClick={() =>
                              this.deleteAdminUserClicked(AclRole.roleToken)
                            }
                          >
                            delete
                          </Icon>
                        </IconButton>
                      </MuiThemeProvider>
                    </Typography>
                    <Divider />
                    <Grid container className="pt-20">
                      <Grid item lg={12}>
                        <Card elevation={2}>
                          <div>
                            <TableContainer component={Paper}>
                              <Table size="small" aria-label="a dense table">
                                <TableBody>
                                  {Object.values(
                                    JSON.parse(AclRole.permission)
                                  ).map((row) => (
                                    <TableRow key={row.key}>
                                      <TableCell component="th" scope="row">
                                        {row.key}
                                      </TableCell>
                                      <TableCell align="center">
                                        {" "}
                                        {row.value === "N/A" ? (
                                          <Chip
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            label="N/A"
                                            style={{ marginRight: "6px" }}
                                          />
                                        ) : row.value === "RW" ? (
                                          <Chip
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            label="R/W"
                                            style={{ marginRight: "6px" }}
                                          />
                                        ) : (
                                          <Chip
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                            label="R/O"
                                          />
                                        )}{" "}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                          <CardActions></CardActions>
                        </Card>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
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
            fullWidth={true}
            maxWidth="sm"
          >
            <DialogTitle id="form-dialog-title">
              {type === "new" ? (
                <div style={{ display: "contents" }}>
                  <GroupAdd fontSize="large" />
                  Add a Admin Role
                </div>
              ) : (
                "Edit Admin Role"
              )}
            </DialogTitle>
            <DialogContent>
              <ValidatorForm
                ref="form"
                onSubmit={type === "new" ? this.AddAclRole : this.UpdateAclRole}
                onError={(errors) => null}
              >
                <Grid container spacing={1}>
                  <Grid item lg={12}>
                    <TextValidator
                      className="mb-16 "
                      label="Role Type"
                      onChange={(e) =>
                        this.setState({ roleType: e.target.value })
                      }
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
                    <TableContainer component={Paper}>
                      <Table size="small" aria-label="a dense table">
                        <TableBody>
                          {this.state.permission.map((row) => (
                            <TableRow>
                              <TableCell className="p-0">{row.key}</TableCell>
                              <TableCell align="center" className="p-0">
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      onChange={(e) =>
                                        this.handleChange(e, row.key)
                                      }
                                      checked={row.value === 'RW'}
                                      name="RW"
                                      color="primary"
                                    />
                                  }
                                  label="RW"
                                />
                              </TableCell>
                              <TableCell align="center" className="p-0">
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      onChange={(e) =>
                                        this.handleChange(e, row.key)
                                      }
                                      checked={row.value !== 'N/A'}
                                      name="RO"
                                      color="secondary"
                                    />
                                  }
                                  label="RO"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
                <DialogActions className="p-0">
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
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { aclRoleList, roleType, createdDate, updateDate } = state.aclRole;
  return {
    aclRoleList,
    roleType,
    createdDate,
    updateDate,
  };
};

export default connect(mapStateToProps, { aclRoleListApi, addAclRoleApi })(
  AclRole
);
