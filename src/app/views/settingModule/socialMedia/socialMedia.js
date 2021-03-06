import React, { Component } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { Button, Icon, Grid, InputAdornment, Card, TextField } from "@material-ui/core";
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
import "../style.css";
import { toastr } from "react-redux-toastr";
import { status } from "../../../../utility/config";
import SimpleReactValidator from "simple-react-validator";
import AccessDeniedPage from "../../sessions/accessdeniedPage";
import { setLoader } from "../../../../redux/actions/loaderAction/loaderAction";

class socialMedia extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this ,messages : { required : 'This field is required'}});
  }
  state = {
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    youtube: "",
    envelope: "",
    socialMediaList: [],
    edit: false,
    permission: true,
    perData: JSON.parse(localStorage.getItem("permission"))[9]

  };
  componentDidMount = async () => {
    const { perData } = this.state;
    if (perData.key === 'Settings' && perData.value === "N/A") {
      this.setState({ permission: false });
      return false;
    }
    await this.getSocialMediaList();
  };
  getSocialMediaList = async () => {
    await this.props.socialMediaListApi();
    this.setState({ socialMediaList: this.props.socialMediaList });
    this.state.socialMediaList.map((s) => {
      this.setState({ [s.socialMediaName]: s.socialMediaLink });
      return false;
    });
  };
  handleSubmit = async () => {
    const {
      facebook,
      instagram,
      youtube,
      envelope,
      twitter,
      linkedin,
    } = this.state;
    if (
      this.validator.allValid()
    ) {
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
          socialMediaName: "youtube",
          socialMediaLink: youtube,
        },
        {
          socialMediaName: "envelope",
          socialMediaLink: envelope,
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
      this.props.setLoader(true);
      const updateSocialMedia = await updateSocialMediaApi(data);
      if (updateSocialMedia) {
        if (updateSocialMedia.status === status.success) {
          if (updateSocialMedia.data.code === status.success) {
            toastr.success(updateSocialMedia.data.message);
            this.getSocialMediaList();
            this.setState({ edit: false })
          } else {
            toastr.warning(updateSocialMedia.data.message);
          }
        } else {
          toastr.error(updateSocialMedia.data.message);
        }
      }
      this.props.setLoader(false);
    }
    else {
      this.validator.showMessages();
    }
  };

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };
  changeEdit = () => {
    const { perData } = this.state;
    if (perData.key === 'Settings' && perData.value === "RW") {
   
    this.setState({ edit: true })
  } else {
    toastr.error("Access Denied!")
  }
  }
  
  reset = async () => {
    this.setState({ edit: false })
    this.validator.hideMessages();
    this.validator.hideMessageFor("facebook");
    this.validator.hideMessageFor("instagram");
    this.validator.hideMessageFor("youtube");
    this.validator.hideMessageFor("envelope");
    this.validator.hideMessageFor("twitter");
    this.validator.hideMessageFor("linkedin");
    await this.getSocialMediaList();

  }
  render() {
    const {
      facebook,
      twitter,
      linkedin,
      envelope,
      instagram,
      youtube,
      edit,
      permission
    } = this.state;
    if (!permission) {
      return (
        <AccessDeniedPage />
      )
    }
    else {

      return (
        <>
          <div className="m-sm-30">
            <div className="mb-sm-30">
              <Breadcrumb
                routeSegments={[
                  { name: "Settings", path: "/" },
                  { name: "Social Media" },
                ]}
              />
            </div>
            <div className="py-12">
              <Card elevation={6} className="px-20 pt-12 h-100">
                <div className="flex flex-middle flex-space-between pb-12">
                  <div className="card-title">GNTV Social Media Information</div>
                  <div>
                    <Button
                      color="primary"
                      variant="contained"
                      className="mr-4"
                      onClick={this.changeEdit}
                      startIcon={<Icon>edit</Icon>}
                    >Edit Info
                  </Button>

                  </div>
                </div>
              </Card>
            </div>
            <Card elevation={6} className="p-24 h-100">
              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onReset={this.reset}
                onError={(errors) => null}
              >
                <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>

                    <TextField
                      className="mb-16 w-100"
                      label="Instagram"
                      onChange={this.handleChange}
                      type="url"
                      name="instagram"
                      value={instagram}
                      disabled={!edit}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Instagram />
                          </InputAdornment>
                        ),
                      }}
                      error={this.validator.message(
                        "instagram",
                        this.state.instagram,
                        "required|url"
                      )}
                      helperText={this.validator.message(
                        "instagram",
                        this.state.instagram,
                        "required|url"
                      )}
                      onBlur={() => this.validator.showMessageFor("instagram")}
                    />


                    <TextField
                      className="mb-16 w-100"
                      label="Youtube"
                      onChange={this.handleChange}
                      type="url"
                      name="youtube"
                      value={youtube}
                      disabled={!edit}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <YouTube />
                          </InputAdornment>
                        ),
                      }}
                      error={this.validator.message(
                        "youtube",
                        this.state.youtube,
                        "required|url"
                      )}
                      helperText={this.validator.message(
                        "youtube",
                        this.state.youtube,
                        "required|url"
                      )}
                      onBlur={() => this.validator.showMessageFor("youtube")}
                    />

                    {/* "matchRegexp:^(http://|https://)?(?:www.)?twitter.com/(?:#!/)?@?([^?#]*)(?:[?#].*)?$", */}

                    <TextField
                      className="mb-16 w-100"
                      label="Twitter"
                      onChange={this.handleChange}
                      type="url"
                      name="twitter"
                      value={twitter}
                      disabled={!edit}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Twitter />
                          </InputAdornment>
                        ),
                      }}
                      error={this.validator.message(
                        "twitter",
                        this.state.twitter,
                        "required|url"
                      )}
                      helperText={this.validator.message(
                        "twitter",
                        this.state.twitter,
                        "required|url"
                      )}
                      onBlur={() => this.validator.showMessageFor("twitter")}
                    />


                    <TextField
                      className="mb-16 w-100"
                      label="Email"
                      onChange={this.handleChange}
                      type="envelope"
                      name="envelope"
                      value={envelope}
                      disabled={!edit}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                      error={this.validator.message(
                        "envelope",
                        this.state.envelope,
                        "required|envelope"
                      )}
                      helperText={this.validator.message(
                        "envelope",
                        this.state.envelope,
                        "required|envelope"
                      )}
                      onBlur={() => this.validator.showMessageFor("envelope")}
                    />
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12}>

                    <TextField
                      className="mb-16 w-100"
                      label="Facebook"
                      onChange={this.handleChange}
                      type="url"
                      name="facebook"
                      value={facebook}
                      disabled={!edit}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Facebook />
                          </InputAdornment>
                        ),
                      }}
                      error={this.validator.message(
                        "facebook",
                        this.state.facebook,
                        "required|url"
                      )}
                      helperText={this.validator.message(
                        "facebook",
                        this.state.facebook,
                        "required|url"
                      )}
                      onBlur={() => this.validator.showMessageFor("facebook")}
                    />

                    <TextField
                      className="mb-16 w-100"
                      label="LinkedIn"
                      onChange={this.handleChange}
                      type="url"
                      name="linkedin"
                      value={linkedin}
                      disabled={!edit}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LinkedIn />
                          </InputAdornment>
                        ),
                      }}
                      error={this.validator.message(
                        "linkedin",
                        this.state.linkedin,
                        "required|url"
                      )}
                      helperText={this.validator.message(
                        "linkedin",
                        this.state.linkedin,
                        "required|url"
                      )}
                      onBlur={() => this.validator.showMessageFor("linkedin")}
                    />

                  </Grid>
                </Grid>
                {edit ? (
                  <>
                    <Button color="primary" variant="contained" type="submit"
                      startIcon={<Icon>edit</Icon>}>
                      Update
                  </Button>
                    <Button color="secondary" variant="contained" type="reset" className="ml-4" startIcon={<Icon>highlight_off</Icon>}>
                      Cancel
                  </Button>
                  </>
                ) : null}
              </ValidatorForm>
            </Card>
          </div>
        </>
      );
    }
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
  setLoader,
  socialMediaListApi,
  updateSocialMediaApi,
})(socialMedia);
