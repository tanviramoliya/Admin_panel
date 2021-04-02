import React, { Component } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";

import { loginApi } from "../../../redux/actions/LoginActions";

const styles = (theme) => ({
  wrapper: {
    position: "relative",
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

class LogIn extends Component {
  state = {
    email: "",
    password: "",
    remember: false,
  };
  componentDidMount = () => {
    // this.props.setLoader(false);
    let data= JSON.parse(localStorage.getItem('remember'));
    if(data){
      this.setState({ email : data.email, password : data.password})
      if(data.email){
        this.setState({ remember : true})
      }
    }
  };
  handleChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleFormSubmit = async (event) => {
    let { email, password } = this.state;
    let  loginData = new FormData();
    loginData.append("credential", email);
    loginData.append("password", password);

    if(this.state.remember){
      localStorage.setItem('remember',JSON.stringify({ email : email, password : password}))
    }else{
      localStorage.setItem('remember',JSON.stringify({ email : "", password : ""}))
    }
   await this.props.loginApi(loginData);  
};
  handleRemember = () => {
    const { remember, email, password } = this.state;
    this.setState({ remember : !remember});
    if(!remember){
      localStorage.setItem('remember',JSON.stringify({ email : email, password : password}))
    }else{
      localStorage.setItem('remember',JSON.stringify({ email : "", password : ""}))
    }
  }
  render() {
    let { email, password ,remember} = this.state;
    let { classes } = this.props;
    return (
      <div className="signup flex flex-center w-100 h-100vh" >
        
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
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
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
                    />
                    <TextValidator
                      className="mb-16 w-100"
                      label="Password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <FormControlLabel
                      className="mb-8"
                      name="remember"
                      checked = {remember}
                      onChange={this.handleRemember}
                      control={<Checkbox />}
                      label="Remember me"
                    />
                    <div className="flex flex-middle flex-space-between">

                      <div className={styles.wrapper}>
                        <Button
                          variant="contained"
                          color="primary"
                          // disabled={this.props.login.loading}
                          type="submit"
                        >
                          Sign in
                        </Button>
                        {/* {this.props.login.loading && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )} */}
                      </div>
                      <Button
                      variant="outlined"
                      //style={{marginLeft : "84px"}}
                      className="text-primary"
                      onClick={() =>
                        this.props.history.push("/forgot-password")
                      }
                    >
                      Forgot password?
                    </Button>
                    </div>                   
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, { loginApi })(LogIn);
