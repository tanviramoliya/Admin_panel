import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  createMuiTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Tooltip,
  Box,
  TextField
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import { GroupAdd, Warning } from "@material-ui/icons";
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import React, { Component } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { Breadcrumb } from "../../../components/matx/Breadcrumb";
import {
  aclRoleListApi,
  addAclRoleApi,
  deleteAclRoleApi,
  updateAclRoleApi,
} from "../../../redux/actions/index";
import { status } from "../../../utility/config";
import SimpleReactValidator from "simple-react-validator";
import AccessDeniedPage from "../sessions/accessdeniedPage";

const theme = createMuiTheme({
  palette: {
    secondary: red,
  },
});

class AclRole extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }
  state = {
    aclRoleList: [],
    rowsPerPage: 8,
    page: 0,
    deleteModal: false,
    deleteAclRoleToken: null,
    openModal: false,
    roleToken: "",
    roleType: "",
    isPermission: true,
    permission: [
      { key: "Dashboard", value: "N/A" },
      { key: "News", value: "N/A" },
      { key: "News Updates", value: "N/A" },
      { key: "Comments", value: "N/A" },
      { key: "Admin Users", value: "N/A" },
      { key: "Role", value: "N/A" },
      { key: "Subscriber", value: "N/A" },
      { key: "Inquiry", value: "N/A" },
      { key: "Master", value: "N/A" },
      { key: "Settings", value: "N/A" }
    ],
    type: "new",
    perData: JSON.parse(localStorage.getItem("permission"))[5]
  };

  componentDidMount = async () => {
    const { perData } = this.state;
    if (perData.key === 'Role' && perData.value === "N/A") {
      this.setState({ isPermission: false });
      return false;
    }
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
    const { perData } = this.state;
    if (perData.key === 'Role' && perData.value === "RW") {

      if (token) {
        this.setState({ deleteAclRoleToken: token });
      }
      this.setState({
        deleteModal: !this.state.deleteModal,
      });
    } else {
      toastr.error("Access Denied!")
    }
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
    const { perData } = this.state;
    if (perData.key === 'Role' && perData.value === "RW") {

      this.setState({ openModal: true, type: type });
      if (type === "edit") {
        this.setState({
          roleToken: data.roleToken,
          roleType: data.roleType,
          permission: JSON.parse(data.permission),
        });
      }
    } else {
      toastr.error("Access Denied!")
    }
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
      permission: [
        { key: "Dashboard", value: "N/A" },
        { key: "News", value: "N/A" },
        { key: "News Updates", value: "N/A" },
        { key: "Comments", value: "N/A" },
        { key: "Admin Users", value: "N/A" },
        { key: "Role", value: "N/A" },
        { key: "Subscriber", value: "N/A" },
        { key: "Inquiry", value: "N/A" },
        { key: "Master", value: "N/A" },
        { key: "Settings", value: "N/A" }
      ],
    });
    this.validator.hideMessages();
    this.validator.hideMessageFor("roleType");
  };
  AddAclRole = async () => {
    const { type, roleType, permission } = this.state;
    if (type === "new") {
      if (
        this.validator.allValid()
      ) {

        // this.props.setLoader(true);
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
                roleToken: "",
                roleType: "",
                type: "new",
              });
              this.validator.hideMessages();
              this.validator.hideMessageFor("roleType");
            } else {
              toastr.warning(createAclRole.data.message);
            }
          } else {
            toastr.error(createAclRole.data.message);
          }
        }
        // this.props.setLoader(false);
      }
      else {
        this.validator.showMessages();

      }
    }
  };
  UpdateAclRole = async () => {
    const { type, roleToken, roleType, permission } = this.state;
    if (type === "edit") {
      if (
        this.validator.allValid()
      ) {

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
              if (localStorage.getItem("roleToken") === updateAclRole.data.data) {
                localStorage.setItem("permission", JSON.stringify(permission));
              } this.getAclRoleList();
              this.setState({
                openModal: false,
                type: "new",
                roleToken: "",
                roleType: "",
              });
              this.validator.hideMessages();
              this.validator.hideMessageFor("roleType");
            } else {
              toastr.warning(updateAclRole.data.message);
            }
          } else {
            toastr.error(updateAclRole.data.message);
          }
        }
        // this.props.setLoader(false);
      }
      else {
        this.validator.showMessages();

      }
    }
  };
  handleTypeChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = (event, key) => {
    let name = event.target.name;
    let value = event.target.checked;
    event.persist();
    this.state.permission.map((item) => {
      if (item.key === key) {
        let index = this.state.permission.findIndex((i) => i.key === key);
        let permission = [...this.state.permission];
        let permissions = { ...permission[index] };
        permissions.key = key;
        if (value) {
          permissions.value = name;
        } else {
          if (permissions.value === "RW" && name !== "RO") {
            permissions.value = "N/A";
          }
          if (permissions.value === "RO" && name !== "RW") {
            permissions.value = "N/A";
          }
        }
        permission[index] = permissions;
        this.setState({ permission });
      }
    });
  };

  render() {
    const { aclRoleList, roleType, type, openModal, isPermission } = this.state;
    if (!isPermission) {
      return (
        <AccessDeniedPage />
      )
    }
    else {


      return (


        <div className="m-sm-30">
          <div className="mb-sm-30">
            <Breadcrumb routeSegments={[{ name: "User Role", path: "/" }]} />
          </div>
          <div className="py-12">
            <Card elevation={6} className="px-20 pt-12 h-100">
              <div className="flex flex-middle flex-space-between pb-12">
                <div className="card-title">User Role And Permission</div>
                {aclRoleList.length < 3 ? (
                  <Button
                    className="capitalize text-white bg-circle-primary"
                    onClick={() => this.setModel("new")}
                  >
                    Add New Role
                </Button>
                ) : (
                    <Tooltip
                      title="You can add only three roles!"
                      placement="right"
                    >
                      <Warning fontSize="large" color="secondary" />
                    </Tooltip>
                  )}
              </div>
            </Card>
            <Grid container className="pt-20" spacing={4}>
              {aclRoleList.map((AclRole, index) => (
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <Card elevation={6}>
                    <CardContent>
                      <div className="flex flex-middle flex-space-between pb-12">
                        <Typography variant="h4" className="px-6">
                          {AclRole.roleType}
                        </Typography>
                        <div>
                          <IconButton className="p-8">
                            <Icon
                              color="primary"
                              onClick={() => this.setModel("edit", AclRole)}
                            >
                              edit
                          </Icon>
                          </IconButton>
                          {/* <IconButton className="p-8">
                          <Icon
                            color="error"
                            onClick={() =>
                              this.deleteAclRoleClicked(AclRole.roleToken)
                            }
                          >
                            delete
                          </Icon>
                        </IconButton> */}
                        </div>
                      </div>
                      <Divider />
                      <Grid container className="pt-12">
                        <Grid item lg={12}>
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
                                        <small
                                          className={
                                            row.value === "N/A"
                                              ? "border-radius-4 text-white px-8 py-2 bg-error"
                                              : row.value === "RW"
                                                ? "border-radius-4 text-white px-8 py-2 bg-primary"
                                                : "border-radius-4 text-white px-8 py-2 bg-secondary"
                                          }
                                        >
                                          {row.value === "N/A"
                                            ? "N/A"
                                            : row.value === "RW"
                                              ? "RW"
                                              : "RO"}
                                        </small>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <div style={{ display: "flex" }}>

                        <Box fontWeight="fontWeightRegular" marginLeft="16px">
                          Last Modified Date :
                      </Box>
                        <Box fontStyle="italic"> {AclRole.updatedTime}</Box>

                      </div>
                    </CardActions>
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

                <div style={{ display: "contents" }}>
                  {type === "new" ? "Add Admin Role"
                    :
                    "Edit Admin Role"
                  }
                </div>
              </DialogTitle>
              <DialogContent>
                <ValidatorForm
                  ref="form"
                  onSubmit={type === "new" ? this.AddAclRole : this.UpdateAclRole}
                  onError={(errors) => null}
                >
                  <Grid container spacing={1}>
                    <Grid item lg={12}>

                      <TextField
                        variant="outlined"
                        className="mb-16 w-100"
                        label="Role Type"
                        onChange={this.handleTypeChange}
                        type="text"
                        name="roleType"
                        value={roleType}
                        error={this.validator.message(
                          "roleType",
                          roleType,
                          "required|min:2"
                        )}
                        helperText={this.validator.message(
                          "roleType",
                          roleType,
                          "required|min:2"
                        )}
                        onBlur={() => this.validator.showMessageFor("roleType")}
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
                                        checked={row.value === "RW"}

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
                                        checked={row.value !== "N/A"}
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
}
const mapStateToProps = (state) => {
  const { aclRoleList, roleType } = state.aclRole;
  return {
    aclRoleList,
    roleType,
  };
};

export default connect(mapStateToProps, { aclRoleListApi, addAclRoleApi })(
  AclRole
);
