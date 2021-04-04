import React, { Component } from "react";
import {
  newsListApi,
  deleteNewsApi,
  addNewsApi,
  updateNewsApi,
  changeStatusApi
} from "../../../redux/actions/index";
import { status } from "../../../utility/config";
import { toastr } from "react-redux-toastr";
import { Breadcrumb } from "../../../components/matx/Breadcrumb";
import {
  Card, Button, Table,
  TableHead, TableRow, TableCell, TableBody, IconButton,
  Icon, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Switch, TableSortLabel, TextField, InputAdornment
} from "@material-ui/core";
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { Search, Clear } from "@material-ui/icons";
import SimpleReactValidator from "simple-react-validator";
import AccessDeniedPage from "../sessions/accessdeniedPage";

class newsUpdate extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }
  state = {
    newsList: [],
    count: "",
    sortingField: "updatedTime",
    sortingOrder: "asc",
    keyword: "",
    rowsPerPage: 10,
    page: 0,
    deleteModal: false,
    deleteNewsToken: null,
    openModal: false,
    newsToken: "",
    newsText: "",
    newsLink: "",
    updateTime: "",
    published: false,
    type: "new",
    permission: true,
    perData: JSON.parse(localStorage.getItem("permission"))[2]


  };

  componentDidMount = async () => {
    const { perData } = this.state;
    if (perData.key === 'News_headline' && perData.value === "N/A") {
      this.setState({ permission: false });
      return false;
    }
    await this.getNewsList();
  };
  getNewsList = async () => {
    const { rowsPerPage, page, sortingField, sortingOrder, keyword } = this.state;
    let data = {
      keyword: keyword,
      pageSize: rowsPerPage,
      pageNo: page,
      field: sortingField,
      order: sortingOrder
    }
    await this.props.newsListApi(data);
    this.setState({ newsList: this.props.newsList.result, count: this.props.newsList.count });
  };

  handleSearchKeyword = async (event) => {
    await this.setState({ keyword: event.target.value });
    this.getNewsList();
  }
  handleSortingOrder = async (fieldName, order) => {

    await this.setState({ sortingField: fieldName, sortingOrder: order === 'asc' ? 'desc' : 'asc' });
    this.getNewsList();

  }
  handleChangePage = async (event, newPage) => {
    await this.setState({ page: newPage });
    this.getNewsList();
  };
  handleChangeRowsPerPage = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    this.getNewsList();
  };



  //to delete Category
  deleteNewsClicked = async (token) => {
    const { perData } = this.state;
    if (perData.key === 'News_headline' && perData.value === "RW") {

      if (token) {
        this.setState({ deleteNewsToken: token });
      }
      this.setState({
        deleteModal: !this.state.deleteModal,
      });
    }
    else {
      toastr.error("Access Denied!")
    }
  };

  yesDeleteClicked = async () => {
    //call delete Api
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteNewsToken: null,
    });
    // this.props.setLoader(true);
    const deleteNews = await deleteNewsApi(
      this.state.deleteNewsToken
    );
    if (deleteNews && deleteNews.data.code === status.success) {
      await this.getNewsList();
      toastr.success(deleteNews.data.message);
    } else if (
      deleteNews &&
      deleteNews.data.code === status.badRequest
    ) {
      toastr.warning(deleteNews.data.message);
    } else {
      toastr.error(deleteNews.data.message);
    }
    // this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteNewsToken: null,
    });
  };
  // for open a modal
  setModel = (type, data) => {
    const { perData } = this.state;
    if (perData.key === 'News_headline' && perData.value === "RW") {
      this.setState({ openModal: true, type: type });
      if (type === "edit") {
        this.setState({
          newsText: data.newsText,
          newsLink: data.newsLink,
          newsToken: data.newsToken,
        });
      }
    }
    else {
      toastr.error("Access Denied!")
    }
  };
  //for close a modal
  handleClose = () => {
    this.setState({
      openModal: false,
      newsText: "",
      type: "new",
      newsLink: "",
      newsToken: "",
    });
    this.validator.hideMessages();
    this.validator.hideMessageFor("newsLink");
    this.validator.hideMessageFor("newsText");

  };

  AddNews = async () => {
    const { type, newsText, newsLink } = this.state;
    if (type === "new") {
      if (
        this.validator.allValid()

      ) {
        let data = {
          newsText: newsText,
          newsLink: newsLink
        };
        const createNews = await addNewsApi(data);
        if (createNews) {
          if (createNews.status === status.success) {
            if (createNews.data.code === status.success) {
              toastr.success(createNews.data.message);
              this.getNewsList();
              this.setState({
                newsLink: "",
                openModal: false,
                newsText: "",
                type: "new",
                published: false,
                newsToken: ""
              });
              this.validator.hideMessages();
              this.validator.hideMessageFor("newsLink");
              this.validator.hideMessageFor("newsText");
            } else {
              toastr.warning(createNews.data.message);
            }
          } else {
            toastr.error(createNews.data.message);
          }
        }
        // this.props.setLoader(false);

      }
      else {
        this.validator.showMessages();
      }
    }
  };
  UpdateNews = async () => {
    const {
      type,
      newsText, newsLink,
      newsToken
    } = this.state;
    if (type === "edit") {
      if (
        this.validator.allValid()

      ) {
        let data = {
          newsText: newsText,
          newsLink: newsLink,
          newsToken: newsToken
        };
        const updateNews = await updateNewsApi(data);
        if (updateNews) {
          if (updateNews.status === status.success) {
            if (updateNews.data.code === status.success) {
              toastr.success(updateNews.data.message);
              this.getNewsList();
              this.setState({
                newsLink: "",
                openModal: false,
                newsText: "",
                published: false,
                type: "new",
                newsToken: ""
              });
              this.validator.hideMessages();
              this.validator.hideMessageFor("newsLink");
              this.validator.hideMessageFor("newsText");
            } else {
              toastr.warning(updateNews.data.message);
            }
          } else {
            toastr.error(updateNews.data.message);
          }
        }
        // this.props.setLoader(false);

      }
      else {
        this.validator.showMessages();
      }
    }
  };
  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  changeStatus = async (token, newStatus) => {
    const { perData } = this.state;
    if (perData.key === 'News_headline' && perData.value === "RW") {
      let data = new FormData();
      data.append("headLineToken", token);
      data.append("status", !newStatus);
      const changeStatus = await changeStatusApi(data
      );
      if (changeStatus && changeStatus.data.code === status.success) {
        await this.getNewsList();
        toastr.success(changeStatus.data.message);
      } else if (
        changeStatus &&
        changeStatus.data.code === status.badRequest
      ) {
        toastr.warning(changeStatus.data.message);
      } else {
        toastr.error(changeStatus.data.message);
      }
    } else {
      toastr.error("Access Denied!")
    }
  }


  render() {
    const {
      page,
      rowsPerPage,
      sortingOrder,
      keyword,
      sortingField,
      newsList,
      newsText,
      newsLink,
      type,
      openModal,
      count,
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
                { name: "News Update", path: "/newsUpdate" },

              ]}
            />
          </div>
          <div className="py-12">
            <Card elevation={6} className="px-24 pt-20 h-100">
              <div className="flex flex-middle flex-space-between pb-12">
                <div className="card-title">News Update Information</div>
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
                    onClick={() => this.setModel("new")}
                  >
                    Add News Update
                  </Button>
                </div>
              </div>
              <TableContainer style={{ maxHeight: "465px" }}>
                <Table style={{ whiteSpace: "pre" }} stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className="px-0 py-8" width="10%">Sr.No</TableCell>
                      <TableCell className="px-0  py-8" width="20%">
                        <TableSortLabel
                          active={sortingField === 'newsText'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("newsText", sortingOrder)}
                        >
                          News Text
                      </TableSortLabel>

                      </TableCell>
                      <TableCell className="px-0  py-8" width="20%">
                        <TableSortLabel
                          active={sortingField === 'newsLink'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("newsLink", sortingOrder)}
                        >
                          News Link
                      </TableSortLabel>
                      </TableCell>
                      <TableCell className="px-0 py-8" width="15%">
                        <TableSortLabel
                          active={sortingField === 'isPublished'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("isPublished", sortingOrder)}
                        >
                          Published
                      </TableSortLabel>
                      </TableCell>
                      <TableCell className="px-0 py-8" width="15%">
                        <TableSortLabel
                          active={sortingField === 'updatedTime'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("updatedTime", sortingOrder)}
                        >Updated Date
                      </TableSortLabel>
                      </TableCell>
                      <TableCell className="px-0 py-8" width="10%">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {newsList && newsList !== [] ? newsList
                      //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((newsUpdate, index) => (
                        <TableRow key={index}>
                          <TableCell className="p-0" >
                            {page * rowsPerPage + index + 1}
                          </TableCell>
                          <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                            {newsUpdate.newsText}
                          </TableCell>
                          <TableCell className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                            {newsUpdate.newsLink}
                          </TableCell>
                          <TableCell className="p-0">
                            <Switch
                              onClick={() => this.changeStatus(newsUpdate.newsToken, newsUpdate.published)}
                              name="published"
                              color="secondary"
                              checked={newsUpdate.published}
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                          </TableCell>
                          <TableCell className="p-0">
                            {newsUpdate.updatedTime}
                          </TableCell>
                          <TableCell className="p-0">
                            <IconButton className="p-8">
                              <Icon
                                color="primary"
                                onClick={() => this.setModel("edit", newsUpdate)}
                              >
                                edit
                                </Icon>
                            </IconButton>
                            <IconButton className="p-8">
                              <Icon
                                color="error"
                                onClick={() =>
                                  this.deleteNewsClicked(newsUpdate.newsToken)
                                }
                              >
                                delete
                                </Icon>
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
              message={"are you sure want to delete this News Update?"}
              toggle={this.deleteNewsClicked}
              onYesClick={() =>
                this.yesDeleteClicked(this.state.deleteNewsToken)
              }
              onNoClick={this.noDeleteClicked}
            />
          </div>
          <div>
            <Dialog
              open={openModal}
              aria-labelledby="form-dialog-title"
              fullWidth={true}
            >
              <DialogTitle id="form-dialog-title">
                {type === "new" ? "Add a News Update" : "Edit News Update"}
              </DialogTitle>
              <DialogContent>
                <ValidatorForm
                  ref="form"
                  onSubmit={
                    type === "new" ? this.AddNews : this.UpdateNews
                  }
                  onError={(errors) => null}
                >

                  <TextField
                    className="mb-16 w-100"
                    label="News Text"
                    onChange={this.handleChange}
                    type="text"
                    name="newsText"
                    value={newsText}
                    placeholder="Enter News Text"
                    variant="outlined"

                    error={this.validator.message(
                      "newsText",
                      newsText,
                      "required"
                    )}
                    helperText={this.validator.message(
                      "newsText",
                      newsText,
                      "required"
                    )}
                    onBlur={() => this.validator.showMessageFor("newsText")}
                  />


                  {/* Regexp:(?:http|https):\\/\\/((?:[\\w-]+)(?:\\.[\\w-]+)+)(?:[\\w.,@?^=%&amp;:\\/~+#-]*[\\w@?^=%&amp;\\/~+#-])?"]} */}

                  <TextField
                    className="mb-16 w-100"
                    label="News Link"
                    onChange={this.handleChange}
                    type="url"
                    name="newsLink"
                    value={newsLink}
                    placeholder="Enter News Link"
                    variant="outlined"

                    error={this.validator.message(
                      "newsLink",
                      newsLink,
                      "required|url"
                    )}
                    helperText={this.validator.message(
                      "newsLink",
                      newsLink,
                      "required|url"
                    )}
                    onBlur={() => this.validator.showMessageFor("newsLink")}
                  />

                  <DialogActions className="p-0">
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                        </Button>
                    {type === "new" ? (
                      <Button color="primary" type="submit">
                        Add
                          </Button>
                    ) : (
                        <Button color="primary" type="submit">
                          Save
                          </Button>
                      )}
                  </DialogActions>
                </ValidatorForm>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  const { newsList, newsText, newsLink, published } = state.newsUpdate;
  return {
    newsList,
    newsText,
    newsLink,
    published

  };
};

export default connect(mapStateToProps, { newsListApi, addNewsApi })(
  newsUpdate
);