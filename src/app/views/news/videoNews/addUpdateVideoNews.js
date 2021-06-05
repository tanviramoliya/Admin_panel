import React, { Component } from "react";
import { Breadcrumb } from "components/matx/Breadcrumb";
import { ValidatorForm } from "react-material-ui-form-validator";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { setLoader } from "../../../../redux/actions/loaderAction/loaderAction";
import {
  Grid,
  TextField,
  FormControlLabel,
  Icon,
  Button,
  Switch,
  FormHelperText,
  MenuItem,
  Select,
  FormControl,
  InputLabel, InputAdornment
} from "@material-ui/core";
import RichTextEditor from "components/matx/RichTextEditor";
import { connect } from "react-redux";
import { status } from "../../../../utility/config";
import { toastr } from "react-redux-toastr";
import SimpleReactValidator from "simple-react-validator";
import {
  addVideoNewsApi,
  updateVideoNewsApi,
  getSingleVideoNewsApi,
  newsTypeNameListApi,
  categoryNameListApi,
  getsubCateByCategoryListApi,
  countryListApi,
  getAdminNameListApi,
  stateListApi,
  cityListApi
} from "../../../../redux/actions/index";
import "./style.css"

import { YouTube, Business } from "@material-ui/icons";

class addUpdateVideoNews extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }
  state = {
    videoNewsId: this.props.location.state.id,
    videoLink: "",
    title: "",
    newsType: "",
    category: "",
    categoryToken: "",
    subCategory: "",
    publishedBy: "",
    city: "",
    state: "",
    country: "",
    optionalAddress:"",
    publish: false,
    critical: false,
    tags: [],
    content: "",
    type: this.props.location.state.type,
    newsTypeNameList: [],
    categoryNameList: [],
    countryList: [],
    subCategoryList: [],
    stateList: [],
    cityList: [],
    adminUserList: [],

    //content: `<h1>Matx | Angular material admin</h1><p><a href="http://devegret.com/" target="_blank"><strong>DevEgret</strong></a></p><p><br></p><p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>`,
  };

  componentDidMount = async () => {
    await this.getVideoNewsData();
    await this.newsTypeNameList();
    await this.categoryNameList();
    await this.setSubCategory(this.state.categoryToken);
    await this.getCountryList();
    await this.getAdminUserList();
    await this.getStateListByCountry(this.state.country);
    await this.getCityListByState(this.state.state);
  }

  newsTypeNameList = async () => {
    await this.props.newsTypeNameListApi();
    this.setState({ newsTypeNameList: this.props.newsTypeNameList })
  };
  categoryNameList = async () => {
    await this.props.categoryNameListApi();
    this.setState({ categoryNameList: this.props.categoryNameList });
  };
  getSubCatByCategory = (category) => {
    this.setState({ category: category.categoryName, categoryToken: category.categoryToken })
    this.setSubCategory(category.categoryToken);
  }
  setSubCategory = async (categoryToken) => {
    await this.props.getsubCateByCategoryListApi(categoryToken);
    this.setState({ subCategoryList: this.props.subCategoryList });
    let subcategory = this.state.subCategory; 
    this.setState({subCategory:this.props.subCategoryList.some(subCategory=>subCategory.subCategoryName === subcategory)?subcategory:""});
  }

  getCountryList = async () => {
    await this.props.countryListApi();
    this.setState({ countryList: this.props.countryList });
  };
  getStateListByCountry = async (country) => {
    this.setState({ country: country })
    await this.props.stateListApi(country);
    this.setState({ stateList: this.props.stateList });
  };
  getCityListByState = async (state) => {
    this.setState({ state: state })
    await this.props.cityListApi(state);
    this.setState({ cityList: this.props.cityList });
  }
  getAdminUserList = async () => {
    await this.props.getAdminNameListApi();
    this.setState({ adminUserList: this.props.adminUserList });
  };

  componentWillUnmount() { }
  getVideoNewsData = async () => {
    const { type, videoNewsId } = this.state;
    if (type === 'edit') {
      const videoNewsData = await getSingleVideoNewsApi(videoNewsId);
      if (videoNewsData) {
        const data = videoNewsData.data.data;
        this.setState({
          videoNewsId: data.videoNewsId,
          videoLink: data.videoLink,
          title: data.title,
          newsType: data.newsType,
          category: data.category,
          categoryToken: data.categoryToken,
          subCategory: data.subCategory,
          publishedBy: data.publishedBy,
          city: data.city,
          state: data.state,
          country: data.country,
          optionalAddress : data.optionalAddress,
          publish: data.publish,
          critical: data.critical,
          tags: data.tags,
          content: data.content
        })
      }
    }
  }

  handleTags = (e) => {
    this.setState({ tags: e })
  }
  handleSubmit = async (event) => {
    const {
      videoNewsId,
      videoLink,
      title,
      newsType,
      category,
      subCategory,
      publishedBy,
      city,
      state,
      country,
      optionalAddress,
      publish,
      critical,
      tags,
      categoryToken,
      content, type } = this.state
    if (
      this.validator.fieldValid("videoLink") &&
      this.validator.fieldValid("title") &&
      this.validator.fieldValid("newsType") &&
      this.validator.fieldValid("category") &&
      // this.validator.fieldValid("subCategory") &&
      this.validator.fieldValid("country") &&
      this.validator.fieldValid("city") &&
      this.validator.fieldValid("state") &&
      this.validator.fieldValid("publishedBy")
    ) {
      let data = {
        videoNewsId: videoNewsId,
        videoLink: videoLink,
        title: title,
        newsType: newsType,
        category: category,
        categoryToken: categoryToken,
        subCategory: subCategory,
        publishedBy: publishedBy,
        city: city,
        state: state,
        country: country,
        optionalAddress:optionalAddress,
        publish: publish,
        critical: critical,
        tags: tags,
        content: content
      };
      if (type === 'add') {
        this.props.setLoader(true);
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
        this.props.setLoader(false);
      }
      else if (type === 'edit') {
        this.props.setLoader(true);
        const updateVideoNews = await updateVideoNewsApi(data);
        if (updateVideoNews) {
          if (updateVideoNews.status === status.success) {
            if (updateVideoNews.data.code === status.success) {
              toastr.success(updateVideoNews.data.message);
              this.props.history.push('/news/videoNews')
            } else {
              toastr.warning(updateVideoNews.data.message);
            }
          } else {
            toastr.error(updateVideoNews.data.message);
          }
        }
        this.props.setLoader(false);
      }
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
      videoLink,
      title,
      newsType,
      category,
      subCategoryList,
      subCategory,
      publishedBy,
      city,
      state,
      country,
      optionalAddress,
      publish,
      critical,
      tags,
      content,
      newsTypeNameList,
      categoryNameList,
      countryList,
      stateList,
      cityList,
      adminUserList
    } = this.state;
    return (
      <div className="m-sm-30">
        <div className="flex flex-middle flex-space-between">
          <Breadcrumb
            routeSegments={[
              { name: "News | Video", path: "/news/videoNews" },
              { name: this.state.type === "add" ? "Add Video News" : "Edit Video News", path: "/" },
            ]}
          />
          <div>
            <FormControlLabel
              control={
                <Switch onClick={() => this.setState({
                  publish:
                    !publish
                })} name="publish" color="primary" checked={publish} />
              }
              label="Publish This News"
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Switch  onClick={() => this.setState({
                  critical:
                    !critical
                })} name="critical" checked={critical} />
              }
              label="Notify To Subscriber"
            />
          </div>
          <div>
            <Button
              className="capitalize text-white bg-circle-primary"
              onClick={this.handleSubmit}
            ><Icon>add</Icon>
              {this.state.type === "add" ? 'Add News' : 'Update News'}
            </Button>
          </div>
        </div>


        <ValidatorForm
          ref="form"
          onSubmit={this.state.type === "add" ? this.handleSubmit : this.updateVideoNews}
          onError={(errors) => null}
        >
          <Grid container spacing={3} style={{marginTop:'10px'}}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                className="mb-16 w-100"
                label="Embedded YouTube videoLink"
                onChange={this.handleChange}
                type="url"
                name="videoLink"
                value={videoLink}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <YouTube color="error"/>
                    </InputAdornment>
                  ),
                }}
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
                value={title}
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
                <Grid container >
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormControl className="mb-16 pr-16 w-100" error={this.validator.message(
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
                        value={newsType}
                        onChange={this.handleChange}
                        displayEmpty
                        onBlur={() => this.validator.showMessageFor("newsType")}
                      >
                        {newsTypeNameList.map((newsType, index) => {
                          return (
                            <MenuItem value={newsType.newsTypeName} key={index} >
                               
                                <div style={{ alignItems: "center", display: "flex" }}>
                                <div className={newsType.isActive?"activeDot":"inActiveDot"}></div>
                                  <div className="pl-4">{newsType.newsTypeName}</div>
                                  </div>
                               
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText style={{ color: 'red' }}>{this.validator.message(
                        "newsType",
                        newsType,
                        "required"
                      )}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormControl className="mb-16  w-100" error={this.validator.message(
                      "publishedBy",
                      publishedBy,
                      "required"
                    )}>
                      <InputLabel id="publishedBy">
                        PublishedBy
                </InputLabel>
                      <Select
                        labelId="publishedBy"
                        id="publishedBy"
                        name="publishedBy"
                        value={publishedBy}
                        onChange={this.handleChange}
                        displayEmpty
                        
                        onBlur={() => this.validator.showMessageFor("publishedBy")}
                      >
                        {adminUserList.map((admin, index) => {
                          return (
                            <MenuItem value={admin} key={index} >
                              {admin}
                            </MenuItem>
                          );
                        })}

                      </Select>
                      <FormHelperText style={{ color: 'red' }}>{this.validator.message(
                        "publishedBy",
                        publishedBy,
                        "required"
                      )}</FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xl={12}>
                <Grid container >
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormControl className="mb-16 pr-16 w-100" error={this.validator.message(
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
                        value={category}
                        onChange={this.handleChange}
                        displayEmpty
                        onBlur={() => this.validator.showMessageFor("category")}
                      >
                        {categoryNameList.map((category, index) => {
                          return (
                            <MenuItem value={category.categoryName} key={index} onClick={() => this.getSubCatByCategory(category)}>
                              <div style={{ alignItems: "center", display: "flex" }}>
                                <div className={category.isActive?"activeDot":"inActiveDot"}></div>
                                  <div className="pl-4">{category.categoryName}</div>
                                  </div>
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText style={{ color: 'red' }}>{this.validator.message(
                        "category",
                        category,
                        "required"
                      )}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormControl className="mb-16 w-100" 
                    // error={this.validator.message(
                    //   "subCategory",
                    //   subCategory,
                    //   "required"
                    // )}
                    >
                      <InputLabel id="subCategory">
                        SubCategory
                  </InputLabel>
                      <Select
                        labelId="subCategory"
                        id="subCategory"
                        name="subCategory"
                        value={subCategory}
                        onChange={this.handleChange}
                        //displayEmpty
                        onBlur={() => this.validator.showMessageFor("subCategory")}
                      >
                        {subCategoryList.map((subCategory, index) => {
                          return (
                            <MenuItem value={subCategory.subCategoryName} key={index} >
                              <div style={{ alignItems: "center", display: "flex" }}>
                                <div className={subCategory.isActive?"activeDot":"inActiveDot"}></div>
                                  <div className="pl-4">{subCategory.subCategoryName}</div>
                                  </div>
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {/* <FormHelperText style={{ color: 'red' }}>{this.validator.message(
                        "subCategory",
                        subCategory,
                        "required"
                      )}</FormHelperText> */}
                    </FormControl>
                  </Grid>
                </Grid>



              </Grid>

            </Grid>
          </Grid>
          <Grid sm={12} style={{ padding: "20px 0px" }}>
            <RichTextEditor
            readOnly={false}
              content={content}
              name="content"
              handleContentChange={this.handleContentChange}
              placeholder="insert text here..."
            />
          </Grid>
          <Grid container spacing={3}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Grid container >
                <Grid item md={4} sm={12} xs={12}>
                  <FormControl className="mb-16 pr-16 w-100" error={this.validator.message(
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
                      value={country}
                      onChange={this.handleChange}
                      displayEmpty
                      onBlur={() => this.validator.showMessageFor("country")}
                    >
                      {countryList.map((countryName, index) => {
                        return (
                          <MenuItem value={countryName} key={index} onClick={() => this.getStateListByCountry(countryName)}>
                            {countryName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText style={{ color: 'red' }}>{this.validator.message(
                      "country",
                      country,
                      "required"
                    )}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <FormControl className="mb-16 pr-16 w-100" error={this.validator.message(
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
                      value={state}
                      onChange={this.handleChange}
                      displayEmpty
                      onBlur={() => this.validator.showMessageFor("state")}
                    >
                      {stateList.map((stateName, index) => {
                        return (
                          <MenuItem value={stateName} key={index} onClick={() => this.getCityListByState(stateName)}>
                            {stateName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText style={{ color: 'red' }}>{this.validator.message(
                      "state",
                      state,
                      "required"
                    )}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <FormControl className="mb-16 w-100" error={this.validator.message(
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
                      value={city}
                      onChange={this.handleChange}
                      displayEmpty
                      onBlur={() => this.validator.showMessageFor("city")}
                    >
                      {cityList.map((cityName, index) => {
                        return (
                          <MenuItem value={cityName} key={index} onClick={() => this.handleChange}>
                            {cityName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText style={{ color: 'red' }}>{this.validator.message(
                      "city",
                      city,
                      "required"
                    )}</FormHelperText>
                  </FormControl>
                </Grid>

              </Grid>
              <Grid item lg={12} >

                <TextField
                  className="w-100"
                  label="Optional Address"
                  onChange={this.handleChange}
                  type="text"
                  name="optionalAddress"
                  value={optionalAddress}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business color="primary"/>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>

              <FormControl className="pt-12 w-100 " >
                <ReactTagInput
                  //class='react-tag-input__input'
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
  // const { } = state.videoNews;
  const { categoryNameList } = state.category;
  const { subCategoryList } = state.subCategory;
  const { newsTypeNameList } = state.newsType;
  const { countryList, stateList, cityList } = state.location;
  const { adminUserList } = state.adminUser;
  return {
    categoryNameList,
    subCategoryList,
    countryList,
    newsTypeNameList,
    adminUserList,
    stateList,
    cityList
  };
};

export default connect(mapStateToProps, { setLoader,addVideoNewsApi, categoryNameListApi, getsubCateByCategoryListApi, newsTypeNameListApi, countryListApi, stateListApi, cityListApi, getAdminNameListApi })(
  addUpdateVideoNews
);