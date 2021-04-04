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
  Chip,
  Card,
} from "@material-ui/core";
import { Breadcrumb } from "../../../../components/matx/index";

import {
  aboutUsListApi,
  updateAboutUsApi,
} from "../../../../redux/actions/index";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { status } from "../../../../utility/config";
import UploadService from "./uploadService";
import SimpleReactValidator from "simple-react-validator";
import "../style.css";
import AccessDeniedPage from "../../sessions/accessdeniedPage";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

class aboutUs extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }
  state = {
    goal: "",
    mission: "",
    vision: "",
    objective: "",
    heading: "",
    abstraction: "",
    token: "",
    fileToken: "",
    aboutUsList: [],
    progress: 0,
    selectedFile: undefined,
    isError: false,
    message: "",
    fileInfos: null,
    infoEdit: false,
    fileEdit: false,
    permission: true,
    perData: JSON.parse(localStorage.getItem("permission"))[9]


  };
  componentDidMount = async () => {
    const { perData } = this.state;
    if (perData.key === 'Settings' && perData.value === "N/A") {
      this.setState({ permission: false });
      return false;
    }
    await this.getAboutUsList();
    UploadService.getFiles(this.state.fileToken).then((response) => {
      this.setState({
        fileToken: response.data.data ? response.data.data.fileToken : "",
        progress: response.data.data ? 100 : 0,
        fileInfos: response.data.data,
      });
    });
  };

  getAboutUsList = async () => {
    await this.props.aboutUsListApi();
    this.setState({ aboutUsList: this.props.aboutUsList });
    this.state.aboutUsList.map((a) => {
      this.setState({
        goal: a.goal,
        mission: a.mission,
        vision: a.vision,
        objective: a.objective,
        heading: a.heading,
        abstraction: a.abstraction,
        token: a.token,
        fileToken: a.fileToken,
      });
      //console.log(a.socialMediaName, a.socialMediaLink);
    });
  };
  handleSubmit = async () => {
    if (
      this.validator.fieldValid("goal") &&
      this.validator.fieldValid("mission") &&
      this.validator.fieldValid("vision") &&
      this.validator.fieldValid("objective") &&
      this.validator.fieldValid("heading") &&
      this.validator.fieldValid("abstraction")
      // this.validator.fieldValid("selectedFile") 
    ) {
      if (this.state.fileToken === "") {
        toastr.error("Plaese Upload File!")
        return false;
      }
      const {
        goal,
        mission,
        vision,
        objective,
        heading,
        abstraction,
        token,
        fileToken,
      } = this.state;
      let data = {
        goal: goal,
        mission: mission,
        vision: vision,
        objective: objective,
        heading: heading,
        abstraction: abstraction,
        token: token,
        fileToken: fileToken,
      };
      // this.props.setLoader(false);
      const updateAboutUs = await updateAboutUsApi(data);
      if (updateAboutUs) {
        if (updateAboutUs.status === status.success) {
          if (updateAboutUs.data.code === status.success) {
            toastr.success(updateAboutUs.data.message);
            this.setState({ infoEdit: false })
            this.getAboutUsList();
          } else {
            toastr.warning(updateAboutUs.data.message);
          }
        } else {
          toastr.error(updateAboutUs.data.message);
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
  onFileChange = (event) => {
    console.log(event.target.files[0]);
    this.setState({ progress: 0, selectedFile: event.target.files[0] });
    console.log(this.state.selectedFile);
  };
  changeInfo = () => {
    const { perData } = this.state;
    if (perData.key === 'Settings' && perData.value === "RW") {

      this.setState({ infoEdit: true });
      this.setState({ edit: true })
    } else {
      toastr.error("Access Denied!")
    }

  };
  changeFile = () => {
    const { perData } = this.state;
    if (perData.key === 'Settings' && perData.value === "RW") {
      this.setState({ fileEdit: true });
    } else {
      toastr.error("Access Denied!")
    }
  };
  reset = async () => {
    this.setState({ infoEdit: false });
    this.validator.hideMessages();
    this.validator.hideMessageFor("goal");
    this.validator.hideMessageFor("mission");
    this.validator.hideMessageFor("vision");
    this.validator.hideMessageFor("objective");
    this.validator.hideMessageFor("heading");
    this.validator.hideMessageFor("abstraction");

    await this.getAboutUsList();


  };
  fileCancle = async () => {
    this.setState({ fileEdit: false });
    UploadService.getFiles(this.state.fileToken).then((response) => {
      this.setState({
        fileToken: response.data.data ? response.data.data.fileToken : "",
        progress: response.data.data ? 100 : 0,
        fileInfos: response.data.data,
      });
    });
  };

  upload = () => {
    let currentFile = this.state.selectedFile;

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          fileToken: response.data.data,
          message: response.data.message,
          isError: false,
        });
        console.log(this.state.fileToken);
        return UploadService.getFiles(this.state.fileToken);
      })
      .then((response) => {
        this.setState({
          fileInfos: response.data.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
          isError: true,
        });
      });

    this.setState({
      selectedFile: undefined,
    });
  };

  render() {
    const {
      goal,
      mission,
      vision,
      objective,
      heading,
      abstraction,
      progress,
      selectedFile,
      isError,
      message,
      fileInfos,
      fileEdit,
      infoEdit,
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
                  { name: "Setting", path: "/" },
                  { name: "About Us" },
                ]}
              />
            </div>
            <div className="py-12">
              <Card elevation={6} className="px-20 pt-12 h-100">
                <div className="flex flex-middle flex-space-between pb-12">
                  <div className="card-title">GNTV About Us Information</div>
                  <div>
                    <Button
                      color="primary"
                      variant="contained"
                      className="mr-4"
                      onClick={this.changeInfo}
                      startIcon={<Icon>edit</Icon>}
                    >Edit Info
                  </Button>
                    <Button variant="contained" onClick={this.changeFile} startIcon={<Icon>attachment</Icon>}>
                      Upload File
                  </Button>
                  </div>
                </div>
              </Card>
            </div>
            <Card elevation={6} className="p-24 mt-8 h-100">
              <Grid container spacing={3}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Box mb={2} display="flex" alignItems="center">
                    <Box width="100%">
                      <BorderLinearProgress
                        variant="determinate"
                        value={progress}

                      />
                    </Box>
                    <Box minWidth={20}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >{`${progress}%`}</Typography>
                    </Box>
                  </Box>
                  <Grid container justify="space-between">
                    <Grid item>
                      <label htmlFor="btn-upload">
                        <TextField
                          id="btn-upload"
                          name="selectedFile"
                          style={{ display: "none" }}
                          type="file"
                          disabled={!fileEdit}
                          onChange={(e) => this.onFileChange(e)}
                          onBlur={() => this.validator.showMessageFor("selectedFile")}
                          error={this.validator.message(
                            "selectedFile",
                            this.state.selectedFile,
                            "required"
                          )}
                          helperText={this.validator.message(
                            "selectedFile",
                            this.state.selectedFile,
                            "required"
                          )}
                        />
                        <Button
                          className="btn-choose"
                          variant="outlined"
                          component="span"
                          disabled={!fileEdit}
                        >
                          Choose Files
                        </Button>
                      </label>
                    </Grid>
                    <Grid item>
                      <Button
                        className="btn-upload"
                        color="primary"
                        variant="contained"
                        component="span"
                        disabled={!selectedFile}
                        onClick={this.upload}

                        startIcon={<Icon>backup</Icon>}
                      >
                        Upload
                      </Button>
                    </Grid>
                    {fileEdit ?
                      <Grid item>

                        <Button
                          className="btn-upload"
                          color="secondary"
                          variant="contained"
                          component="span"

                          onClick={this.fileCancle}
                          startIcon={<Icon>highlight_off</Icon>}
                        >
                          Cancle
                      </Button>

                      </Grid>
                      : null}

                  </Grid>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Grid item>
                    <div className="pt-4">
                      {isError ?
                        <Typography
                          variant="subtitle2"
                          className={`upload-message ${isError ? "error" : ""}`}
                        >
                          {message}
                        </Typography>
                        : null
                      }
                      {selectedFile
                        ?
                        <Chip

                          label={selectedFile.name}
                          onDelete={() => { this.setState({ selectedFile: "", fileToken: "", progress: 0 }) }}
                          color="primary"
                          variant="outlined"
                          disabled={!fileEdit}
                        />
                        : fileInfos ? <Chip
                          label={fileInfos.fileName}
                          onDelete={() => { this.setState({ fileInfos: "", fileToken: "", progress: 0 }) }}
                          color="primary"
                          variant="outlined"
                          disabled={!fileEdit}
                        /> : null}
                    </div>

                  </Grid>
                </Grid>
              </Grid>
            </Card>
            <Card elevation={6} className="p-24 mt-20 h-100">
              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onReset={this.reset}
                onError={(errors) => null}
              >
                <Grid container spacing={3}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      className="mb-16 w-100"
                      label="Heading"
                      onChange={this.handleChange}
                      type="text"
                      name="heading"
                      value={heading}
                      disabled={!infoEdit}
                      error={this.validator.message(
                        "heading",
                        this.state.heading,
                        "required"
                      )}
                      helperText={this.validator.message(
                        "heading",
                        this.state.heading,
                        "required"
                      )}
                      onBlur={() => this.validator.showMessageFor("heading")}
                    />
                    <TextField
                      error={this.validator.message(
                        "goal",
                        this.state.goal,
                        "required"
                      )}
                      id="outlined-basic"
                      multiline
                      rows={3}
                      variant="outlined"
                      className="mb-16 w-100"
                      label="Goal"
                      onChange={this.handleChange}
                      type="textarea"
                      disabled={!infoEdit}
                      name="goal"
                      value={goal}
                      onBlur={() => this.validator.showMessageFor("goal")}
                      helperText={this.validator.message(
                        "goal",
                        this.state.goal,
                        "required"
                      )}
                    />
                    <TextField
                      id="outlined-basic"
                      multiline
                      rows={3}
                      variant="outlined"
                      className="mb-16 w-100"
                      label="Vision"
                      onChange={this.handleChange}
                      type="textarea"
                      disabled={!infoEdit}

                      name="vision"
                      value={vision}
                      error={this.validator.message(
                        "vision",
                        this.state.vision,
                        "required"
                      )}
                      helperText={this.validator.message(
                        "vision",
                        this.state.vision,
                        "required"
                      )}
                      onBlur={() => this.validator.showMessageFor("vision")}
                    />

                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12}>


                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      className="mb-16 w-100"
                      label="Abstraction"
                      onChange={this.handleChange}
                      type="text"
                      name="abstraction"
                      value={abstraction}
                      disabled={!infoEdit}

                      error={this.validator.message(
                        "abstraction",
                        this.state.abstraction,
                        "required"
                      )}
                      helperText={this.validator.message(
                        "abstraction",
                        this.state.abstraction,
                        "required"
                      )}
                      onBlur={() => this.validator.showMessageFor("abstraction")}
                    />
                    <TextField
                      id="outlined-basic"
                      multiline
                      rows={3}
                      variant="outlined"
                      className="mb-16 w-100"
                      label="Mission"
                      onChange={this.handleChange}
                      type="textarea"
                      name="mission"
                      value={mission}
                      disabled={!infoEdit}

                      error={this.validator.message(
                        "mission",
                        this.state.mission,
                        "required"
                      )}
                      helperText={this.validator.message(
                        "mission",
                        this.state.mission,
                        "required"
                      )}
                      onBlur={() => this.validator.showMessageFor("mission")}
                    />
                    <TextField
                      id="outlined-basic"
                      multiline
                      rows={3}
                      variant="outlined"
                      className="mb-16 w-100"
                      label="Objective"
                      onChange={this.handleChange}
                      type="textarea"
                      name="objective"
                      disabled={!infoEdit}

                      value={objective}
                      error={this.validator.message(
                        "objective",
                        this.state.objective,
                        "required"
                      )}
                      helperText={this.validator.message(
                        "objective",
                        this.state.objective,
                        "required"
                      )}
                      onBlur={() => this.validator.showMessageFor("objective")}
                    />

                  </Grid>

                </Grid>
                {infoEdit ?
                  <>
                    <Button color="primary" variant="contained" type="submit" startIcon={<Icon>edit</Icon>}>
                      Update
                  </Button>
                    <Button
                      color="secondary" variant="contained" type="reset"
                      className="ml-4" startIcon={<Icon>highlight_off</Icon>}
                    >Cancle
                  </Button>
                  </>
                  : null}
              </ValidatorForm>
            </Card>
          </div >
        </>
      );
    }
  }
}
const mapStateToProps = (state) => {
  const { aboutUsList } = state.aboutUs;
  return {
    aboutUsList,
  };
};

export default connect(mapStateToProps, { aboutUsListApi, updateAboutUsApi })(
  aboutUs
);
