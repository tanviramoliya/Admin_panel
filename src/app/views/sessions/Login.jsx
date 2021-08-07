import React, { Component } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,TextField,InputAdornment
} from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { loginApi } from "../../../redux/actions/LoginActions";
import { setLoader } from "../../../redux/actions/loaderAction/loaderAction";
import {  Email } from '@material-ui/icons';
import SimpleReactValidator from "simple-react-validator";

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
    } });
  }
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
    if (
      this.validator.allValid()

    ) {
    let  loginData = new FormData();
    loginData.append("credential", email);
    loginData.append("password", password);

    if(this.state.remember){
      localStorage.setItem('remember',JSON.stringify({ email : email, password : password}))
    }else{
      localStorage.setItem('remember',JSON.stringify({ email : "", password : ""}))
    }
   await this.props.loginApi(loginData);  
  }else{
    this.validator.showMessages();

  }
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
                  <TextField
                  className="mb-24 w-100"
                  label="Email Address"
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter Email Address"
                  variant="outlined"
                 
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
                  className="mb-24 w-100"
                  label="Password"
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Enter Your Password"
                  variant="outlined"
                 
                  error={this.validator.message(
                    "password",
                    password,
                    "required|min:8|max:15|regex"
                  )}
                  helperText={this.validator.message(
                    "password",
                    password,
                    "required|min:8|max:15|regex"
                  )}
                  onBlur={() => this.validator.showMessageFor("password")}
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
                          type="submit"
                        >
                          Sign in
                        </Button>
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
export default connect(mapStateToProps, { loginApi , setLoader})(LogIn);
