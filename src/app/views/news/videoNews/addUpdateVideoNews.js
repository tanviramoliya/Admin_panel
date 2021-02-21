import React, { Component } from "react";
import { Breadcrumb } from "components/matx/Breadcrumb";
import { ValidatorForm } from "react-material-ui-form-validator";
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Icon,
  Button,
  Switch,
  FormHelperText,
  MenuItem,
  Select,
  FormControl,
  Input,
  Chip,
  InputLabel,
} from "@material-ui/core";
import TextValidator from "react-material-ui-form-validator/lib/TextValidator";
import RichTextEditor from "components/matx/RichTextEditor";
import { Publish } from "@material-ui/icons";
import themeColors from "./../../../../app/MatxLayout/MatxTheme/themeColors"
import SimpleReactValidator from "simple-react-validator";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

class addUpdateVideoNews extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }
  state = {
    link: "",
    title: "",
    newsType: "",
    videoData: "",
    description: "",
    publishedBy: "",
    city: "",
    state: "",
    country: "",
    publish: false,
    critical: false,
    tags: [],
    content: `<h1>Matx | Angular material admin</h1><p><a href="http://devegret.com/" target="_blank"><strong>DevEgret</strong></a></p><p><br></p><p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>`,
  };

  componentDidMount() {}

  componentWillUnmount() {}

  handleSubmit = async (event) => {
    if (
      this.validator.fieldValid("link") &&
      this.validator.fieldValid("title") 
      // this.validator.fieldValid("vision") &&
      // this.validator.fieldValid("objective") &&
      // this.validator.fieldValid("heading") &&
      // this.validator.fieldValid("abstraction") 
    ){
      console.log(event);
    }
    else {
      this.validator.showMessages();
    }
  };

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };
  handleContentChange = (contentHtml) => {
    this.setState({
      content: contentHtml,
    });
  };
  render() {
    let {
      link,
      title,
      newsType,
      videoData,
      description,
      publishedBy,
      city,
      state,
      country,
      publish,
      critical,
      tags,
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
          onError={(errors) => null}
        >
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                className="mb-16 w-100"
                label="Embedded YouTube Link"
                onChange={this.handleChange}
                type="url"
                name="link"
                error={this.validator.message(
                  "link",
                  link,
                  "required|url"
                )}
                helperText={this.validator.message(
                  "link",
                  link,
                  "required|url"
                )}
                onBlur={() => this.validator.showMessageFor("link")}
              />
              <TextField
                className="mb-16 w-100"
                label="News Title"
                onChange={this.handleChange}
                type="text"
                name="title"
                error={this.validator.message(
                  "title",
                  title,
                  "required"
                )}
                helperText={this.validator.message(
                  "title",
                  title,
                  "required"
                )}
                onBlur={() => this.validator.showMessageFor("title")}
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
                  labelId="country"
                  id="country"
                  onChange={this.handleChange}
                  displayEmpty
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Select Country</FormHelperText>
              </FormControl>
              <FormControl className="m-4 pr-16" style={{ width: "32%" }}>
                <InputLabel shrink id="state">
                  State
                </InputLabel>
                <Select
                  labelId="state"
                  id="state"
                  onChange={this.handleChange}
                  displayEmpty
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Select State</FormHelperText>
              </FormControl>
              <FormControl className="m-4 pr-16" style={{ width: "32%" }}>
                <InputLabel shrink id="city">
                  City
                </InputLabel>
                <Select
                  labelId="city"
                  id="city"
                  onChange={this.handleChange}
                  displayEmpty
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Select City</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControl>
                <InputLabel id="tags">Tags</InputLabel>
                <Select
                  labelId="tags"
                  id="tags"
                  name="tags"
                  multiple
                  value={tags}
                  onChange={this.handleChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </div>
                  )}
                  // MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </Grid>
          </Grid>

          <Button color="primary" variant="contained" type="submit" className="mt-12">
            <Icon>add</Icon>
            <span className="pl-8 capitalize">Add News</span>
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}
export default addUpdateVideoNews;
