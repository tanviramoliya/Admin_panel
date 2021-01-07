import React, { Component } from "react";
import {
  adminUserListApi,
  deleteAdminUserApi,
  addAdminUserApi,
  updateAdminUserApi,
} from "../../../redux/actions/index";
import { status } from "../../../utility/config";
import { toastr } from "react-redux-toastr";
import { Breadcrumb } from "../../../components/matx/Breadcrumb";
import {
  Card, Button, Table,
  TableHead, TableRow, TableCell, TableBody, IconButton,
  Icon, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer
} from "@material-ui/core";
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
class AdminUser extends Component {
  state = {
    adminUserList: [],
    rowsPerPage: 8,
    page: 0,
    deleteModal: false,
    deleteAdminUserToken: null,
    openModal: false,
    adminId: "",
    adminToken: "",
    firstName: "",
    lastName: "",
    role: "",
    roleToken: "",
    email: "",
    contactNumber: "",
    createdTime: "",
    updatedTime: "",
    type: "new",

  };

  componentDidMount = async () => {
    await this.getAdminUserList();
  };
  getAdminUserList = async () => {
    await this.props.adminUserListApi();
    this.setState({ adminUserList: this.props.adminUserList });
  };
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };
  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };


  //to delete Category
  deleteAdminUserClicked = async (token) => {
    if (token) {
      this.setState({ deleteAdminUserToken: token });
    }
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  };

  yesDeleteClicked = async () => {
    //call delete Api
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteAdminUserToken: null,
    });
    // this.props.setLoader(true);
    const deleteAdminUser = await deleteAdminUserApi(
      this.state.deleteAdminUserToken
    );
    if (deleteAdminUser && deleteAdminUser.data.code === status.success) {
      await this.getdeleteAdminUserList();
      toastr.success(deleteAdminUser.data.message);
    } else if (
      deleteAdminUser &&
      deleteAdminUser.data.code === status.badRequest
    ) {
      toastr.warning(deleteAdminUser.data.message);
    } else {
      toastr.error(deleteAdminUser.data.message);
    }
    // this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteAdminUserToken: null,
    });
  };
  // for open a modal
  setModel = (type, data) => {
    this.setState({ openModal: true, type: type });
    if (type === "edit") {
      this.setState({
        adminId: data.adminId,
        adminToken: data.adminToken,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        roleToken: data.roleToken,
        email: data.email,
        contactNumber: data.contactNumber

      });
    }
  };
  //for close a modal
  handleClose = () => {
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
      contactNumber: "",
      passWord: ""

    });
  };
  AddAdminUser = async () => {
    const { type, firstName, lastName, role, email, contactNumber, passWord, confirmPassWord } = this.state;
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
      if (!passWord) {
        toastr.error("password is required");
        return;
      }
      if (!confirmPassWord) {
        toastr.error("confirmPassword is required");
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
        contactNumber: contactNumber,
        passWord: passWord
      };
      const createAdminUser = await addAdminUserApi(data);
      if (createAdminUser) {
        if (createAdminUser.status === status.success) {
          if (createAdminUser.data.code === status.success) {
            toastr.success(createAdminUser.data.message);
            this.getAdminUserList();
          } else {
            toastr.warning(createAdminUser.data.message);
          }
        } else {
          toastr.error(createAdminUser.data.message);
        }
      }
      // this.props.setLoader(false);
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
        contactNumber: "",
        passWord: ""

      });
    }
  };
  UpdateAdminUser = async () => {
    const {
      type,
      adminToken, firstName, lastName, role, email, contactNumber, passWord, confirmPassWord
    } = this.state;
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
      if (!passWord) {
        toastr.error("password is required");
        return;
      }
      if (!confirmPassWord) {
        toastr.error("confirmPassword is required");
        return;
      }
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
        contactNumber: contactNumber,
        passWord: passWord
      };
      const updateAdminUser = await updateAdminUserApi(data);
      if (updateAdminUser) {
        if (updateAdminUser.status === status.success) {
          if (updateAdminUser.data.code === status.success) {
            toastr.success(updateAdminUser.data.message);
            this.getAdminUserList();
          } else {
            toastr.warning(updateAdminUser.data.message);
          }
        } else {
          toastr.error(updateAdminUser.data.message);
        }
      }
      // this.props.setLoader(false);
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
        contactNumber: "",
        passWord: ""
      });
    }
  };
  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    const {
      page,
      rowsPerPage,
      adminUserList,
      firstName, lastName, role, email, contactNumber, passWord, confirmPassWord,
      type,
      openModal

    } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Admin User", path: "/adminUser" },

            ]}
          />
        </div>
        <div className="py-12">
          <Card elevation={6} className="px-24 pt-20 h-100">
            <div className="flex flex-middle flex-space-between pb-12">
              <div className="card-title">Admin User Infromation</div>
              <Button
                className="capitalize text-white bg-circle-primary"
                onClick={() => this.setModel("new")}
              >
                Add New Admin
                  </Button>
            </div>
            <TableContainer style={{ maxHeight: "405px" }}>
              <Table style={{ whiteSpace: "pre" }} stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0" width="5%" >No</TableCell>
                    <TableCell className="px-0" width="15%" >UserName</TableCell>
                    <TableCell className="px-0" width="8%" >Role</TableCell>
                    <TableCell className="px-0"  width="20%">Email</TableCell>
                    <TableCell className="px-0"  width="15%" >ContactNumber</TableCell>
                    <TableCell className="px-0"  width="15%">CreatedTime</TableCell>
                    <TableCell className="px-0"  >Actions</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {adminUserList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((AdminUser, index) => (
                      <TableRow key={index}>
                        <TableCell className="p-0" align="left">
                          {index + 1}
                        </TableCell>
                        <TableCell className="p-0" align="left">
                          {AdminUser.firstName +" "+AdminUser.lastName}
                        </TableCell>
                        <TableCell className="p-0" align="left">
                          {AdminUser.role}
                        </TableCell>
                        <TableCell className="p-0" align="left">
                          {AdminUser.email}
                        </TableCell>
                        <TableCell className="p-0" align="left">
                          {AdminUser.contactNumber}
                        </TableCell>
                        <TableCell className="p-0" align="left">
                          {AdminUser.createdTime}
                        </TableCell>

                        <TableCell className="p-0">
                          <IconButton>
                            <Icon style={{ fontSize: 20 }}
                              color="primary"
                              onClick={() => this.setModel("edit", AdminUser)}
                            >
                              edit
                                </Icon>
                          </IconButton>
                          <IconButton>
                            <Icon style={{ fontSize: 20 }}
                              color="error"
                              onClick={() =>
                                this.deleteAdminUserClicked(AdminUser.adminToken)
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
              count={adminUserList.length}
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
            toggle={this.deleteAdminUserClicked}
            onYesClick={() =>
              this.yesDeleteClicked(this.state.deleteAdminUserToken)
            }
            onNoClick={this.noDeleteClicked}
          />
        </div>
        <div>
          <Dialog
            open={openModal}
            aria-labelledby="form-dialog-title"
            fullWidth={true}
          >
            <DialogTitle id="form-dialog-title">
              {type === "new" ? "Add a Admin User" : "Edit Admin User"}
            </DialogTitle>
            <DialogContent>
              <ValidatorForm
                ref="form"
                onSubmit={
                  type === "new" ? this.AddAdminUser : this.UpdateAdminUser
                }
                onError={(errors) => null}
              >
                 
                <TextValidator
                  className="mb-16 "
                  label="first Name"
                  onChange={this.handleChange}
                  type="text"
                  name="firstName"
                  value={firstName}
                  validators={["required", "minStringLength: 2"]}
                  errorMessages={["this field is required"]}
                  style={{ width: "-webkit-fill-available" }}
                  variant="outlined"
                />
                <TextValidator
                  className="mb-16 "
                  label="last Name"
                  onChange={this.handleChange}
                  type="text"
                  name="lastName"
                  value={lastName}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  style={{ width: "-webkit-fill-available" }}
                  variant="outlined"
                />
                
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
                  onChange={this.handleChange}
                  type="text"
                  name="email"
                  value={email}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  style={{ width: "-webkit-fill-available" }}
                  variant="outlined"
                />
                <TextValidator
                  className="mb-16 "
                  label="contact Number"
                  onChange={this.handleChange}
                  type="text"
                  name="contactNumber"
                  value={contactNumber}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  style={{ width: "-webkit-fill-available" }}
                  variant="outlined"
                />
                <TextValidator
                  className="mb-16 "
                  label="password"
                  onChange={this.handleChange}
                  type="text"
                  name="passWord"
                  value={passWord}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  style={{ width: "-webkit-fill-available" }}
                  variant="outlined"
                />
                 <TextValidator
                  className="mb-16 "
                  label="confirm Password"
                  onChange={this.handleChange}
                  type="text"
                  name="confirmPassWord"
                  value={confirmPassWord}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  style={{ width: "-webkit-fill-available" }}
                  variant="outlined"
                />

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
  const { adminUserList, firstName, lastName, role, email, contactNumber, passWord, confirmPassWord } = state.adminUser;
  return {
    adminUserList, firstName, lastName, role, email, contactNumber, passWord, confirmPassWord

  };
};

export default connect(mapStateToProps, { adminUserListApi, addAdminUserApi })(
  AdminUser
);