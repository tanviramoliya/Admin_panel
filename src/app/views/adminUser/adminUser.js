import React, { Component } from "react";
import {
  adminUserListApi,
  deleteAdminUserApi,
  addAdminUserApi,
  updateAdminUserApi, aclRoleNameListApi,
} from "../../../redux/actions/index";
import { status } from "../../../utility/config";
import { toastr } from "react-redux-toastr";
import { Breadcrumb } from "../../../components/matx/Breadcrumb";
import {
  Card, Button, Table,
  TableHead, TableRow, TableCell, TableBody, IconButton,
  Icon, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Grid, InputAdornment, FormControl, Tooltip, TextField, TableSortLabel, InputLabel, Select, MenuItem, FormHelperText
} from "@material-ui/core";
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PhoneIphone, Email, Person, Search } from '@material-ui/icons';
import SimpleReactValidator from "simple-react-validator";
import AccessDeniedPage from "../sessions/accessdeniedPage";
import { setLoader } from "../../../redux/actions/loaderAction/loaderAction";

class AdminUser extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }
  state = {
    adminUserList: [],
    aclRoleNameList: [],
    count: "",
    sortingField: "updatedTime",
    sortingOrder: "asc",
    keyword: "",
    rowsPerPage: 10,
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
    permission:true,
    perData : JSON.parse(localStorage.getItem("permission"))[4]
  };

  componentDidMount = async () => {
    const { perData } = this.state;
    if(perData.key === 'Admin Users' && perData.value === "N/A"){      
      this.setState({permission:false});
      return false;
    }
    await this.getAdminUserList();
    await this.getAclRoleList();
    // custom rule will have name 'isPasswordMatch'
  };

  getAclRoleList = async () => {
    await this.props.aclRoleNameListApi();
    this.setState({ aclRoleNameList: this.props.aclRoleNameList });
  };

  getAdminUserList = async () => {
    const { rowsPerPage, page, sortingField, sortingOrder, keyword } = this.state;
    let data = {
      keyword: keyword,
      pageSize: rowsPerPage,
      pageNo: page,
      field: sortingField,
      order: sortingOrder
    }
    await this.props.adminUserListApi(data);
    this.setState({ adminUserList: this.props.adminUserList.result, count: this.props.adminUserList.count });
  };

  handleSearchKeyword = async (event) => {
    await this.setState({ keyword: event.target.value });
    this.getAdminUserList();
  }
  handleSortingOrder = async (fieldName, order) => {

    await this.setState({ sortingField: fieldName, sortingOrder: order === 'asc' ? 'desc' : 'asc' });
    this.getAdminUserList();

  }
  handleChangePage = async (event, newPage) => {
    await this.setState({ page: newPage });
    this.getAdminUserList();
  };
  handleChangeRowsPerPage = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    this.getAdminUserList();
  };




  deleteAdminUserClicked = async (token) => {
    const { perData } = this.state;
    if(perData.key === 'Admin Users' && perData.value === "RW"){ 
    if (token) {
      this.setState({ deleteAdminUserToken: token });
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
      deleteAdminUserToken: null,
    });
    this.props.setLoader(true);
    const deleteAdminUser = await deleteAdminUserApi(
      this.state.deleteAdminUserToken
    );
    if (deleteAdminUser && deleteAdminUser.data.code === status.success) {
      await this.getAdminUserList();
      toastr.success(deleteAdminUser.data.message);
    } else if (
      deleteAdminUser &&
      deleteAdminUser.data.code === status.badRequest
    ) {
      toastr.warning(deleteAdminUser.data.message);
    } else {
      toastr.error(deleteAdminUser.data.message);
    }
    this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteAdminUserToken: null,
    });
  };
  // for open a modal
  setModel = (type, data) => {
    const { perData } = this.state;
    if(perData.key === 'Admin Users' && perData.value === "RW"){ 
    
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
  } else {
    toastr.error("Access Denied!")
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
      contactNumber: ""

    });
    this.validator.hideMessages();

    this.validator.hideMessageFor("firstName");
    this.validator.hideMessageFor("lastName");
    this.validator.hideMessageFor("role");
    this.validator.hideMessageFor("email");
    this.validator.hideMessageFor("contactNumber");
  };
  AddAdminUser = async () => {
    const { type, firstName, lastName, role, email, contactNumber } = this.state;

    if (type === "new") {
      if (
        this.validator.allValid()

      ) {
        let data = {
          firstName: firstName,
          lastName: lastName,
          role: role,
          email: email,
          contactNumber: contactNumber
        };
        this.props.setLoader(true);
        const createAdminUser = await addAdminUserApi(data);
        if (createAdminUser) {
          if (createAdminUser.status === status.success) {
            if (createAdminUser.data.code === status.success) {
              toastr.success(createAdminUser.data.message);
              this.getAdminUserList();
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
              this.validator.hideMessages();

              this.validator.hideMessageFor("firstName");
              this.validator.hideMessageFor("lastName");
              this.validator.hideMessageFor("role");
              this.validator.hideMessageFor("email");
              this.validator.hideMessageFor("contactNumber");
            } else {
              toastr.warning(createAdminUser.data.message);
            }
          } else {
            toastr.error(createAdminUser.data.message);
          }
        }
        this.props.setLoader(false);

      }
      else {
        this.validator.showMessages();
      }
    }
  };
  UpdateAdminUser = async () => {
    const {
      type,
      adminToken, firstName, lastName, role, email, contactNumber } = this.state;
    if (type === "edit") {
      if (
        this.validator.allValid()

      ) {
        let data = {
          adminToken: adminToken,
          firstName: firstName,
          lastName: lastName,
          role: role,
          email: email,
          contactNumber: contactNumber
        };
        this.props.setLoader(true);
        const updateAdminUser = await updateAdminUserApi(data);
        if (updateAdminUser) {
          if (updateAdminUser.status === status.success) {
            if (updateAdminUser.data.code === status.success) {
              toastr.success(updateAdminUser.data.message);
              this.getAdminUserList();
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
              this.validator.hideMessages();
              this.validator.hideMessageFor("firstName");
              this.validator.hideMessageFor("lastName");
              this.validator.hideMessageFor("role");
              this.validator.hideMessageFor("email");
              this.validator.hideMessageFor("contactNumber");
            } else {
              toastr.warning(updateAdminUser.data.message);
            }
          } else {
            toastr.error(updateAdminUser.data.message);
          }
        }
        this.props.setLoader(false);

      }
      else {
        this.validator.showMessages();
      }
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
      sortingOrder,
      keyword,
      sortingField, count,
      adminUserList,
      firstName, lastName, role, email, contactNumber,
      type,
      openModal,
      aclRoleNameList,
      permission

    } = this.state;
    if (!permission) {
      return (
        <AccessDeniedPage/>
      )
    }
    else {

     
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
          <Card elevation={6} className="px-24 pt-12 h-100">
            <div className="flex flex-middle flex-space-between pb-12">
              <div className="card-title">Admin User Information</div>
              <div>
                <TextField style={{ width: '300px' }}
                  className="mr-16"
                  placeholder="Search..."

                  type="search"
                  name="keyword"
                  value={keyword}
                  onChange={this.handleSearchKeyword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  className="capitalize text-white bg-circle-primary"
                  onClick={() => this.setModel("new")}
                >
                  Add New Admin
                  </Button>
              </div>
            </div>
            <TableContainer style={{ maxHeight: "465px" }}>
              <Table style={{ whiteSpace: "pre" }} stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0 py-8" width="8%" >Sr.No</TableCell>
                    <TableCell className="px-0 py-8" width="20%" >
                      <TableSortLabel
                        active={sortingField === 'firstName'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("firstName", sortingOrder)}
                      >
                        UserName
                      </TableSortLabel></TableCell>
                    <TableCell className="px-0 py-8" width="12%" >
                      <TableSortLabel
                        active={sortingField === 'role'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("role", sortingOrder)}
                      >
                        Role
                      </TableSortLabel></TableCell>
                    <TableCell className="px-0 py-8" width="22%">
                      <TableSortLabel
                        active={sortingField === 'email'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("email", sortingOrder)}
                      >
                        Email
                      </TableSortLabel></TableCell>
                    <TableCell className="px-0 py-8" width="15%" >
                      <TableSortLabel
                        active={sortingField === 'contactNumber'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("contactNumber", sortingOrder)}
                      >
                        ContactNumber
                      </TableSortLabel></TableCell>
                    <TableCell className="px-0 py-8" width="15%">
                      <TableSortLabel
                        active={sortingField === 'createdTime'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("createdTime", sortingOrder)}
                      >
                        CreatedTime
                      </TableSortLabel></TableCell>
                    <TableCell className="px-0 py-8"  >Actions</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {adminUserList && adminUserList !== [] ? adminUserList
                    //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((AdminUser, index) => (
                      <TableRow key={index}>
                        <TableCell className="p-0" >
                          {page * rowsPerPage + index + 1}
                        </TableCell>
                        <TableCell className="p-0" >
                          {AdminUser.firstName + " " + AdminUser.lastName}
                        </TableCell>
                        <TableCell className="p-0">
                          <small className="border-radius-4 bg-secondary text-white px-8 py-2 ">
                            {AdminUser.role}
                          </small>

                        </TableCell>
                        <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                          {AdminUser.email}
                        </TableCell>
                        <TableCell className="p-0" >
                          {AdminUser.contactNumber}
                        </TableCell>
                        <TableCell className="p-0" >
                          {AdminUser.createdTime}
                        </TableCell>

                        <TableCell className="p-0">
                          <IconButton className="p-8">
                            <Icon
                              color="primary"
                              onClick={() => this.setModel("edit", AdminUser)}
                            >
                              edit
                                </Icon>
                          </IconButton>
                          <IconButton className="p-8">
                            <Icon
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
                    )) : <h1>
                      No Data is there!
                    </h1>}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              className="px-16"
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={count ? count : 0}
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
            aria-labelledby="max-width-dialog-title"
            fullWidth={true} maxWidth="sm"
          >
            <DialogTitle id="form-dialog-title" >
              {type === "new" ? "Add Admin User" : "Edit Admin User"}
            </DialogTitle>
            <DialogContent>
              <ValidatorForm
                ref="form"
                onSubmit={
                  type === "new" ? this.AddAdminUser : this.UpdateAdminUser
                }
                onError={(errors) => null}
              >
                <Grid container spacing={1} >
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      className="mb-16 w-100"
                      label="First Name"
                      onChange={this.handleChange}
                      type="text"
                      name="firstName"
                      placeholder="Enter First Name"
                      value={firstName}
                      variant="outlined"
                      disabled={type==="edit"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                      error={this.validator.message(
                        "firstName",
                        firstName,
                        "required"
                      )}
                      helperText={this.validator.message(
                        "firstName",
                        firstName,
                        "required"
                      )}
                      onBlur={() => this.validator.showMessageFor("firstName")}
                    />
                    {/* <TextValidator
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
                    /> */}
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>

                    <TextField
                      className="mb-16 w-100"
                      label="Last Name"
                      onChange={this.handleChange}
                      type="text"
                      name="lastName"
                      value={lastName}
                      placeholder="Enter Last Name"
                      variant="outlined"
                      disabled={type==="edit"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                      error={this.validator.message(
                        "lastName",
                        lastName,
                        "required"
                      )}
                      helperText={this.validator.message(
                        "lastName",
                        lastName,
                        "required"
                      )}
                      onBlur={() => this.validator.showMessageFor("lastName")}
                    />


                  </Grid>
                </Grid>
                <FormControl className="mb-16 w-100" variant="outlined" error={this.validator.message(
                  "role",
                  role,
                  "required"
                )}>
                  <InputLabel id="role">
                    Role
                  </InputLabel>
                  <Select
                    labelId="role"
                    label="Role"
                    id="role"
                    name="role"
                    value={role}
                    onChange={this.handleChange}
                    displayEmpty
                    onBlur={() => this.validator.showMessageFor("role")}
                  >
                    {aclRoleNameList.map((roleType, index) => {
                      return (
                        <MenuItem value={roleType} key={index} >
                          {roleType}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText style={{ color: 'red' }}>{this.validator.message(
                    "role",
                    role,
                    "required"
                  )}</FormHelperText>
                </FormControl>


                <TextField
                  className="mb-16 w-100"
                  label="Email Address"
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter Email Address"
                  variant="outlined"
                  disabled={type==="edit"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                  error={this.validator.message(
                    "email",
                    email,
                    "required|email"
                  )}
                  helperText={this.validator.message(
                    "email",
                    email,
                    "required|email"
                  )}
                  onBlur={() => this.validator.showMessageFor("email")}
                />


                <TextField
                  className="mb-16 w-100"
                  label="Contact Number"
                  onChange={this.handleChange}
                  type="text"
                  name="contactNumber"
                  value={contactNumber}
                  placeholder="Enter Contact Number"
                  variant="outlined"
                  disabled={type==="edit"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIphone />
                      </InputAdornment>
                    ),
                  }}
                  error={this.validator.message(
                    "contactNumber",
                    contactNumber,
                    "required|integer|min:10|max:10"
                  )}
                  helperText={this.validator.message(
                    "contactNumber",
                    contactNumber,
                    "required|integer|min:10|max:10"
                  )}
                  onBlur={() => this.validator.showMessageFor("contactNumber")}
                />


                <DialogActions className="p-0" style={{ display: "block" }}>
                  <div className="flex flex-middle flex-space-between">
                    <div>
                      <Tooltip title="Password will generated by The System" placement="right">

                        <IconButton className="p-0">
                          <Icon>info_outlined</Icon>
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div>
                      <Button onClick={this.handleClose} className="mr-8" color="primary">
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
                    </div>
                  </div>
                </DialogActions>
              </ValidatorForm>
            </DialogContent>
          </Dialog>
        </div>
      </div >
    );
  }
}
}
const mapStateToProps = (state) => {
  const { adminUserList, firstName, lastName, role, email, contactNumber } = state.adminUser;
  const { aclRoleNameList } = state.aclRole;

  return {
    adminUserList, aclRoleNameList, firstName, lastName, role, email, contactNumber

  };
};

export default connect(mapStateToProps, {setLoader, adminUserListApi, aclRoleNameListApi, addAdminUserApi })(
  AdminUser
);