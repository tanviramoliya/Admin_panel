import React, { Component } from "react";
import {
  Card,
  Grid,
  Button,
  withStyles,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { toastr } from "react-redux-toastr";

import {
  checkEmailApi,
  sendPasscodeApi,
  validPasscodeApi,
  resetPasswordApi
} from "../../../redux/actions/LoginActions";
import { status } from "../../../utility/config";
import { Visibility, VisibilityOff } from "@material-ui/icons";

class ForgotPassword extends Component {
  state = {
    email: "",
    passcode: "",
    isEmailValid: false,
    isPasscodeValid: false,
    showPassword: false,
    passcodeToken: "",
    resetToken: "",
    newPassword: "",
    confirmPassword: "",
  };
  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== this.state.newPassword) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  handleChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleEmailCheck = async () => {
    let { email } = this.state;

    let emailData = new FormData();
    emailData.append("email", email);
    const emailCheck = await checkEmailApi(emailData);
    if (emailCheck) {
      if (emailCheck.status === status.success) {
        if (emailCheck.data.code === status.success) {
          //toastr.success(emailCheck.data.message);
          const sendPasscode = await sendPasscodeApi(emailData);
          if (sendPasscode) {
            if (sendPasscode.status === status.success) {
              if (sendPasscode.data.code === status.success) {
                toastr.success(sendPasscode.data.message);
                this.setState({
                  isEmailValid: true,
                  passcodeToken: sendPasscode.data.data,
                });
              } else {
                toastr.warning(sendPasscode.data.message);
              }
            } else {
              toastr.error(sendPasscode.data.message);
            }
          }
        } else {
          toastr.warning(emailCheck.data.message);
        }
      } else {
        toastr.error(emailCheck.data.message);
      }
    }
  };
  handlePasscodeVerify = async () => {
    let { passcodeToken, passcode } = this.state;

    let data = new FormData();
    data.append("token", passcodeToken);
    data.append("passcode", passcode);
    const validpasscode = await validPasscodeApi(data);
    if (validpasscode) {
      if (validpasscode.status === status.success) {
        if (validpasscode.data.code === status.success) {
          toastr.success(validpasscode.data.message);
          this.setState({
            isPasscodeValid: true,
            resetToken: validpasscode.data.data,
          });
        } else {
          toastr.warning(validpasscode.data.message);
        }
      } else {
        toastr.error(validpasscode.data.message);
      }
    }
  };
  handleResetPassword = async () => {
    let { email,resetToken, newPassword } = this.state;

    let data = new FormData();
    data.append("token", resetToken);
    data.append("newPassword", newPassword);
    const resetPassword = await resetPasswordApi(data);
    if (resetPassword) {
      if (resetPassword.status === status.success) {
        if (resetPassword.data.code === status.success) {
          toastr.success(resetPassword.data.message);
          localStorage.setItem('remember',JSON.stringify({ email : email, password : ""}));
          this.props.history.push("/login")
            
        } else {
          toastr.warning(resetPassword.data.message);
        }
      } else {
        toastr.error(resetPassword.data.message);
      }
    }
  };
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    let {
      email,
      isEmailValid,
      isPasscodeValid,
      passcode,
      newPassword,
      confirmPassword,
      showPassword,
    } = this.state;

    return (
      <div className="signup flex flex-center w-100 h-100vh">
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-32 flex flex-center flex-middle h-100">
                  <img src="/assets/images/sidebar/gntv.png" alt="GNTV Logo" />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-36 h-100 bg-light-gray position-relative">
                  <ValidatorForm ref="form" onSubmit={this.handleEmailCheck}>
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label="Email"
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      value={email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "email is not valid",
                      ]}
                      disabled={isEmailValid}
                    />
                    {isEmailValid ? null : (
                      <div className="flex flex-middle flex-space-between">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Send Passcode
                        </Button>
                        <Button
                          variant="outlined"
                          //style={{marginLeft : "84px"}}
                          className="text-primary"
                          onClick={() => this.props.history.push("/login")}
                        >
                          Back to Login
                        </Button>
                      </div>
                    )}
                  </ValidatorForm>

                  {isEmailValid && !isPasscodeValid ? (
                    <ValidatorForm
                      ref="form"
                      onSubmit={this.handlePasscodeVerify}
                    >
                      <TextValidator
                        className="mb-24 w-100"
                        variant="outlined"
                        label="Passcode"
                        onChange={this.handleChange}
                        type="text"
                        name="passcode"
                        value={passcode}
                        validators={["required", "matchRegexp:^[0-9]{6}$"]}
                        errorMessages={[
                          "this field is required",
                          "Passcode should be 6 digit numeric code",
                        ]}
                      />
                      <div className="flex flex-middle flex-space-between">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Verify Passcode
                        </Button>
                        <Button
                          variant="outlined"
                          //style={{marginLeft : "84px"}}
                          className="text-primary"
                          onClick={() => this.props.history.push("/login")}
                        >
                          Back to Login
                        </Button>
                      </div>
                    </ValidatorForm>
                  ) : null}
                  {isPasscodeValid ? (
                    <ValidatorForm
                      ref="form"
                      onSubmit={this.handleResetPassword}
                    >
                      <TextValidator
                        className="mb-24 w-100"
                        variant="outlined"
                        label="New Password"
                        onChange={this.handleChange}
                        type={showPassword?"text":"password"}
                        name="newPassword"
                        value={newPassword}
                        validators={["required","minStringLength:8","maxStringLength:15","matchRegexp:^(?:(?=.*\\d)(?=.*[!@#$%^&*()])(?=.*[a-z])(?=.*[A-Z]).*)$"]}
                        errorMessages={["this field is required","password character between 8 to 15","password character between 8 to 15","password has 1 digit,1 lowercase,1 upercase,1 special symbol"]}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                  <IconButton
                                    className="p-0"                                    
                                    onClick={this.handleClickShowPassword}
                                  >
                                    {showPassword ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              )
                          }}

                      />
                      <TextValidator
                        className="mb-24 w-100"
                        variant="outlined"
                        label="Confirm Password"
                        onChange={this.handleChange}
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        validators={["required", "isPasswordMatch"]}
                        errorMessages={[
                          "this field is required",
                          "Password and confirm password should be match",
                        ]}
                        
                        
                      />
                      <div className="flex flex-middle flex-space-between">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Reset Password
                        </Button>
                        <Button
                          variant="outlined"
                          //style={{marginLeft : "84px"}}
                          className="text-primary"
                          onClick={() => this.props.history.push("/login")}
                        >
                          Back to Login
                        </Button>
                      </div>
                    </ValidatorForm>
                  ) : null}
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resetPassword: PropTypes.func.isRequired,
  login: state.login,
});
export default withRouter(connect(mapStateToProps)(ForgotPassword));
