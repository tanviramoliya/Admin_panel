import React, { Component } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import {
  Button,
  Icon,
  Grid,
  InputAdornment,
  Card,
  TextField,
  IconButton,
} from "@material-ui/core";
import { Breadcrumb } from "../../../components/matx/index";
import {
  PhoneIphone,
  Email,
  Person,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { setNameSettings } from "redux/actions/LayoutActions";

import {
  getAdminInfo,
  updateAdminInfo,
  changeAdminPassApi
} from "../../../redux/actions/apiAction/ProfileApiActions";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { status } from "../../../utility/config";
import SimpleReactValidator from "simple-react-validator";
import { setLoader } from "../../../redux/actions/loaderAction/loaderAction";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      validators: {
        regex: {  // name the rule
          message: 'The password contains at least 1 digit,1 lowercase,1 upercase,1 special symbol',
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val, /^(?:(?=.*\d)(?=.*[!@#$%^&*()])(?=.*[a-z])(?=.*[A-Z]).*)$/) && params.indexOf(val) === -1
          },
          messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)),  // optional
          required: true // optional
        }
      },
      messages: {
        in: 'The password and confirm password should be match!'
      }
    });
  }
  state = {
    contactNumber: "",
    firstName: "",
    lastName: "",
    adminId: "",
    role: "",
    adminToken: "",
    email: "",
    edit: false,
    showCard: false,
    oldPass: "",
    newPass: "",
    confirmPass: "",
    showPassword:false,
    data: {}
  };
  componentDidMount = async () => {
    await this.getCurrentAdmin();
  };


  getCurrentAdmin = async () => {
    await this.props.getAdminInfo();
    let data = this.props.info;
    this.setState({
      contactNumber: data.contactNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      adminId: data.adminId,
      role: data.role,
      adminToken: data.adminToken,
      email: data.email,
    });
  };


  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };
  changeEdit = () => {
    this.setState({ edit: true });
  };
  changeShow = () => {
    this.setState({ showCard: true });
  };
  reset = async () => {
    this.setState({ edit: false });
    await this.getCurrentAdmin();
  };
  canclePass = () => {
    this.validator.hideMessageFor("oldPass")
    this.validator.hideMessageFor("newPass")
    this.validator.hideMessageFor("confirmPass")
    this.setState({ showCard: false,oldPass: "",
    newPass: "",
    confirmPass: "", })
  

  }

  handleClickPassword = () =>{
    this.setState({showPassword:!this.state.showPassword});
  }
  handleMousePassword = () =>{
    this.setState({showPassword:!this.state.showPassword});
  }

  handleSubmit = async () => {
    const {
      adminToken, firstName, lastName, role, email, contactNumber } = this.state;

    if (
      this.validator.fieldValid("firstName")&&
      this.validator.fieldValid("lastName")&&
      this.validator.fieldValid("email")&&
      this.validator.fieldValid("contactNumber")) {
      let data = {
        adminToken,
        firstName,
        lastName,
        role,
        email,
        contactNumber
      };
      this.props.setLoader(true);
      const updateProfileInfo = await updateAdminInfo(data);
      if (updateProfileInfo) {
        if (updateProfileInfo.status === status.success) {
          if (updateProfileInfo.data.code === status.success) {
            let name= {firstName:firstName,lastName:lastName};
            localStorage.setItem("userName",JSON.stringify(name));
            this.props.setNameSettings(true);
            toastr.success(updateProfileInfo.data.message);
            this.setState({
              edit: false

            });
          } else {
            toastr.warning(updateProfileInfo.data.message);
          }
        } else {
          toastr.error(updateProfileInfo.data.message);
        }
      }
      this.props.setLoader(false);

    }
    else {
      this.validator.showMessageFor("firstName");
      this.validator.showMessageFor("lastName")
      this.validator.showMessageFor("email")
      this.validator.showMessageFor("contactNumber")
    }

  };

  changePassword = async () => {
    const {
      adminToken, oldPass,newPass } = this.state;

    if (
      this.validator.fieldValid("oldPass")&&
      this.validator.fieldValid("newPass")&&
      this.validator.fieldValid("confirmPass")) {
      let data = new FormData();
      data.append("adminToken",adminToken);
      data.append("oldPass",oldPass);
      data.append("newPass",newPass);
      this.props.setLoader(true);
      const changeAdminPass = await changeAdminPassApi(data);
      if (changeAdminPass) {
        if (changeAdminPass.status === status.success) {
          if (changeAdminPass.data.code === status.success) {
            toastr.success(changeAdminPass.data.message);
            this.setState({
              showCard: false

            });
          } else {
            toastr.warning(changeAdminPass.data.message);
          }
        } else {
          toastr.error(changeAdminPass.data.message);
        }
      }
      this.props.setLoader(false);

    }
    else {
      this.validator.showMessageFor("oldPass");
      this.validator.showMessageFor("newPass");
      this.validator.showMessageFor("confirmPass");
      
 
    }

  };



  render() {
    const {
      email,
      firstName,
      lastName,
      adminId,
      role,
      contactNumber,
      edit,
      showCard,
      oldPass,
      newPass,
      confirmPass,
      showPassword
    } = this.state;
    return (
      <>
        <div className="m-sm-30">
          <div className="mb-sm-30">
            <Breadcrumb routeSegments={[{ name: "My Profile" }]} />
          </div>

          <div className="py-12">
            <Card elevation={6} className="px-20 pt-12 h-100">
              <div className="flex flex-middle flex-space-between pb-12">
                <div className="card-title">Personal Information</div>
                <div>
                  <Button
                    color="primary"
                    className="mr-4"
                    variant="contained"
                    onClick={this.changeEdit}
                    startIcon={<Icon>edit</Icon>}
                  >
                    Edit Info
                  </Button>
                  <Button variant="contained" onClick={this.changeShow} startIcon={<Icon>vpn_key</Icon>}>
                  Change Password
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          <Card elevation={6} className="p-24 mt-20 h-100">
            <ValidatorForm
              ref="form"
              onSubmit={edit ? this.handleSubmit : this.changeEdit}
              onReset={this.reset}
              onError={(errors) => null}
            >
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    className="mb-16 w-100"
                    label="Admin ID"
                    type="text"
                    name="adminId"
                    value={adminId}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                    disabled={true}
                  />
                  <TextField
                    className="mb-16 w-100"
                    label="First Name"
                    onChange={this.handleChange}
                    type="text"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={firstName}
                    disabled={!edit}
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
                  <TextField
                    className="mb-16 w-100"
                    label="Email Address"
                    onChange={this.handleChange}
                    type="email"
                    name="email"
                    value={email}
                    disabled={!edit}
                    placeholder="Enter Email Address"
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
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    className="mb-16 w-100"
                    label="Role"
                    type="text"
                    name="role"
                    value={role}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                    disabled={true}
                  />
                  <TextField
                    className="mb-16 w-100"
                    label="Last Name"
                    onChange={this.handleChange}
                    type="text"
                    name="lastName"
                    value={lastName}
                    disabled={!edit}
                    placeholder="Enter Last Name"
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

                  <TextField
                    className="mb-16 w-100"
                    label="Contact Number"
                    onChange={this.handleChange}
                    type="text"
                    name="contactNumber"
                    value={contactNumber}
                    disabled={!edit}
                    placeholder="Enter Contact Number"
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
                    onBlur={() =>
                      this.validator.showMessageFor("contactNumber")
                    }
                  />
                </Grid>
              </Grid>
              {edit ? (
                <>
                  <Button color="primary" variant="contained" type="submit"
                  startIcon={<Icon>edit</Icon>}>Update
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    type="reset"
                    className="ml-4"
                    startIcon={
                    <Icon>highlight_off</Icon>}
                    >Cancel
                  </Button>
                </>
              ) : null}
            </ValidatorForm>
          </Card>
          {showCard ? (
            <Card elevation={6} className="p-24 mt-20 h-100">
              <ValidatorForm
                ref="form"
                onSubmit={this.changePassword}
                onReset={this.canclePass}
                onError={(errors) => null}
              >
                <Grid container spacing={6}>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      className="mb-16 w-100"
                      label="Old Password"
                      onChange={this.handleChange}
                      type="Password"
                      name="oldPass"
                      placeholder="Enter Old Password"
                      value={oldPass}
                      error={this.validator.message(
                        "oldPass",
                        oldPass,
                        "required|min:8|max:15|regex"
                      )}
                      helperText={this.validator.message(
                        "oldPass",
                        oldPass,
                        "required|min:8|max:15|regex"
                      )}
                     
                      onBlur={() => this.validator.showMessageFor("oldPass")}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      className="mb-16 w-100"
                      label="New Password"
                      onChange={this.handleChange}
                      type={showPassword ? "text" : "password"}
                      name="newPass"
                      placeholder="Enter New Password"
                      value={newPass}
                      error={this.validator.message(
                        "newPass",
                        newPass,
                        "required|min:8|max:15|regex"
                      )}
                      helperText={this.validator.message(
                        "newPass",
                        newPass,
                        "required|min:8|max:15|regex"
                      )}
                      onBlur={() => this.validator.showMessageFor("newPass")}
                      InputProps = {{endAdornment:(
                        <InputAdornment position='end' >
                          <IconButton aria-label='toggle password visibility' onClick={this.handleClickPassword} onMouseDown={this.handleMousePassword}>
                            {showPassword?<Visibility/>:<VisibilityOff/>}
                          </IconButton>
                        </InputAdornment>
                      )}}

                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      className="mb-16 w-100"
                      label="Confirm Password"
                      onChange={this.handleChange}
                      type="Password"
                      name="confirmPass"
                      placeholder="Enter Confirm Password"
                      value={confirmPass}
                      error={this.validator.message(
                        "confirmPass",
                        confirmPass,
                        "required|in:" + newPass
                      )}
                      helperText={this.validator.message(
                        "confirmPass",
                        confirmPass,
                        "required|in:" + newPass
                      )}
                      onBlur={() =>
                        this.validator.showMessageFor("confirmPass")
                      }
                    />
                  </Grid>
                </Grid>

                <>
                  <Button color="primary" variant="contained" type="submit" startIcon={<Icon>edit</Icon>}>
                    Update
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    type="reset"
                    className="ml-4"
                    startIcon={<Icon>highlight_off</Icon>}
                  >Cancel
                  </Button>
                </>
              </ValidatorForm>
            </Card>
          ) : null}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { info } = state.profile;  
  return { info };
};

export default connect(mapStateToProps, { setLoader,setNameSettings, getAdminInfo,changeAdminPassApi, updateAdminInfo })(
  Profile
);
