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
      //console.log(a.socialMediaName, a.socialMediaLink);
    });
  };
  handleSubmit = async () => {
    if (
      this.validator.fieldValid("aboutUs") &&
      this.validator.fieldValid("address")
    ) {
    const {
      aboutUs,
      address,
      contactNumber,
      optionalContact,
      email,
      token,
    } = this.state;
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
                  "required|alpha"
                )}
                helperText={this.validator.message(
                  "aboutUs",
                  this.state.aboutUs,
                  "required|alpha"
                )}
                onBlur={() => this.validator.showMessageFor("aboutUs")}
              />
               <TextField
                  className="mb-16 "
                  label="contact Number"
                  onChange={this.handleChange}
                  type="number"
                  name="contactNumber"
                  placeholder="Enter Contact Number"
                  value={contactNumber}
                  validators={["required", "minStringLength:10",
                    "maxStringLength: 10"]}
                  errorMessages={["this field is required", "Contact Number must contains 10 digits", "Contact Number must contains 10 digits"]}
                  style={{ width: "-webkit-fill-available" }}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIphone />
                      </InputAdornment>
                    ),
                  }}
                />
              <TextValidator
                  className="mb-16 "
                  label="email"
                  placeholder="Enter Email"
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  value={email}
                  validators={["required", "isEmail"]}
                  errorMessages={["this field is required", "Enter valid email"]}
                  style={{ width: "-webkit-fill-available" }}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />

            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>


              <TextField
                id="outlined-basic"
                multiline
                rows={4}
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
                  "required|alpha"
                )}
                helperText={this.validator.message(
                  "address",
                  this.state.address,
                  "required|alpha"
                )}
                onBlur={() => this.validator.showMessageFor("address")}
              />
              
              <TextValidator
                  className="mb-16 "
                  label="contact Number"
                  onChange={this.handleChange}
                  type="number"
                  name="optionalContact"
                  placeholder="Enter Contact Number"
                  value={optionalContact}
                  validators={["required", "minStringLength:10",
                    "maxStringLength: 10"]}
                  errorMessages={["this field is required", "Contact Number must contains 10 digits", "Contact Number must contains 10 digits"]}
                  style={{ width: "-webkit-fill-available" }}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIphone />
                      </InputAdornment>
                    ),
                  }}
                />
             <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
        >
            
        </ValidatorForm>

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
