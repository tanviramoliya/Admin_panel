import React, { Component } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import {
  Button,
  Icon,
  Grid,
  InputAdornment,
  Card,
  TextField,
} from "@material-ui/core";
import { Breadcrumb } from "../../../components/matx/index";
import {
  PhoneIphone,
  Email,
  Person,
  GroupAdd,
  Search,
} from "@material-ui/icons";

import {
  getAdminInfo,
  updateAdminInfo,
} from "../../../redux/actions/apiAction/ProfileApiActions";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { status } from "../../../utility/config";
import SimpleReactValidator from "simple-react-validator";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    this.validator = new SimpleReactValidator({
        autoForceUpdate: this ,
        validators: {
          regex: {  // name the rule
            message: 'The password contains at least 1 digit,1 lowercase,1 upercase,1 special symbol',
            rule: (val, params, validator) => {
              return validator.helpers.testRegex(val,/^(?:(?=.*\d)(?=.*[!@#$%^&*()])(?=.*[a-z])(?=.*[A-Z]).*)$/) && params.indexOf(val) === -1
            },
            messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)),  // optional
            required: true // optional
          },
          isMatch : {
              message : 'The password and confirm password should be match!',
              rule : (val,params,validator) => {
                return validator.helpers.equal(val,this.state.newPass) && params.indexOf(val) === -1
              },
              messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)),  // optional
              required: true  // optional
  
          }
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
  };
  componentDidMount = async () => {};

  handleSubmit = async () => {
    const {
      type,
      adminToken,
      firstName,
      lastName,
      role,
      email,
      contactNumber,
    } = this.state;
    if (type === "edit") {
      if (this.validator.allValid()) {
        let data = {
          adminToken: adminToken,
          firstName: firstName,
          lastName: lastName,
          role: role,
          email: email,
          contactNumber: contactNumber,
        };
        const updateAdminUser = await updateAdminInfo(data);
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
                contactNumber: "",
              });
            } else {
              toastr.warning(updateAdminUser.data.message);
            }
          } else {
            toastr.error(updateAdminUser.data.message);
          }
        }
        // this.props.setLoader(false);
      } else {
        this.validator.showMessages();
      }
    }
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
  reset = () => {
    this.setState({ edit: false });
  };
  canclePass = () => {
      this.setState({ showCard : false})
  }
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
                  >
                    <Icon>edit</Icon>
                    <span className="pl-8 capitalize">Edit Info</span>
                  </Button>
                  <Button variant="contained" onClick={this.changeShow}>
                    <Icon>vpn_key</Icon>
                    <span className="pl-8 capitalize">Change Password</span>
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
                  <Button color="primary" variant="contained" type="submit">
                    <Icon>edit</Icon>
                    <span className="pl-8 capitalize">Update</span>
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    type="reset"
                    className="ml-4"
                  >
                    <Icon>highlight_off</Icon>
                    <span className="pl-8 capitalize">Cancle</span>
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
                      type="text"
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
                      type="text"
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
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      className="mb-16 w-100"
                      label="Confirm Password"
                      onChange={this.handleChange}
                      type="text"
                      name="confirmPass"
                      placeholder="Enter Confirm Password"
                      value={confirmPass}
                      error={this.validator.message(
                        "confirmPass",
                        confirmPass,
                        "required|equal:'12'"
                      )}
                      helperText={this.validator.message(
                        "confirmPass",
                        confirmPass,
                        "required|equal:'12'"
                      )}
                      onBlur={() =>
                        this.validator.showMessageFor("confirmPass")
                      }
                    />
                  </Grid>
                </Grid>

                <>
                  <Button color="primary" variant="contained" type="submit">
                    <Icon>edit</Icon>
                    <span className="pl-8 capitalize">Update</span>
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    type="reset"
                    className="ml-4"
                  >
                    <Icon>highlight_off</Icon>
                    <span className="pl-8 capitalize">Cancle</span>
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
  return {};
};

export default connect(mapStateToProps, { getAdminInfo, updateAdminInfo })(
  Profile
);
