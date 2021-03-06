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
  Icon, TablePagination, Badge, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Grid, InputAdornment, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl, Chip, Avatar, Tooltip, Slide, Toolbar, AppBar, Typography
} from "@material-ui/core";
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PhoneIphone, Email, Person, GroupAdd } from '@material-ui/icons';
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
    rowsPerPage: 8,
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
    await this.props.videoNewsListApi();
    this.setState({ videoNewsList: this.props.videoNewsList });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
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
      rowsPerPage, videoNewsList,
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
              <Button
                className="capitalize text-white bg-circle-primary"
                onClick={() => this.props.history.push({ pathname: '/news/videoNews/edit', state: { type: 'add' } })}
              >
                Add Video News
                  </Button>
            </div>
            <TableContainer style={{ maxHeight: "405px" }}>
              <Table style={{ whiteSpace: "pre" }} stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0" width="15%">VideoNewsId</TableCell>
                    <TableCell className="px-0" width="20%">Title</TableCell>
                    <TableCell className="px-0" width="10%">NewsType</TableCell>
                    <TableCell className="px-0" width="15%">Category</TableCell>
                    {/* <TableCell className="px-0" >critical</TableCell> */}
                    <TableCell className="px-0" >PublishedBy</TableCell>
                    <TableCell className="px-0" >CreatedTime</TableCell>
                    <TableCell className="px-0"  >Actions</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {videoNewsList && videoNewsList === [] ?videoNewsList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((VideoNews, index) => (
                      <TableRow key={index}>
                        <TableCell  style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} >
                          <div style={{ alignItems: "center", display: "flex" }}>
                          <div className={VideoNews.publish?"activeDot":"inActiveDot"}></div>
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
              rowsPerPageOptions={[8, 16, 24]}
              component="div"
              count={videoNewsList ? videoNewsList.length : 0}
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