import React, { Component } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import {
  Button,
  Icon,
  Grid,
  TextField,
  InputAdornment,
  Card,
} from "@material-ui/core";
import { Breadcrumb } from "../../../../components/matx/index";

import {
  footerListApi,
  updateFooterApi,
} from "../../../../redux/actions/index";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { status } from "../../../../utility/config";
import { PhoneIphone, Email } from "@material-ui/icons";
import SimpleReactValidator from "simple-react-validator";
import "../style.css"
import AccessDeniedPage from "../../sessions/accessdeniedPage";
import { setLoader } from "../../../../redux/actions/loaderAction/loaderAction";

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
    token: "",
    footerEdit: false,
    permission: true,
    perData: JSON.parse(localStorage.getItem("permission"))[9]

  };
  componentDidMount = async () => {
    const { perData } = this.state;
    if (perData.key === 'Settings' && perData.value === "N/A") {
      this.setState({ permission: false });
      return false;
    }
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
      return false;
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
      this.validator.allValid()
    ) {
      let data = {
        aboutUs: aboutUs,
        address: address,
        contactNumber: contactNumber,
        email: email,
        optionalContact: optionalContact,
        token: token,
      };
      this.props.setLoader(true);
      const updateFooter = await updateFooterApi(data);
      if (updateFooter) {
        if (updateFooter.status === status.success) {
          if (updateFooter.data.code === status.success) {
            toastr.success(updateFooter.data.message);
            this.setState({ footerEdit: false })
            this.getFooterList();
          } else {
            toastr.warning(updateFooter.data.message);
          }
        } else {
          toastr.error(updateFooter.data.message);
        }
      }
      this.props.setLoader(false);
    } else {
      this.validator.showMessages();
    }

  };

  handleChange = (event) => {
    event.persist();

    this.setState({ [event.target.name]: event.target.value });
  };
  footerEditClick = () => {
    const { perData } = this.state;
    if (perData.key === 'Settings' && perData.value === "RW") {

      this.setState({ footerEdit: true })
    } else {
      toastr.error("Access Denied!")
    }
  }
  reset = async () => {
    this.setState({ footerEdit: false })
    this.validator.hideMessages();
    this.validator.hideMessageFor("aboutUs");
    this.validator.hideMessageFor("address");
    this.validator.hideMessageFor("contactNumber");
    this.validator.hideMessageFor("email");
    this.validator.hideMessageFor("optionalContact");
    await this.getFooterList();
  }


  render() {
    const {
      aboutUs,
      address,
      contactNumber,
      email,
      optionalContact,
      footerEdit,
      permission

    } = this.state;
    if (!permission) {
      return (
        <AccessDeniedPage />
      )
    }
    else {
      return (
        <div className="m-sm-30">
          <div className="mb-sm-30">
            <Breadcrumb
              routeSegments={[
                { name: "Settings", path: "/" },
                { name: "Footer" },
              ]}
            />
          </div>
          <div className="py-12">
            <Card elevation={6} className="px-20 pt-12 h-100">
              <div className="flex flex-middle flex-space-between pb-12">
                <div className="card-title">GNTV Footer Information</div>
                <div>
                  <Button
                    color="primary"
                    variant="contained"
                    className="mr-4"
                    onClick={this.footerEditClick}
                    startIcon={<Icon>edit</Icon>}
                  >Edit Info
                  </Button>

                </div>
              </div>
            </Card>
          </div>
          <Card elevation={6} className="p-24 mt-8 h-100">
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
              onReset={this.reset}
              onError={(errors) => null}
            >
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    id="outlined-basic"
                    multiline
                    rows={3}
                    variant="outlined"
                    placeholder = "Enter About Us"
                    className="mb-16 w-100"
                    label="aboutUs"
                    onChange={this.handleChange}
                    type="textarea"
                    name="aboutUs"
                    value={aboutUs}
                    disabled={!footerEdit}
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
                    label="Contact Number"
                    onChange={this.handleChange}
                    type="text"
                    name="contactNumber"
                    value={contactNumber}
                    placeholder="Enter Contact Number"
                    variant="outlined"
                    disabled={!footerEdit}
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
                    onBlur={() => this.validator.showMessageFor("contactNumber")}
                  />
                  <TextField
                    id="outlined-basic"
                    placeholder="Enter Email"
                    variant="outlined"
                    className="mb-16 w-100"
                    label="email"
                    onChange={this.handleChange}
                    type="email"
                    name="email"
                    value={email}
                    disabled={!footerEdit}
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
                    placeholder="Enter Address"
                    value={address}
                    disabled={!footerEdit}
                    error={this.validator.message(
                      "address",
                      this.state.address,
                      "required|max:300"
                    )}
                    helperText={this.validator.message(
                      "address",
                      this.state.address,
                      "required|max:300"
                    )}
                    onBlur={() => this.validator.showMessageFor("address")}
                  />
                  <TextField
                    className="mb-16 w-100"
                    label="Optional Contact"
                    onChange={this.handleChange}
                    type="text"
                    name="optionalContact"
                    placeholder="Enter Optional Contact"
                    value={optionalContact}
                    disabled={!footerEdit}
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
                      "integer|min:10|max:10"
                    )}
                    helperText={this.validator.message(
                      "optionalContact",
                      this.state.optionalContact,
                      "integer|min:10|max:10"
                    )}
                    onBlur={() => this.validator.showMessageFor("optionalContact")}
                  />

                </Grid>
              </Grid>
              {footerEdit ?
                <>
                  <Button color="primary" variant="contained" type="submit" startIcon={
                    <Icon>edit</Icon>}>Update
            </Button>
                  <Button color="secondary" className="ml-4" variant="contained" type="reset" startIcon={
                    <Icon>highlight_off</Icon>}>Cancel
            </Button>
                </>
                : null}
            </ValidatorForm>
          </Card >
        </div >
      );
    }
  }
}
const mapStateToProps = (state) => {
  const { footerList } = state.footer;
  return {
    footerList,
  };
};

export default connect(mapStateToProps, { setLoader , footerListApi, updateFooterApi })(
  footer
);
