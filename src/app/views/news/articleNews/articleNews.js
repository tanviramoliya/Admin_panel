import React, { Component } from "react";
import {
  articleNewsListApi,
  deleteArticleNewsApi,
  addArticleNewsApi,
} from "../../../../redux/actions/index";
import { status } from "../../../../utility/config";
import { toastr } from "react-redux-toastr";
import { Breadcrumb } from "../../../../components/matx/Breadcrumb";
import {
  Card, Button, Table,
  TableHead, TableRow, TableCell, TableBody, IconButton,
  Icon, TablePagination, TableContainer,  InputAdornment, TextField, TableSortLabel
} from "@material-ui/core";
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { connect } from "react-redux";
import { Search } from '@material-ui/icons';
import "./style.css";
import { setLoader } from "../../../../redux/actions/loaderAction/loaderAction";
import AccessDeniedPage from "../../sessions/accessdeniedPage";

class articleNews extends Component {

  state = {

    articleNewsList: [],
    count: "",
    sortingField: "createdTime",
    sortingOrder: "asc",
    keyword: "",
    rowsPerPage: 10,
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
    type: "new",
    permission: true,
    perData: JSON.parse(localStorage.getItem("permission"))[1]

  };


  componentDidMount = async () => {
    const { perData } = this.state;
    if (perData.key === 'News' && perData.value === "N/A") {
      this.setState({ permission: false });
      return false;
    }
    await this.getArticleNewsList();
    // custom rule will have name 'isPasswordMatch'
  };

  getArticleNewsList = async () => {
    const { rowsPerPage, page, sortingField, sortingOrder, keyword } = this.state;
    let data = {
      keyword: keyword,
      pageSize: rowsPerPage,
      pageNo: page,
      field: sortingField,
      order: sortingOrder
    }
    await this.props.articleNewsListApi(data);
    this.setState({ articleNewsList: this.props.articleNewsList.result, count: this.props.articleNewsList.count });
  };

  handleSearchKeyword = async (event) => {
    await this.setState({ keyword: event.target.value });
    this.getArticleNewsList();
  }
  handleSortingOrder = async (fieldName, order) => {

    await this.setState({ sortingField: fieldName, sortingOrder: order === 'asc' ? 'desc' : 'asc' });
    this.getArticleNewsList();

  }
  handleChangePage = async (event, newPage) => {
    await this.setState({ page: newPage });
    this.getArticleNewsList();
  };
  handleChangeRowsPerPage = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    this.getArticleNewsList();
  };


  //to delete Category
  deleteArticleNewsClicked = async (aId) => {
    const { perData } = this.state;
    if (perData.key === 'News' && perData.value === "RW") {

      if (aId) {
        this.setState({ deleteArticleNewsId: aId });
      }
      this.setState({
        deleteModal: !this.state.deleteModal,
      });
    } else {
      toastr.error("Access Denied!")
    }
  };

  yesDeleteClicked = async () => {
    //call delete Api
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteArticleNewsId: null,
    });
    this.props.setLoader(true);
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
    this.props.setLoader(false);
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
  handlePerAndAdd = () => {
    const { perData } = this.state;
    if (perData.key === 'News' && perData.value === "RW") {
      this.props.history.push({ pathname: '/news/articleNews/edit', state: { type: 'add' } })
    } else {
      toastr.error("Access Denied!")
    }
  }
  handlePerAndEdit = (ArticleNewsId) => {
    const { perData } = this.state;
    if (perData.key === 'News' && perData.value === "RW") {
      this.props.history.push({ pathname: '/news/articleNews/edit', state: { type: 'edit', id: ArticleNewsId } })
    } else {
      toastr.error("Access Denied!")
    }
  }
  handlePerAndView = (ArticleNewsId) => {
    const { perData } = this.state;
    if (perData.key === 'News' && (perData.value === "RO" ||perData.value === "RW" )) {
      this.props.history.push({ pathname: '/news/articleNews/view', state: { id: ArticleNewsId } });
    } else {
      toastr.error("Access Denied!")
    }
  }



  render() {
    const {
      page,
      rowsPerPage,
      sortingOrder,
      keyword, count,
      sortingField, articleNewsList,
      permission

    } = this.state;
    if (!permission) {
      return (
        <AccessDeniedPage />
      )
    }
    else {
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
                    onClick={this.handlePerAndAdd}
                  >
                    Add Article News
                  </Button>
                </div>
              </div>
              <TableContainer style={{ maxHeight: "465px" }}>
                <Table style={{ whiteSpace: "pre" }} stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className="px-0 py-8" width="13%">
                        <TableSortLabel
                          active={sortingField === 'articleNewsId'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("articleNewsId", sortingOrder)}
                        >
                          ArticleNewsId
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
                    {articleNewsList && articleNewsList !== [] ?
                      articleNewsList
                        //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((ArticleNews, index) => (
                          <TableRow key={index}>
                            <TableCell style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} >
                              <div style={{ alignItems: "center", display: "flex" }}>
                                <div className={ArticleNews.critical ? "activeDot" : "inActiveDot"}></div>
                                <div className="pl-4">{ArticleNews.articleNewsId}</div>
                              </div>
                            </TableCell>
                            <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} >
                              {ArticleNews.title}
                            </TableCell>
                            <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                              {ArticleNews.newsType}
                            </TableCell>

                            <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} >
                              {ArticleNews.category + " / " + ArticleNews.subCategory}
                            </TableCell>
                            <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                              {ArticleNews.publish ?
                                (<small className="border-radius-4 bg-primary text-white px-8 py-2 ">
                                  Published
              </small>) :
                                (<small className="border-radius-4 bg-error text-white px-8 py-2 ">
                                  Not Published
                </small>)
                              }
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
                                  onClick={() => this.handlePerAndEdit(ArticleNews.articleNewsId)}
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
                                  onClick={() => this.handlePerAndView(ArticleNews.articleNewsId)}
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
                        )) : <h1>
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
}
const mapStateToProps = (state) => {
  const { articleNewsList } = state.articleNews;
  return {
    articleNewsList

  };
};

export default connect(mapStateToProps, {setLoader, articleNewsListApi, addArticleNewsApi })(
  articleNews
);