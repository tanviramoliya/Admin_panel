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
import { connect } from "react-redux";
import { status } from "../../../../utility/config";
import { toastr } from "react-redux-toastr";
import  history  from "../../../../history";
import SimpleReactValidator from "simple-react-validator";
import PublishIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import {
  videoNewsListApi,
  deleteVideoNewsApi,
  addVideoNewsApi,
  updateVideoNewsApi,
} from "../../../../redux/actions/index";

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
    videoLink: "",
    title: "",
    newsType: "",
    category: "",
    subCategory: "",
    publishedBy: "",
    city: "",
    state: "",
    country: "",
    publish: false,
    critical: false,
    tags: [],
    content: ""
    //content: `<h1>Matx | Angular material admin</h1><p><a href="http://devegret.com/" target="_blank"><strong>DevEgret</strong></a></p><p><br></p><p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>`,
  };

  componentDidMount() { }

  componentWillUnmount() { }

  handleTags = (e) => {
    this.setState({ tags: e })
  }
  handleSubmit = async (event) => {
    const { videoLink,
      title,
      newsType,
      category,
      subCategory,
      publishedBy,
      city,
      state,
      country,
      publish,
      critical,
      tags,
      content } = this.state
    if (
      this.validator.fieldValid("videoLink") &&
      this.validator.fieldValid("title") &&
      this.validator.fieldValid("newsType") &&
      this.validator.fieldValid("category") &&
      this.validator.fieldValid("subCategory") &&
      this.validator.fieldValid("country") &&
      this.validator.fieldValid("city") &&
      this.validator.fieldValid("state") &&
      this.validator.fieldValid("publishedBy")
    ) {
      console.log(event);
      let data = {
        videoLink : videoLink,
        title : title,
        newsType : newsType,
        category : category,
        subCategory : subCategory,
        publishedBy : publishedBy,
        city : city,
        state : state,
        country : country,
        publish : publish,
        critical : critical,
        tags : tags,
        content : content
      };
      const createVideoNews = await addVideoNewsApi(data);
      if (createVideoNews) {
        if (createVideoNews.status === status.success) {
          if (createVideoNews.data.code === status.success) {
            toastr.success(createVideoNews.data.message);
            this.props.history.push('/news/videoNews')
          } else {
            toastr.warning(createVideoNews.data.message);
          }
        } else {
          toastr.error(createVideoNews.data.message);
        }
      }
      // this.props.setLoader(false);
      


    }
    else {
      this.validator.showMessages();
    }
  };

  handleChange = (event) => {
    event.persist();
    console.log(event)
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
      videoLink,
      title,
      newsType,
      category,
      subCategory,
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
                label="Embedded YouTube videoLink"
                onChange={this.handleChange}
                type="url"
                name="videoLink"
                error={this.validator.message(
                  "videoLink",
                  videoLink,
                  "required|url"
                )}
                helperText={this.validator.message(
                  "videoLink",
                  videoLink,
                  "required|url"
                )}
                onBlur={() => this.validator.showMessageFor("videoLink")}
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
                    <Switch onClick={() => this.setState({publish :
                      !publish})} name="publish" />
                  }
                  label="Publish This News"
                />
                <FormControlLabel
                  className="mt-16"
                  control={
                    <Switch onClick={() => this.setState({critical :
                      !critical})} name="critical" />
                  }
                  label="Notify To Subscriber"
                />


                <FormControl style={{ width: "43%" }}>
                  <InputLabel id="publishedBy" error={this.validator.message(
                    "newsType",
                    newsType,
                    "required"
                  )}>
                    PublishedBy
                </InputLabel>
                  <Select
                    labelId="publishedBy"
                    id="publishedBy"
                    name="publishedBy"
                    onChange={this.handleChange}
                    displayEmpty
                    onBlur={() => this.validator.showMessageFor("publishedBy")}
                  >
                    <MenuItem value={10}>Bharat</MenuItem>
                    <MenuItem value={20}>Tanvi</MenuItem>
                    <MenuItem value={30}>Darshan</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: 'red' }}>{this.validator.message(
                    "publishedBy",
                    publishedBy,
                    "required"
                  )}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xl={12}>
                <FormControl className="mt-8" style={{ width: "32%" }} error={this.validator.message(
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
                <FormControl className="mt-8 mx-8" style={{ width: "32%" }} error={this.validator.message(
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
                <FormControl className="mt-8 " style={{ width: "33%" }} error={this.validator.message(
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
              name="content"
              handleContentChange={this.handleContentChange}
              placeholder="insert text here..."
            />
          </Grid>
          <Grid container spacing={3}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControl className="m-4" style={{ width: "32%" }} error={this.validator.message(
                "country",
                country,
                "required"
              )}>
                <InputLabel id="country">
                  Country
                  </InputLabel>
                <Select

                  labelId="country"
                  id="country"
                  name="country"
                  onChange={this.handleChange}
                  displayEmpty
                  onBlur={() => this.validator.showMessageFor("country")}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText style={{ color: 'red' }}>{this.validator.message(
                  "country",
                  country,
                  "required"
                )}</FormHelperText>
              </FormControl>
              <FormControl className="m-4" style={{ width: "32%" }} error={this.validator.message(
                "state",
                state,
                "required"
              )}>
                <InputLabel id="state">
                  State
                  </InputLabel>
                <Select
                  labelId="state"
                  id="state"
                  name="state"
                  onChange={this.handleChange}
                  displayEmpty
                  onBlur={() => this.validator.showMessageFor("state")}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText style={{ color: 'red' }}>{this.validator.message(
                  "state",
                  state,
                  "required"
                )}</FormHelperText>
              </FormControl>
              <FormControl className="m-4" style={{ width: "32%" }} error={this.validator.message(
                "city",
                city,
                "required"
              )}>
                <InputLabel id="city">
                  City
                  </InputLabel>
                <Select
                  labelId="city"
                  id="city"
                  name="city"
                  onChange={this.handleChange}
                  displayEmpty
                  onBlur={() => this.validator.showMessageFor("city")}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText style={{ color: 'red' }}>{this.validator.message(
                  "city",
                  city,
                  "required"
                )}</FormHelperText>
              </FormControl>

            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>

              <FormControl className="pt-12 w-100" >
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



            </Grid>
          </Grid>


        </ValidatorForm>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const {  } = state.videoNews;
  return {

  };
};

export default connect(mapStateToProps, {  addVideoNewsApi })(
  addUpdateVideoNews
);