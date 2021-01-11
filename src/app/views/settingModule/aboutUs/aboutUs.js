import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Button, Icon, Grid, InputAdornment, TextField } from "@material-ui/core";
import { Breadcrumb } from "../../../../components/matx/index";

import { Facebook, Instagram, YouTube, Twitter, Email, LinkedIn } from '@material-ui/icons';
import {
  aboutUsListApi,
  updateAboutUsApi
} from "../../../../redux/actions/index";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { status } from "../../../../utility/config";


class aboutUs extends Component {
  state = {
    goal: "",
    mission: "",
    vision: "",
    objective: "",
    heading: "",
    abstraction: "",
    token: "",
    aboutUsList: []
  };
  componentDidMount = async () => {
    await this.getAboutUsList();
  };
  getAboutUsList = async () => {
    await this.props.aboutUsListApi();
    this.setState({ aboutUsList: this.props.aboutUsList });
    this.state.aboutUsList.map((a) => {
      this.setState({
        [a.goal]: a.goal,
        [a.mission]: a.mission,
        [a.vision]: a.vision,
        [a.objective]: a.objective,
        [a.heading]: a.heading,
        [a.abstraction]: a.token
      })
      //console.log(a.socialMediaName, a.socialMediaLink);
    })
  };
  handleSubmit = async () => {
    console.log("submitted");
    const { goal, mission, vision, objective, heading, abstraction } = this.state;
    let data = [{
      goal: goal,
      mission: mission,
      vision: vision,
      objective: objective,
      heading: heading,
      abstraction: abstraction
    }
    ];
    const updateAboutUs = await updateAboutUsApi(data);
    if (updateAboutUs) {
      if (updateAboutUs.status === status.success) {
        if (updateAboutUs.data.code === status.success) {
          toastr.success(updateAboutUs.data.message);
          this.getSocialMediaList();
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
      token: ""
    });
  };

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {
      goal, mission, vision, objective, heading, abstraction
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
                  id="outlined-multiline-static"
                  variant="outlined"
                  className="mb-16 w-100"
                  label="file"
                  onChange={this.handleChange}
                  type="file"
                  name="media"
                  //value={goal}
                  required
                />
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  variant="outlined"

                  className="mb-16 w-100"
                  label="goal"
                  onChange={this.handleChange}
                  type="textarea"
                  name="goal"
                  value={goal}

                  required
                />

                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  variant="outlined"

                  className="mb-16 w-100"
                  label="vision"
                  onChange={this.handleChange}
                  type="textarea"
                  name="vision"
                  value={vision}

                  required
                />


              </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                    id="outlined-multiline-static"
                    variant="outlined"
                    className="mb-16 w-100"
                    label="heading"
                    onChange={this.handleChange}
                    type="text"
                    name="heading"
                    value={heading}
                    required
                  />
                  <TextField
                    id="outlined-multiline-static"
                    variant="outlined"
                    className="mb-16 w-100"
                    label="abstraction"
                    onChange={this.handleChange}
                    type="text"
                    name="abstraction"
                    value={abstraction}
                    required
                    
                  />
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    variant="outlined"

                    className="mb-16 w-100"
                    label="mission"
                    onChange={this.handleChange}
                    type="textarea"
                    name="mission"
                    value={mission}
                    required
                  />
                   <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    variant="outlined"
                    className="mb-16 w-100"
                    label="objective"
                    onChange={this.handleChange}
                    type="textarea"
                    name="objective"
                    value={objective}
                    required
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
  const {aboutUsList} = state.aboutUs;
  return {
          aboutUsList,
  };
      };
      
export default connect(mapStateToProps, {aboutUsListApi, updateAboutUsApi})(
          aboutUs
);