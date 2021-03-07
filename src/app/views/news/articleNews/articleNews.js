import React, { Component } from "react";
import {
  articleNewsListApi,
  deleteArticleNewsApi,
  addArticleNewsApi,
  updateArticleNewsApi,
} from "../../../../redux/actions/index";
import { status } from "../../../../utility/config";
import { toastr } from "react-redux-toastr";
import { Breadcrumb } from "../../../../components/matx/Breadcrumb";
import {
  Card, Button, Table,
  TableHead, TableRow, TableCell, TableBody, IconButton,
  Icon, TablePagination, Badge, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Grid, InputAdornment, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl, Chip, Avatar, Tooltip, Slide, Toolbar, AppBar, Typography, TextField
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

class articleNews extends Component {
  state = {
    articleNewsList: [],
    rowsPerPage: 8,
    page: 0,
    deleteModal: false,
    deleteArticleId: null,
    openModal: false,
    articleNewsId: "",
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
    await this.getArticleNewsList();
    // custom rule will have name 'isPasswordMatch'
  };

  getArticleNewsList = async () => {
    await this.props.articleNewsListApi();
    this.setState({ articleNewsList: this.props.articleNewsList });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  //to delete Category
  deleteArticleNewsClicked = async (aId) => {
    if (aId) {
      this.setState({ deleteArticleNewsId: aId });
    }
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  };

  yesDeleteClicked = async () => {
    //call delete Api
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteArticleNewsId: null,
    });
    // this.props.setLoader(true);
    const deleteArticleNews = await deleteArticleNewsApi(
      this.state.deleteArticleNewsId
    );
    if (deleteArticleNews && deleteArticleNews.data.code === status.success) {
      await this.getArticleNewsList();
      toastr.success(deleteArticleNews.data.message);
    } else if (
      deleteArticleNews &&
      deleteArticleNews.data.code === status.badRequest
    ) {
      toastr.warning(deleteArticleNews.data.message);
    } else {
      toastr.error(deleteArticleNews.data.message);
    }
    // this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteArticleNewsId: null,
    });
  };

  //for close a modal
  handleClose = () => {
    this.setState({
      openModal: false,
      type: "new",
      articleNewsId: "",
      path: "",
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
      rowsPerPage, articleNewsList,
      articleNewsId, path, title, description, publishedBy, city, state, country, createdTime, updatedTime, publishedTime, publish, critical, tags,
      type,
      openModal

    } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "News", path: "/news/articleNews" },
              { name: "Article News" },
            ]}
          />
        </div>
        <div className="py-12">
          <Card elevation={6} className="px-24 pt-12 h-100">
            <div className="flex flex-middle flex-space-between pb-12">
              <div className="card-title">Article News Information</div>
              <div>
              <Button
                className="capitalize text-white bg-circle-primary"
                onClick={() => this.props.history.push({ pathname: '/news/articleNews/edit', state: { type: 'add' } })}
              >
                Add Article News
                  </Button>
                  </div>
            </div>
            <TableContainer style={{ maxHeight: "405px" }}>
              <Table style={{ whiteSpace: "pre" }} stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0" width="15%">ArticleNewsId</TableCell>
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
                  {articleNewsList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((ArticleNews, index) => (
                      <TableRow key={index}>
                        <TableCell  style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} >
                          <div style={{ alignItems: "center", display: "flex" }}>
                          <div className={ArticleNews.publish?"activeDot":"inActiveDot"}></div>
                            <div className="pl-4">{ArticleNews.articleNewsId}</div>
                            </div>
                        </TableCell>
                        <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} >
                          {ArticleNews.title}
                        </TableCell>
                        <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                          {ArticleNews.newsType}
                        </TableCell>
                        {/* {/* <TableCell className="p-0" style={{textOverflow:"ellipsis",overflow:"hidden",whiteSpace: "nowrap"}} >
                          {VideoNews.publish}
                        </TableCell> */}
                        <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} >
                          {ArticleNews.category + " / " + ArticleNews.subCategory}
                        </TableCell>
                        <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                          {ArticleNews.publishedBy}
                        </TableCell>
                        <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} >
                          {ArticleNews.createdTime}
                        </TableCell>

                        <TableCell className="p-0">
                          <IconButton className="p-8">
                            <Icon
                              color="primary"
                              onClick={() => this.props.history.push({ pathname: '/news/articleNews/edit', state: { type: 'edit', id: ArticleNews.articleNewsId } })}
                            >edit </Icon>
                          </IconButton>
                          <IconButton className="p-8">
                            <Icon
                              color="error"
                              onClick={() =>
                                this.deleteArticleNewsClicked(ArticleNews.articleNewsId)
                              }>delete</Icon>
                          </IconButton>
                          <IconButton className="p-8">
                            <Icon
                              color="secondary"
                              onClick={() => this.props.history.push({ pathname: '/news/articleNews/view', state: { id: ArticleNews.articleNewsId } })}
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
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              className="px-16"
              rowsPerPageOptions={[8, 16, 24]}
              component="div"
              count={articleNewsList.length}
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
            message={"are you sure want to delete this Article News?"}
            toggle={this.deletArticleNewsClicked}
            onYesClick={() =>
              this.yesDeleteClicked(this.state.deleteArticleNewsId)
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
  const { articleNewsList } = state.articleNews;
  return {
    articleNewsList

  };
};

export default connect(mapStateToProps, { articleNewsListApi, addArticleNewsApi })(
  articleNews
);