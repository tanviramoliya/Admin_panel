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
  aboutUsListApi,
  updateAboutUsApi,
} from "../../../../redux/actions/index";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { status } from "../../../../utility/config";
import UploadService  from "./uploadService";

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
    progress: 10,
    selectedFiles : undefined,
    isError: false,
    message: "",
  };
  componentDidMount = async () => {
    await this.getAboutUsList();
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
    console.log("submitted");
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
    const updateAboutUs = await updateAboutUsApi(data);
    if (updateAboutUs) {
      if (updateAboutUs.status === status.success) {
        if (updateAboutUs.data.code === status.success) {
          toastr.success(updateAboutUs.data.message);
          this.getAboutUsList();
        } else {
          toastr.warning(updateAboutUs.data.message);
        }
      } else {
        toastr.error(updateAboutUs.data.message);
      }
    }
    // this.props.setLoader(false);
    this.setState({
      goal: "",
      mission: "",
      vision: "",
      objective: "",
      heading: "",
      abstraction: "",
      token: "",
    });
  };

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };
  selectFile = (event) => {
    this.setState({
      selectedFiles: event.target.files,
    });
    console.log(event.target.files);
  }
  
  upload() {
    let currentFile = this.state.selectedFiles[0];

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
          message: response.data.message,
          isError: false
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
          isError: true
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  render() {
    const {
      goal,
      mission,
      vision,
      objective,
      heading,
      abstraction,
      progress,
      selectedFiles,
      isError,
      message
    } = this.state;
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
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={(errors) => null}
          >
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  error={goal === ""}
                  id="outlined-basic"
                  multiline
                  rows={4}
                  variant="outlined"
                  className="mb-16 w-100"
                  label="Goal"
                  onChange={this.handleChange}
                  type="textarea"
                  name="goal"
                  value={goal}
                  helperText={goal === "" ? "this feild is required" : ""}
                />

                <TextField
                  id="outlined-basic"
                  multiline
                  rows={4}
                  variant="outlined"
                  className="mb-16 w-100"
                  label="Vision"
                  onChange={this.handleChange}
                  type="textarea"
                  name="vision"
                  value={vision}
                  error={vision === ""}
                  helperText={vision === "" ? "this feild is required" : ""}
                />
                <Box className="mb25" display="flex" alignItems="center">
                  <Box width="100%" mr={1}>
                    <BorderLinearProgress
                      variant="determinate"
                      value={progress}
                    />
                  </Box>
                  <Box minWidth={35}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >{`${progress}%`}</Typography>
                  </Box>
                </Box>
                <label htmlFor="btn-upload">
                  <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{ display: "none" }}
                    type="file"
                    onChange={this.selectFile}
                  />
                  <Button
                    className="btn-choose"
                    variant="outlined"
                    component="span"
                  >
                    Choose Files
                  </Button>
                </label>
                <div className="file-name">
                  {selectedFiles && selectedFiles.length > 0
                    ? selectedFiles[0].name
                    : null}
                </div>
                <Button
                  className="btn-upload"
                  color="primary"
                  variant="contained"
                  component="span"
                  disabled={!selectedFiles}
                  onClick={this.upload}
                >
                  Upload
                </Button>

                <Typography
                  variant="subtitle2"
                  className={`upload-message ${isError ? "error" : ""}`}
                >
                  {message}
                </Typography>
              </Grid>

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
                  error={heading === ""}
                  helperText={heading === "" ? "this feild is required" : ""}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  className="mb-16 w-100"
                  label="Abstraction"
                  onChange={this.handleChange}
                  type="text"
                  name="abstraction"
                  value={abstraction}
                  error={abstraction === ""}
                  helperText={
                    abstraction === "" ? "this feild is required" : ""
                  }
                />
                <TextField
                  id="outlined-basic"
                  multiline
                  rows={4}
                  variant="outlined"
                  className="mb-16 w-100"
                  label="Mission"
                  onChange={this.handleChange}
                  type="textarea"
                  name="mission"
                  value={mission}
                  error={mission === ""}
                  helperText={mission === "" ? "this feild is required" : ""}
                />
                <TextField
                  id="outlined-basic"
                  multiline
                  rows={4}
                  variant="outlined"
                  className="mb-16 w-100"
                  label="Objective"
                  onChange={this.handleChange}
                  type="textarea"
                  name="objective"
                  value={objective}
                  error={objective === ""}
                  helperText={objective === "" ? "this feild is required" : ""}
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
const mapStateToProps = (state) => {
  const { aboutUsList } = state.aboutUs;
  return {
    aboutUsList,
  };
};

export default connect(mapStateToProps, { aboutUsListApi, updateAboutUsApi })(
  aboutUs
);
