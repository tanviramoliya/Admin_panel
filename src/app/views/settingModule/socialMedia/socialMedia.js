import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Button, Icon, Grid, InputAdornment, Card } from "@material-ui/core";
import { Breadcrumb } from "../../../../components/matx/index";

import {
  Facebook,
  Instagram,
  YouTube,
  Twitter,
  Email,
  LinkedIn,
} from "@material-ui/icons";
import {
  socialMediaListApi,
  updateSocialMediaApi,
} from "../../../../redux/actions/index";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { status } from "../../../../utility/config";

class socialMedia extends Component {
  state = {
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    youTube: "",
    email: "",
    socialMediaList: [],
    edit: false,
  };
  componentDidMount = async () => {
    await this.getSocialMediaList();
  };
  getSocialMediaList = async () => {
    await this.props.socialMediaListApi();
    this.setState({ socialMediaList: this.props.socialMediaList });
    this.state.socialMediaList.map((s) => {
      this.setState({ [s.socialMediaName]: s.socialMediaLink });
      console.log(s.socialMediaName, s.socialMediaLink);
    });
  };
  handleSubmit = async () => {
    console.log("submitted");
    const {
      facebook,
      instagram,
      youTube,
      email,
      twitter,
      linkedin,
    } = this.state;
    let data = [
      {
        socialMediaName: "facebook",
        socialMediaLink: facebook,
      },
      {
        socialMediaName: "instagram",
        socialMediaLink: instagram,
      },
      {
        socialMediaName: "youTube",
        socialMediaLink: youTube,
      },
      {
        socialMediaName: "email",
        socialMediaLink: email,
      },
      {
        socialMediaName: "twitter",
        socialMediaLink: twitter,
      },
      {
        socialMediaName: "linkedin",
        socialMediaLink: linkedin,
      },
    ];
    const updateSocialMedia = await updateSocialMediaApi(data);
    if (updateSocialMedia) {
      if (updateSocialMedia.status === status.success) {
        if (updateSocialMedia.data.code === status.success) {
          toastr.success(updateSocialMedia.data.message);
          this.getSocialMediaList();
          this.setState({ edit : false})
        } else {
          toastr.warning(updateSocialMedia.data.message);
        }
      } else {
        toastr.error(updateSocialMedia.data.message);
      }
    }
    // this.props.setLoader(false);
    this.setState({
      facebook: "",
      instagram: "",
      youTube: "",
      email: "",
      twitter: "",
      linkedin: "",
    });
  };

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };
  changeEdit = () => {
    this.setState({ edit : true})
  }
  reset = () => {
    this.setState({ edit : false})
  }
  render() {
    const {
      facebook,
      twitter,
      linkedin,
      email,
      instagram,
      youTube,
      edit,
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
          <Card elevation={6} className="p-24 h-100">
            <ValidatorForm
              ref="form"
              onSubmit={edit ? this.handleSubmit : this.changeEdit}
              onReset={this.reset}
              onError={(errors) => null}
            >
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextValidator
                    className="mb-16 w-100"
                    label="instagram"
                    onChange={this.handleChange}
                    type="textArea"
                    disabled={!edit}
                    name="instagram"
                    value={instagram}
                    validators={["required"]}
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
                    type="url"
                    name="youTube"
                    value={youTube}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <YouTube />
                        </InputAdornment>
                      ),
                    }}
                    disabled={!edit}
                  />
                  <TextValidator
                    className="mb-16 w-100"
                    label="Twitter"
                    onChange={this.handleChange}
                    type="url"
                    name="twitter"
                    value={twitter}
                    validators={[
                      "required",
                      "matchRegexp:^(http://|https://)?(?:www.)?twitter.com/(?:#!/)?@?([^?#]*)(?:[?#].*)?$",
                    ]}
                    errorMessages={[
                      "this field is required",
                      "Please enter valid Twitter URL",
                    ]}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Twitter />
                        </InputAdornment>
                      ),
                    }}
                    disabled={!edit}
                  />
                  <TextValidator
                    className="mb-16 w-100"
                    label="Email"
                    onChange={this.handleChange}
                    type="text"
                    name="email"
                    value={email}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "this field is required",
                      "Please enter valid email",
                    ]}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextValidator
                    className="mb-16 w-100"
                    label="Facebook"
                    onChange={this.handleChange}
                    type="url"
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
                    disabled={!edit}
                  />
                  <TextValidator
                    className="mb-16 w-100"
                    label="LinkedIn"
                    onChange={this.handleChange}
                    type="url"
                    name="linkedin"
                    value={linkedin}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkedIn />
                        </InputAdornment>
                      ),
                    }}
                    disabled={!edit}
                  />
                </Grid>
              </Grid>
              {edit ? (
                <>
                  <Button color="primary" variant="contained" type="submit">
                    <Icon>edit</Icon>
                    <span className="pl-8 capitalize">Update</span>
                  </Button>
                  <Button color="secondary" variant="contained" type="reset" className="ml-4">
                    <Icon>highlight_off</Icon>
                    <span className="pl-8 capitalize">Cancle</span>
                  </Button>
                </>
              ) : (
                <Button color="primary" variant="contained" type="submit">
                  <Icon>edit</Icon>
                  <span className="pl-8 capitalize">Edit</span>
                </Button>
              )}
            </ValidatorForm>
          </Card>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { socialMediaList, facebook } = state.socialMedia;
  return {
    socialMediaList,
    facebook,
  };
};

export default connect(mapStateToProps, {
  socialMediaListApi,
  updateSocialMediaApi,
})(socialMedia);
