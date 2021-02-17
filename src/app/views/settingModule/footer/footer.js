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
} from "@material-ui/core";
import { Breadcrumb } from "../../../../components/matx/index";

import {
  footerListApi,
  updateFooterApi,
} from "../../../../redux/actions/index";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { status } from "../../../../utility/config";
import FileValidator from "./FileValidator";

class footer extends Component {
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
    console.log("submitted");
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
          this.setState({
            aboutUs: "",
            address: "",
            contactNumber: "",
            email: "",
            optionalContact: "",
            token: ""
          });
        } else {
          toastr.warning(updateFooter.data.message);
        }
      } else {
        toastr.error(updateFooter.data.message);
      }
    }
    // this.props.setLoader(false);

  };

  handleChange = (event) => {
    event.persist();

    this.setState({ [event.target.name]: event.target.value });
    this.setState({ emailTouched: true });
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
      emailTouched,
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
                error={aboutUs === ""}
                id="outlined-basic"
                multiline
                rows={4}
                variant="outlined"
                className="mb-16 w-100"
                label="aboutUs"
                onChange={this.handleChange}
                type="textarea"
                name="aboutUs"
                value={aboutUs}
                helperText={aboutUs === "" ? "this feild is required" : ""}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="mb-16 w-100"
                label="contactNumber"
                onChange={this.handleChange}
                type="number"
                name="contactNumber"
                value={contactNumber}
                error={contactNumber === ""}
                helperText={contactNumber === "" ? "this feild is required" : ""}
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
                error={email === ""}
                helperText={emailTouched ? "this feild is required" : ""}
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
                error={address === ""}
                helperText={address === "" ? "this feild is required" : ""}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="mb-16 w-100"
                label="optionalContact"
                onChange={this.handleChange}
                type="number"
                name="optionalContact"
                value={optionalContact}
                error={optionalContact === ""}
                helperText={
                  optionalContact === "" ? "this feild is required" : ""
                }
              />
             <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
        >
            <FileValidator
                onChange={this.handleChange}
                name="file"
                type="file"
                //value={file}
                validators={['isFile', 'maxFileSize:' + 1 * 1024 * 1024, 'allowedExtensions:image/png,image/jpeg']}
                errorMessages={['File is not valid', 'Size must not exceed 1MB', 'Only png and jpeg']}
            />
            <button type="submit">submit</button>
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
