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
import UploadService from "./uploadService";

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
    progress: 0,
    selectedFile: undefined,
    isError: false,
    message: "",
    fileInfos: null
  };
  componentDidMount = async () => {
    await this.getAboutUsList();
    UploadService.getFiles(this.state.fileToken).then((response) => {
      this.setState({
        progress : (response.data.data)?100:0,
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
  onFileChange = (event) => {
    console.log(event.target.files[0]);
    this.setState({ progress: 0, selectedFile: event.target.files[0] });
    console.log(this.state.selectedFile);
  }

  upload = () => {
    console.log(this.state.selectedFile);
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
          isError: false
        });
        console.log(this.state.fileToken)
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
          isError: true
        });
      });

    this.setState({
      selectedFile: undefined,
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
      selectedFile,
      isError,
      message,
      fileInfos
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
                <Box mb={8} >
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
                        <input
                          id="btn-upload"
                          name="file"

                          style={{ display: "none" }}
                          type="file"
                          onChange={this.onFileChange}
                        />
                        <Button
                          className="btn-choose"
                          variant="outlined"
                          component="span"
                        >Choose Files</Button>
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
                      >Upload</Button>


                    </Grid>
                    <Grid container justify="space-between">
                      <Grid item>

                        <Typography
                          variant="subtitle2" >
                          {(selectedFile)
                            ? 'selected file is : ' + selectedFile.name
                            : (fileInfos)
                              ? 'uploaded file is : ' + fileInfos.fileName
                              : null
                          }
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="subtitle2"
                          className={`upload-message ${isError ? "error" : ""}`}>
                          {message}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>

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
