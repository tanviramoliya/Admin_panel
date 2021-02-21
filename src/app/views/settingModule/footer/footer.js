import React, { Component } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import {
  Button,
  Icon,
  Grid,
  TextField,
  Box,
  withStyles,
  LinearProgress,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import { Breadcrumb } from "../../../../components/matx/index";

import {
  footerListApi,
  updateFooterApi,
} from "../../../../redux/actions/index";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { status } from "../../../../utility/config";
import TextValidator from "react-material-ui-form-validator/lib/TextValidator";
import { PhoneIphone, Email } from "@material-ui/icons";
import SimpleReactValidator from "simple-react-validator";

class footer extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }
  state = {
    aboutUs: "",
    address: "",
    contactNumber: "",
    optionalContact: "",
    email: "",
    footerList: [],
    isError: false,
    emailTouched: false,
    message: "",
    token: ""
  };
  componentDidMount = async () => {
    await this.getFooterList();
  };
  getFooterList = async () => {
    await this.props.footerListApi();
    this.setState({ footerList: this.props.footerList });
    this.state.footerList.map((a) => {
      this.setState({
        aboutUs: a.aboutUs,
        address: a.address,
        contactNumber: a.contactNumber,
        email: a.email,
        optionalContact: a.optionalContact,
        token: a.token,
      });
    });
  };
  handleSubmit = async () => {
    const {
      aboutUs,
      address,
      contactNumber,
      optionalContact,
      email,
      token,
    } = this.state;
    if (
      this.validator.fieldValid("aboutUs") &&
      this.validator.fieldValid("address") &&
      this.validator.fieldValid("email") && 
      this.validator.fieldValid("contactNumber") &&
      this.validator.fieldValid("optionalContact")
    ) {  
    let data = {
      aboutUs: aboutUs,
      address: address,
      contactNumber: contactNumber,
      email: email,
      optionalContact: optionalContact,
      token: token,
    };
    const updateFooter = await updateFooterApi(data);
    if (updateFooter) {
      if (updateFooter.status === status.success) {
        if (updateFooter.data.code === status.success) {
          toastr.success(updateFooter.data.message);
          this.getFooterList();
        } else {
          toastr.warning(updateFooter.data.message);
        }
      } else {
        toastr.error(updateFooter.data.message);
      }
    }
    // this.props.setLoader(false);
  } else {
    this.validator.showMessages();
  }

  };

  handleChange = (event) => {
    event.persist();

    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    const {
      aboutUs,
      address,
      contactNumber,
      email,
      optionalContact,
      footerList: [],
      token,
      isError,
      message
    } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Setting", path: "/" },
              { name: "Footer" },
            ]}
          />
        </div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={(errors) => null}
        >
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                id="outlined-basic"
                multiline
                rows={3}
                variant="outlined"
                className="mb-16 w-100"
                label="aboutUs"
                onChange={this.handleChange}
                type="textarea"
                name="aboutUs"
                value={aboutUs}
                error={this.validator.message(
                  "aboutUs",
                  this.state.aboutUs,
                  "required|min:30|max:300"
                )}
                helperText={this.validator.message(
                  "aboutUs",
                  this.state.aboutUs,
                  "required|min:30|max:300"
                )}
                onBlur={() => this.validator.showMessageFor("aboutUs")}
              />
               <TextField
                 className="mb-16 w-100"
                  label="contact Number"
                  onChange={this.handleChange}
                  type="number"
                  name="contactNumber"
                  placeholder="Enter Contact Number"
                  value={contactNumber}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIphone />
                      </InputAdornment>
                    ),
                  }}
                  error={this.validator.message(
                    "contactNumber",
                    this.state.contactNumber,
                    "required|min:10|max:10"
                  )}
                  helperText={this.validator.message(
                    "contactNumber",
                    this.state.contactNumber,
                    "required|min:10|max:10"
                  )}
                  onBlur={() => this.validator.showMessageFor("contactNumber")}
                />
                 <TextField
                id="outlined-basic"
                variant="outlined"
                className="mb-16 w-100"
                label="email"
                onChange={this.handleChange}
                type="email"
                name="email"
                value={email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                error={this.validator.message(
                  "email",
                  this.state.email,
                  "required|email"
                )}
                helperText={this.validator.message(
                  "email",
                  this.state.email,
                  "required|email"
                )}
                onBlur={() => this.validator.showMessageFor("email")}
              />
             
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>


              <TextField
                id="outlined-basic"
                multiline
                rows={3}
                variant="outlined"
                className="mb-16 w-100"
                label="address"
                onChange={this.handleChange}
                type="textarea"
                name="address"
                value={address}
                error={this.validator.message(
                  "address",
                  this.state.address,
                  "required"
                )}
                helperText={this.validator.message(
                  "address",
                  this.state.address,
                  "required"
                )}
                onBlur={() => this.validator.showMessageFor("address")}
              />    
              <TextField
                  className="mb-16 w-100"
                  label="Optional Contact"
                  onChange={this.handleChange}
                  type="number"
                  name="optionalContact"
                  placeholder="Enter Optional Contact"
                  value={optionalContact}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIphone />
                      </InputAdornment>
                    ),
                  }}
                  error={this.validator.message(
                    "optionalContact",
                    this.state.optionalContact,
                    "min:10|max:10"
                  )}
                  helperText={this.validator.message(
                    "optionalContact",
                    this.state.optionalContact,
                    "min:10|max:10"
                  )}
                  onBlur={() => this.validator.showMessageFor("optionalContact")}
                />

            </Grid>
          </Grid>
          <Button color="primary" variant="contained" type="submit">
            <Icon>edit</Icon>
            <span className="pl-8 capitalize">Update</span>
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { footerList } = state.footer;
  return {
    footerList,
  };
};

export default connect(mapStateToProps, { footerListApi, updateFooterApi })(
  footer
);
