import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Button, Icon, Grid , TextField, InputAdornment} from "@material-ui/core";
import { Breadcrumb } from "../../../../components/matx/index";

import {Facebook , Instagram , YouTube, Twitter, Email,LinkedIn} from '@material-ui/icons';

class socialMedia extends Component {
  state = {
    facebook: "",
    twitter: "",
    googlePlus: "",
    linkedIn: "",
    instagram: "",
    youTube: "",
    email : ""
  };
  handleSubmit = (event) => {
    console.log("submitted");
    console.log(event);
  };

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {
      facebook,
      twitter,
      googlePlus,
      linkedIn,
      email,
      instagram,
      youTube,
    } = this.state;
    return (
      <>
        <div className="m-sm-30">
          <div className="mb-sm-30">
            <Breadcrumb
              routeSegments={[
                { name: "Setting", path: "/" },
                { name: "Social Media" },
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
                <TextValidator
                  className="mb-16 w-100"
                  label="instagram"
                  onChange={this.handleChange}
                  type="text"
                  name="instagram"
                  value={instagram}
                  validators={[
                    "required",
                  ]}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Instagram />
                      </InputAdornment>
                    ),
                  }}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="mb-16 w-100"
                  label="youTube"
                  onChange={this.handleChange}
                  type="text"
                  name="youTube"
                  value={youTube}
                  validators={[
                    "required",
                  ]}
                  errorMessages={["this field is required"]}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <YouTube />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextValidator
                  className="mb-16 w-100"
                  label="Twitter"
                  onChange={this.handleChange}
                  type="text"
                  name="twitter"
                  value={twitter}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Twitter />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextValidator
                  className="mb-16 w-100"
                  label="Email"
                  onChange={this.handleChange}
                  type="text"
                  name="email"
                  value={email}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
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
              <TextValidator
                  className="mb-16 w-100"
                  label="Facebook"
                  onChange={this.handleChange}
                  type="text"
                  name="facebook"
                  value={facebook}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Facebook />
                      </InputAdornment>
                    ),
                  }}
                />
              <TextValidator
                  className="mb-16 w-100"
                  label="LinkedIn"
                  onChange={this.handleChange}
                  type="text"
                  name="linkedIn"
                  value={linkedIn}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedIn />
                      </InputAdornment>
                    ),
                  }}
                />
            </Grid>
              </Grid>              
            <Button color="primary" variant="contained" type="submit">
              <Icon>edit</Icon>
              <span className="pl-8 capitalize">Update</span>
            </Button>
          </ValidatorForm>
        </div>
      </>
    );
  }
}

export default socialMedia;
