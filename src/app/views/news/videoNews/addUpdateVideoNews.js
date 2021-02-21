import React, { Component } from "react";
import { Breadcrumb } from "components/matx/Breadcrumb";
import { ValidatorForm } from "react-material-ui-form-validator";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
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
import SimpleReactValidator from "simple-react-validator";
import PublishIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

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
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

class addUpdateVideoNews extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }
  state = {
    link: "",
    title: "",
    newsType: "",
    category: "",
    subCategory: "",
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

  componentDidMount() { }

  componentWillUnmount() { }

  handleTags = (e) => {
    this.setState({ tags: e })
  }
  handleSubmit = async (event) => {
    if (
      this.validator.fieldValid("link") &&
      this.validator.fieldValid("title") &&
       this.validator.fieldValid("newsType") &&
       this.validator.fieldValid("category") &&
       this.validator.fieldValid("subCategory") 
      // this.validator.fieldValid("abstraction") 
    ) {
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
  handleDelete = (event) => {
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
      category,
      subCategory,
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
        <div className="flex flex-middle flex-space-between">
          <Breadcrumb
            routeSegments={[
              { name: "News | Video", path: "/news/videoNews" },
              { name: "Add Video News", path: "/" },
            ]}
          />

          <Button
            className="capitalize text-white bg-circle-primary"
            onClick={this.handleSubmit}
          ><Icon>add</Icon>
            Add News
                  </Button>
        </div>


        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={(errors) => null}
        >
          <Grid container spacing={3}>
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
              <Grid item xl={12}>
                <FormControlLabel
                  className="mt-16"
                  control={
                    <Switch onChange={this.handleChange} name="isPublish" />
                  }
                  label="Publish This News"
                />
                <FormControlLabel
                  className="mt-16"
                  control={
                    <Switch onChange={this.handleChange} name="isCritical" />
                  }
                  label="Notify To Subscriber"
                />
              </Grid>
              <Grid item xl={12}>
                <FormControl className="m-4 pr-16" style={{ width: "32%" }} error={this.validator.message(
                  "newsType",
                  newsType,
                  "required"
                )}>
                  <InputLabel id="newsType">
                    News Type
                  </InputLabel>
                  <Select

                    labelId="newsType"
                    id="newsType"
                    name="newsType"
                    onChange={this.handleChange}
                    displayEmpty
                    onBlur={() => this.validator.showMessageFor("newsType")}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: 'red' }}>{this.validator.message(
                    "newsType",
                    newsType,
                    "required"
                  )}</FormHelperText>
                </FormControl>
                <FormControl className="m-4 pr-16" style={{ width: "32%" }} error={this.validator.message(
                  "category",
                  category,
                  "required"
                )}>
                  <InputLabel id="category">
                    Category
                  </InputLabel>
                  <Select
                    labelId="category"
                    id="category"
                    name="category"
                    onChange={this.handleChange}
                    displayEmpty
                    onBlur={() => this.validator.showMessageFor("category")}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: 'red' }}>{this.validator.message(
                    "category",
                    category,
                    "required"
                  )}</FormHelperText>
                </FormControl>
                <FormControl className="m-4 pr-16" style={{ width: "32%" }} error={this.validator.message(
                  "subCategory",
                  subCategory,
                  "required"
                )}>
                  <InputLabel id="subCategory">
                    SubCategory
                  </InputLabel>
                  <Select
                    labelId="subCategory"
                    id="subCategory"
                    name="subCategory"
                    onChange={this.handleChange}
                    displayEmpty
                    onBlur={() => this.validator.showMessageFor("subCategory")}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: 'red' }}>{this.validator.message(
                    "subCategory",
                    subCategory,
                    "required"
                  )}</FormHelperText>
                </FormControl>
              </Grid>

            </Grid>
          </Grid>
          <Grid sm={12} style={{ padding: "20px 0px" }}>
            <RichTextEditor
              content={this.state.content}
              handleContentChange={this.handleContentChange}
              placeholder="insert text here..."
            />
          </Grid>
          <Grid container spacing={3}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControl className="m-4" style={{ width: "32%" }}>
                <InputLabel id="country">
                  Country
                </InputLabel>
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
                {/* <FormHelperText>Select Country</FormHelperText> */}
              </FormControl>
              <FormControl className="m-4" style={{ width: "32%" }}>
                <InputLabel id="state">
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
                {/* <FormHelperText>Select State</FormHelperText> */}
              </FormControl>
              <FormControl className="m-4" style={{ width: "32%" }}>
                <InputLabel id="city">
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
                {/* <FormHelperText>Select City</FormHelperText> */}
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControl className="m-4 pr-32" style={{ width: "50%" }}>
                {/* <InputLabel id="tags">Tags</InputLabel>
                <Select
                  labelId="tags"
                  id="tags"
                  name="tags"
                  multiple
                  value={tags}
                  onChange={this.handleChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div style={{ display: 'flex',
                    flexWrap: 'wrap'}}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} style={{ margin: 2}}/>
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select> */}
                <ReactTagInput
                  tags={tags}
                  placeholder="Type tag and press enter"
                  maxTags={10}
                  editable={true}
                  readOnly={false}
                  removeOnBackspace={true}
                  onChange={this.handleTags}


                />
              </FormControl>
              <FormControl className="m-4 " style={{ width: "40%" }}>
                <InputLabel id="publishedBy">
                  PublishedBy
                </InputLabel>
                <Select
                  labelId="publishedBy"
                  id="publishedBy"
                  onChange={this.handleChange}
                  displayEmpty
                >
                  <MenuItem value={10}>Bharat</MenuItem>
                  <MenuItem value={20}>Tanvi</MenuItem>
                  <MenuItem value={30}>Darshan</MenuItem>
                </Select>
                {/* <FormHelperText>Select City</FormHelperText> */}
              </FormControl>

            </Grid>
          </Grid>


        </ValidatorForm>
      </div>
    );
  }
}
export default addUpdateVideoNews;
