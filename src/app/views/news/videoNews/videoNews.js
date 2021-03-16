import React, { Component } from "react";
import {
  videoNewsListApi,
  deleteVideoNewsApi,
  addVideoNewsApi,
  updateVideoNewsApi,
} from "../../../../redux/actions/index";
import { status } from "../../../../utility/config";
import { toastr } from "react-redux-toastr";
import { Breadcrumb } from "../../../../components/matx/Breadcrumb";
import {
  Card, Button, Table,
  TableHead, TableRow, TableCell, TableBody, IconButton,
  Icon, TablePagination, Badge, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Grid, InputAdornment, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl, Chip, Avatar, Tooltip, Slide, Toolbar, AppBar, Typography, TextField, TableSortLabel
} from "@material-ui/core";
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PhoneIphone, Email, Person, GroupAdd, Search } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import history from "../../../../history";
import "./style.css";
import { Theme, makeStyles, withStyles, createStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
  }
}))(Badge);

class videoNews extends Component {
  state = {
    videoNewsList: [],
    count: "",
    sortingField: "createdTime",
    sortingOrder: "asc",
    keyword: "",
    rowsPerPage: 10,
    page: 0,
    deleteModal: false,
    deleteVideoNewsId: null,
    openModal: false,
    videoNewsId: "",
    videoLink: "",
    title: "",
    description: "",
    publishedBy: "",
    city: "",
    state: "",
    country: "",
    createdTime: "",
    updatedTime: "",
    publishedTime: "",
    publish: "",
    critical: "",
    tags: "",
    type: "new"
  };


  componentDidMount = async () => {
    await this.getVideoNewsList();
    // custom rule will have name 'isPasswordMatch'
  };

  getVideoNewsList = async () => {
    const { rowsPerPage, page, sortingField, sortingOrder, keyword } = this.state;
    let data = {
      keyword: keyword,
      pageSize: rowsPerPage,
      pageNo: page,
      field: sortingField,
      order: sortingOrder
    }
    await this.props.videoNewsListApi(data);
    this.setState({ videoNewsList: this.props.videoNewsList.result, count: this.props.videoNewsList.count });
  };

  handleSearchKeyword = async (event) => {
    await this.setState({ keyword: event.target.value });
    this.getVideoNewsList();
  }
  handleSortingOrder = async (fieldName, order) => {

    await this.setState({ sortingField: fieldName, sortingOrder: order === 'asc' ? 'desc' : 'asc' });
    this.getVideoNewsList();

  }
  handleChangePage = async (event, newPage) => {
    await this.setState({ page: newPage });
    this.getVideoNewsList();
  };
  handleChangeRowsPerPage = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    this.getVideoNewsList();
  };



  //to delete Category
  deletvideoNewsClicked = async (vId) => {
    if (vId) {
      this.setState({ deleteVideoNewsId: vId });
    }
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  };

  yesDeleteClicked = async () => {
    //call delete Api
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteVideoNewsId: null,
    });
    // this.props.setLoader(true);
    const deleteVideoNews = await deleteVideoNewsApi(
      this.state.deleteVideoNewsId
    );
    if (deleteVideoNews && deleteVideoNews.data.code === status.success) {
      await this.getVideoNewsList();
      toastr.success(deleteVideoNews.data.message);
    } else if (
      deleteVideoNews &&
      deleteVideoNews.data.code === status.badRequest
    ) {
      toastr.warning(deleteVideoNews.data.message);
    } else {
      toastr.error(deleteVideoNews.data.message);
    }
    // this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteVideoNewsId: null,
    });
  };

  //for close a modal
  handleClose = () => {
    this.setState({
      openModal: false,
      type: "new",
      videoNewsId: "",
      videoLink: "",
      title: "",
      description: "",
      publishedBy: "",
      city: "",
      state: "",
      country: "",
      createdTime: "",
      updatedTime: "",
      publishedTime: "",
      publish: "",
      critical: "",
      tags: "",

    });
  };

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    const {
      page,
      rowsPerPage,
      sortingOrder,
      keyword, count,
      sortingField, videoNewsList,
      videoNewsId, videoLink, title, description, publishedBy, city, state, country, createdTime, updatedTime, publishedTime, publish, critical, tags,
      type,
      openModal

    } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "News", path: "/news/videoNews" },
              { name: "Video News" },
            ]}
          />
        </div>
        <div className="py-12">
          <Card elevation={6} className="px-24 pt-12 h-100">
            <div className="flex flex-middle flex-space-between pb-12">
              <div className="card-title">Video News Infromation</div>
              <div>
                <TextField style={{ width: '300px' }}
                  className="mr-16"
                  placeholder="Search..."

                  type="search"
                  name="keyword"
                  value={keyword}
                  onChange={this.handleSearchKeyword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  className="capitalize text-white bg-circle-primary"
                  onClick={() => this.props.history.push({ pathname: '/news/videoNews/edit', state: { type: 'add' } })}
                >
                  Add Video News
                  </Button>
              </div>
            </div>
            <TableContainer style={{ maxHeight: "465px" }}>
              <Table style={{ whiteSpace: "pre" }} stickyHeader>
                <TableHead>
                  <TableRow>
                  <TableCell className="px-0 py-8" width="13%">
                      <TableSortLabel
                        active={sortingField === 'videoNewsId'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("videoNewsId", sortingOrder)}
                      >
                        VideoNewsId
                      </TableSortLabel></TableCell>
                    <TableCell className="px-0 py-8" width="18%">
                      <TableSortLabel
                        active={sortingField === 'title'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("title", sortingOrder)}
                      >
                        Title
                      </TableSortLabel></TableCell>
                    <TableCell className="px-0 py-8" width="10%">
                      <TableSortLabel
                        active={sortingField === 'newsType'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("newsType", sortingOrder)}
                      >
                        News Type
                      </TableSortLabel></TableCell>
                    <TableCell className="px-0 py-8" width="13%">
                      <TableSortLabel
                        active={sortingField === 'category'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("category", sortingOrder)}
                      >
                        Category
                      </TableSortLabel></TableCell>
                    <TableCell className="px-0 py-8" width="10%">
                      <TableSortLabel
                        active={sortingField === 'publish'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("publish", sortingOrder)}
                      >
                        Is Published
                      </TableSortLabel></TableCell>
                    <TableCell className="px-0 py-8" width="12%" >
                      <TableSortLabel
                        active={sortingField === 'PublishedBy'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("PublishedBy", sortingOrder)}
                      >
                        PublishedBy
                      </TableSortLabel></TableCell>
                    <TableCell className="px-0 py-8" width="10%">
                      <TableSortLabel
                        active={sortingField === 'createdTime'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("createdTime", sortingOrder)}
                      >
                        Created Time
                      </TableSortLabel></TableCell>
                    <TableCell className="px-0 py-8"  >Actions</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {videoNewsList && videoNewsList !== [] ? videoNewsList
                   // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((VideoNews, index) => (
                      <TableRow key={index}>
                        <TableCell style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} >
                          <div style={{ alignItems: "center", display: "flex" }}>
                            <div className={VideoNews.critical ? "activeDot" : "inActiveDot"}></div>
                            <div className="pl-4">{VideoNews.videoNewsId}</div>
                          </div>
                        </TableCell>
                        <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} >
                          {VideoNews.title}
                        </TableCell>
                        <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                          {VideoNews.newsType}
                        </TableCell>
                        {/* {/* <TableCell className="p-0" style={{textOverflow:"ellipsis",overflow:"hidden",whiteSpace: "nowrap"}} >
                          {VideoNews.publish}
                        </TableCell> */}
                        <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} >
                          {VideoNews.category + " / " + VideoNews.subCategory}
                        </TableCell>
                        <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                            {VideoNews.publish ?
                              (<small className="border-radius-4 bg-primary text-white px-8 py-2 ">
                                Published
              </small>) :
                              (<small className="border-radius-4 bg-error text-white px-8 py-2 ">
                                Not Published
                </small>)
                            }
                          </TableCell>
                        <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                          {VideoNews.publishedBy}
                        </TableCell>
                        <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} >
                          {VideoNews.createdTime}
                        </TableCell>

                        <TableCell className="p-0">
                          <IconButton className="p-8">
                            <Icon
                              color="primary"
                              onClick={() => this.props.history.push({ pathname: '/news/videoNews/edit', state: { type: 'edit', id: VideoNews.videoNewsId } })}
                            >edit </Icon>
                          </IconButton>
                          <IconButton className="p-8">
                            <Icon
                              color="error"
                              onClick={() =>
                                this.deletvideoNewsClicked(VideoNews.videoNewsId)
                              }>delete</Icon>
                          </IconButton>
                          <IconButton className="p-8">
                            <Icon
                              color="secondary"
                              onClick={() => this.props.history.push({ pathname: '/news/videoNews/view', state: { id: VideoNews.videoNewsId } })}
                            >visibility</Icon>
                          </IconButton>
                          <IconButton className="p-8">
                            <Icon
                              color="default"
                            // onClick={() =>
                            //   this.deleteAdminUserClicked(VideoNews.videoNewsId)}
                            >comment</Icon>
                          </IconButton>

                        </TableCell>
                      </TableRow>
                    )) :
                    <h1>
                      No Data is there!
                    </h1>}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              className="px-16"
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={count ? count : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "Previous Page",
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page",
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />

          </Card>
        </div>
        <div>
          <ConfirmationDialog
            open={this.state.deleteModal}
            title="Delete Confirmation"
            message={"are you sure want to delete this Video News?"}
            toggle={this.deletvideoNewsClicked}
            onYesClick={() =>
              this.yesDeleteClicked(this.state.deleteVideoNewsId)
            }
            onNoClick={this.noDeleteClicked}
          />
        </div>
        <div>
        </div>
      </div>

    );
  }
}
const mapStateToProps = (state) => {
  const { videoNewsList } = state.videoNews;
  return {
    videoNewsList

  };
};

export default connect(mapStateToProps, { videoNewsListApi, addVideoNewsApi })(
  videoNews
);