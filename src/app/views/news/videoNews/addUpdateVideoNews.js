import React, { Component } from "react";
import { Breadcrumb } from "components/matx/Breadcrumb";
import { ValidatorForm } from "react-material-ui-form-validator";
import { Grid, RadioGroup, FormControlLabel, Radio, Checkbox, Icon, Button, Switch, FormHelperText, MenuItem, Select, FormControl, InputLabel } from "@material-ui/core";
import TextValidator from "react-material-ui-form-validator/lib/TextValidator";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import RichTextEditor from "components/matx/RichTextEditor";
import { Publish } from "@material-ui/icons";
import themeColors from "./../../../../app/MatxLayout/MatxTheme/themeColors"

class addUpdateVideoNews extends Component {
  state = {
    username: "",
    firstName: "",
    email: "",
    date: new Date(),
    creditCard: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "",
    agreement: ""
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  handleSubmit = event => {
    console.log("submitted");
    console.log(event);
  };

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = date => {
    console.log(date);

    this.setState({ date });
  };

  render() {
    let {
      username,
      firstName,
      creditCard,
      mobile,
      password,
      confirmPassword,
      gender,
      date,
      email
    } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "News | Video", path: "/news/videoNews" },
              { name: "Add Video News", path: "/" },

            ]}
          />
        </div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => null}
        >
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-16 w-100"
                label="Embedded YouTube Link"
                onChange={this.handleChange}
                type="url"
                name="link"
                //value={mobile}
                validators={["required", "url"]}
                errorMessages={["this field is required", "enter valid YouTube link"]}
              />
              <TextValidator
                className="mb-16 w-100"
                label="News Title"
                onChange={this.handleChange}
                type="text"
                name="title"
                // value={username}
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-16 w-100"
                label="First Name"
                onChange={this.handleChange}
                type="text"
                name="firstName"
                value={firstName}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-16 w-100"
                label="Email"
                onChange={this.handleChange}
                type="email"
                name="email"
                value={email}
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
              />
              <TextValidator
                className="mb-32 w-100"
                label="Credit Card"
                onChange={this.handleChange}
                type="number"
                name="creditCard"
                value={creditCard}
                validators={[
                  "required",
                  "minStringLength:16",
                  "maxStringLength: 16"
                ]}
                errorMessages={["this field is required"]}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>

              <FormControlLabel className="mt-16"
                control={<Switch onChange={this.handleChange}  name="isPublish" />}
                label="Publish This News"

              />
              <FormControlLabel className="mt-16"
                control={<Switch onChange={this.handleChange} name="isCritical" />}
                label="Notify To Subscriber"
              />
              <FormControl >
                <InputLabel shrink id="newsType">
                  News Type</InputLabel>
                <Select
                  labelId="newsType"
                  id="newsType"
                  //value={age}
                  onChange={this.handleChange}
                  displayEmpty
                //className={classes.selectEmpty}
                >

                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Select News Type</FormHelperText>
              </FormControl>
              <TextValidator
                className="mb-16 w-100"
                label="Confirm Password"
                onChange={this.handleChange}
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                validators={["required", "isPasswordMatch"]}
                errorMessages={[
                  "this field is required",
                  "password didn't match"
                ]}
              />
              <RadioGroup
                className="mb-16"
                value={gender}
                name="gender"
                onChange={this.handleChange}
                row
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio color="secondary" />}
                  label="Male"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio color="secondary" />}
                  label="Female"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="Others"
                  control={<Radio color="secondary" />}
                  label="Others"
                  labelPlacement="end"
                />
              </RadioGroup>

            </Grid>
          </Grid>
          <Button color="primary" variant="contained" type="submit">
            <Icon>send</Icon>
            <span className="pl-8 capitalize">Send</span>
          </Button>
        </ValidatorForm>
      </div>
    )
  }
}
export default addUpdateVideoNews;