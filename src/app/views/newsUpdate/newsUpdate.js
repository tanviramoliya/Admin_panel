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
  Icon, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Switch
} from "@material-ui/core";
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
class newsUpdate extends Component {
  state = {
    newsList: [],
    rowsPerPage: 8,
    page: 0,
    deleteModal: false,
    deleteNewsToken: null,
    openModal: false,
    newsToken: "",
    newsText: "",
    newsLink: "",
    createdDate: "",
    published: false,
    type: "new",

  };

  componentDidMount = async () => {
    await this.getNewsList();
  };
  getNewsList = async () => {
    await this.props.newsListApi();
    this.setState({ newsList: this.props.newsList });
  };
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };
  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };


  //to delete Category
  deleteNewsClicked = async (token) => {
    if (token) {
      this.setState({ deleteNewsToken: token });
    }
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
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
    this.setState({ openModal: true, type: type });
    if (type === "edit") {
      this.setState({
        newsText: data.newsText,
        newsLink: data.newsLink,
        newsToken: data.newsToken,
        createdDate: data.createdDate
      });
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
      createdDate: "",
    });
  };
  AddNews = async () => {
    const { type, newsText, newsLink } = this.state;
    if (type === "new") {
      if (!newsText) {
        toastr.error("NewsText is required");
        return;
      }
      if (!newsLink) {
        toastr.error("NewsLink is required");
        return;
      }

      // this.props.setLoader(true);
      // this.setState({
      //   addOrg: false,
      // });
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
              published:false,
              newsToken: ""
            });
          } else {
            toastr.warning(createNews.data.message);
          }
        } else {
          toastr.error(createNews.data.message);
        }
      }
      // this.props.setLoader(false);
      
    }
  };
  UpdateNews = async () => {
    const {
      type,
      newsText, newsLink,
      newsToken
    } = this.state;
    if (type === "edit") {
      if (!newsText) {
        toastr.error("NewsText is required");
        return;
      }
      if (!newsLink) {
        toastr.error("NewsLink is required");
        return;
      }
      // this.props.setLoader(true);
      // this.setState({
      //   addOrg: false,
      // });
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
          } else {
            toastr.warning(updateNews.data.message);
          }
        } else {
          toastr.error(updateNews.data.message);
        }
      }
      // this.props.setLoader(false);
      
    }
  };
  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  changeStatus = async (token, newStatus) => {
    let data  = new FormData();
   
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
  }


  render() {
    const {
      page,
      rowsPerPage,
      newsList,
      newsText,
      newsLink,
      type,
      openModal

    } = this.state;
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
              <div className="card-title">News Update Infromation</div>
              <Button
                className="capitalize text-white bg-circle-primary"
                onClick={() => this.setModel("new")}
              >
                Add News Update
                  </Button>
            </div>
            <TableContainer style={{ maxHeight: "405px" }}>
              <Table style={{ whiteSpace: "pre" }} stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0" width="10%">Sr.No</TableCell>
                    <TableCell className="px-0" width="30%">News Text</TableCell>
                    <TableCell className="px-0" width="30%">News Link</TableCell>
                    <TableCell className="px-0" width="20%">Published</TableCell>
                    <TableCell className="px-0" width="15%">Updated Date</TableCell>
                    <TableCell className="px-0" width="10%">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newsList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((newsUpdate, index) => (
                      <TableRow key={index}>
                        <TableCell className="p-0" >
                          {index + 1}
                        </TableCell>
                        <TableCell className="p-0" style={{textOverflow:"ellipsis",overflow:"hidden",whiteSpace: "nowrap"}}>
                          {newsUpdate.newsText}
                        </TableCell>
                        <TableCell className="p-0" style={{textOverflow:"ellipsis",overflow:"hidden",whiteSpace: "nowrap"}}>
                          {newsUpdate.newsLink}
                        </TableCell>
                        <TableCell className="p-0">
                          <Switch 
                            onClick={() =>this.changeStatus(newsUpdate.newsToken,newsUpdate.published)}
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
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              className="px-16"
              rowsPerPageOptions={[8, 16, 24]}
              component="div"
              count={newsList.length}
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

                <TextValidator
                  className="mb-16 "
                  label="News Text"
                  onChange={this.handleChange}
                  type="text"
                  name="newsText"
                  value={newsText}
                  validators={["required", "minStringLength: 2"]}
                  errorMessages={["this field is required"]}
                  style={{ width: "-webkit-fill-available" }}
                  variant="outlined"
                />
                <TextValidator
                  className="mb-16 "
                  label="News Link"
                  onChange={this.handleChange}
                  type="text"
                  name="newsLink"
                  value={newsLink}
                  validators={["required", "matchRegexp:(?:http|https):\\/\\/((?:[\\w-]+)(?:\\.[\\w-]+)+)(?:[\\w.,@?^=%&amp;:\\/~+#-]*[\\w@?^=%&amp;\\/~+#-])?"]}
                  errorMessages={["this field is required", "enter valid URL"]}
                  style={{ width: "-webkit-fill-available" }}
                  variant="outlined"
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