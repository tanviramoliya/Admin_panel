import React, { Component } from "react";
import { commentsListApi, deleteCommentsApi,changeCommentStatusApi } from "../../../redux/actions/index";
import "../../../assets/styles/utilities/_tableCell.scss";
import { status } from "../../../utility/config";
import { toastr } from "react-redux-toastr";
import { Breadcrumb } from "../../../components/matx/Breadcrumb";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableContainer,
  Checkbox,
  Tooltip,
  IconButton,
  Chip,
  Icon,
  DialogActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  TableSortLabel,
  Grid,
  Switch
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ReplyIcon from "@material-ui/icons/Reply";
import VisibilityIcon from '@material-ui/icons/Visibility';
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { connect } from "react-redux";
import { Search, Person, Email, DateRange, Phone, Subject, Message, Assignment, Description } from "@material-ui/icons";
import { ValidatorForm } from "react-material-ui-form-validator";
import "./style.css";
import SimpleReactValidator from "simple-react-validator";
import AccessDeniedPage from "../sessions/accessdeniedPage";
import { setLoader } from "../../../redux/actions/loaderAction/loaderAction";

class comments extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }
  state = {
    commentsList: [],
    count: "",
    sortingField: "createdDate",
    sortingOrder: "asc",
    keyword: "",
    rowsPerPage: 10,
    page: 0,
    deleteModal: false,
    deleteCommentsToken: null,
    selected: [],
    userName: "",
    emailId: "",
    token: "",
    comment: "",
    newsId:"",
    display:"",
    createdDate: "",

    read: false,
    openReadModal: false,
    permission: true,
    perData: JSON.parse(localStorage.getItem("permission"))[7]

  };

  componentDidMount = async () => {
    const { perData } = this.state;
    if (perData.key === 'Inquiry' && perData.value === "N/A") {
      this.setState({ permission: false });
      return false;
    }
    await this.getCommentsList();
  };
  getCommentsList = async () => {
    const { rowsPerPage, page, sortingField, sortingOrder, keyword } = this.state;
    let data = {
      keyword: keyword,
      pageSize: rowsPerPage,
      pageNo: page,
      field: sortingField,
      order: sortingOrder
    }
    await this.props.commentsListApi(data);
    this.setState({ commentsList: this.props.commentsList.result, count: this.props.commentsList.count });
  };
  handleSearchKeyword = async (event) => {
    await this.setState({ keyword: event.target.value });
    this.getCommentsList();
  }
  handleSortingOrder = async (fieldName, order) => {

    await this.setState({ sortingField: fieldName, sortingOrder: order === 'asc' ? 'desc' : 'asc' });
    this.getCommentsList();

  }
  handleChangePage = async (event, newPage) => {
    await this.setState({ page: newPage });
    this.getCommentsList();
  };
  handleChangeRowsPerPage = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    this.getCommentsList();
  };


  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  //to delete Category
  deleteCommentsClicked = async (token) => {
    const { perData } = this.state;
    if (perData.key === 'Inquiry' && perData.value === "RW") {

      if (token) {
        this.setState({ deleteCommentsToken : token });
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
      deleteCommentsToken: null,
      selected: [],
    });
    this.props.setLoader(true);
    const deleteComments = await deleteCommentsApi(this.state.deleteCommentsToken);
    if (deleteComments && deleteComments.data.code === status.success) {
      await this.getCommentsList();
      toastr.success(deleteComments.data.message);
    } else if (deleteComments && deleteComments.data.code === status.badRequest) {
      toastr.warning(deleteComments.data.message);
    } else {
      toastr.error(deleteComments.data.message);
    }
    this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteCommentsToken: null,
      selected: [],
    });
  };
  setReadModel = (data) => {
    const { perData } = this.state;
    if (perData.key === 'Inquiry' && (perData.value === "RW" || perData.value === "RO")) {

      this.setState({ openReadModal: true });
      this.setState({
        userName: data.userName,
        newsId:data.newsId,
        emailId: data.emailId,
        token: data.token,
        comment: data.comment,
        createdDate: data.createdDate,
        display: data.display
      });
    } else {
      toastr.error("Access Denied!")
    }
  };
  
  //for close a modal
  handleClose = () => {
    this.setState({
      openReadModal: false,
      userName: "",
      emailId: "",
      token: "",
      newsId: "",
      comment: ""
      //read: false
    });
    this.validator.hideMessageFor("replyMessage");
    this.validator.hideMessageFor("replySubject");

  };

  handleReadToSend = () => {
    const { perData, read } = this.state;
    if (read) {
      if(perData.key === 'Inquiry' && (perData.value === "RO" || perData.value === "RW")) {
      this.setState({ openReplyModal: true, openReadModal: false })
      }
      else {
        toastr.error("Access Denied!")
      }
    } else {
      if(perData.key === 'Inquiry' && perData.value === "RW") {
        this.setState({ openReplyModal: true, openReadModal: false })
        }
        else {
          toastr.error("Access Denied!")
        }
    }
  }



  //all checked
  handleSelectAllClick = (event) => {
    const { commentsList } = this.state;
    if (event.target.checked) {
      const newSelecteds = commentsList ? commentsList.map((n) => n.token) : null;
      this.setState({ selected: newSelecteds });
      return;
    }
    this.setState({ selected: [] });
  };
  isSelected = (name) => this.state.selected.indexOf(name) !== -1;
  handleClick = (event, name) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    this.setState({ selected: newSelected });
  };
  changeStatus = async (token, commentStatus) => {
    this.props.setLoader(true);
    const { perData } = this.state;
    if (perData.key === 'Inquiry' && perData.value === "RW") {
      let data = new FormData();
      data.append("token", token);
      data.append("status", !commentStatus);
      const changeStatus = await changeCommentStatusApi(data
      );
      if (changeStatus && changeStatus.data.code === status.success) {
        await this.getCommentsList();
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
    this.props.setLoader(false);
  }

  render() {
    const {
      page,
      rowsPerPage,
      sortingOrder,
      keyword,
      sortingField, count,
      commentsList,
      selected,
      userName,
      emailId,
      newsId,
      comment,
      display,
      createdDate,
      openReadModal,
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
            <Breadcrumb routeSegments={[{ name: "Comments", path: "/Comments" }]} />
          </div>
          <div className="py-12">
            <Card elevation={6} className="px-24 pt-12 h-100">
              <div className="flex flex-middle flex-space-between pb-12">
                <div className="card-title">

                  {selected.length > 0 ? (
                    <span>{selected.length} rows selected</span>
                  ) : (
                      <span>Comments Information</span>

                    )}
                </div>
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
                  {selected.length > 0 ? (
                    <Tooltip title="Delete" >
                      <IconButton
                        aria-label="delete" className="p-0"
                        onClick={() => this.deleteCommentsClicked(selected)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                      <Tooltip title="Delete" style={{ padding: "12px" }}>
                        <Chip
                          variant="outlined"
                          color="secondary"
                          label={commentsList.length + " Comments"}
                        />
                      </Tooltip>
                    )}
                </div>
              </div>
              <TableContainer style={{ maxHeight: "465px" }}>
                <Table style={{ whiteSpace: "pre" }} stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className="px-0 py-8" width="5%">
                        <Checkbox style={{ paddingTop: 0, paddingBottom: 0 }}
                          indeterminate={
                            selected.length > 0 &&
                            selected.length < commentsList.length
                          }
                          checked={
                            commentsList.length > 0 &&
                            selected.length === commentsList.length
                          }
                          onChange={this.handleSelectAllClick}
                          inputProps={{ "aria-label": "select all desserts" }}
                        />
                        {/* <FormControlLabel control={<Checkbox onChange={this.handleSelectAllClick} />} /> */}
                      </TableCell>
                      <TableCell className="px-0 py-8" width="5%">
                        Sr.No
                    </TableCell>
                    <TableCell className="px-0 py-8" width="10%">
                        <TableSortLabel
                          active={sortingField === 'newsId'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("newsId", sortingOrder)}
                        >
                          News Id
                      </TableSortLabel>
                      </TableCell>
                      <TableCell className="px-0 py-8" width="15%">
                        <TableSortLabel
                          active={sortingField === 'userName'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("userName", sortingOrder)}
                        >
                          User Name
                      </TableSortLabel>
                      </TableCell>
                      <TableCell className="px-0 py-8" width="15%">
                        <TableSortLabel
                          active={sortingField === 'emailId'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("emailId", sortingOrder)}
                        >
                          Email Id
                      </TableSortLabel>

                      </TableCell>
                      <TableCell className="px-0 py-8" width="22%">
                        <TableSortLabel
                          active={sortingField === 'comment'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("comment", sortingOrder)}
                        >
                          Comment
                      </TableSortLabel>
                      </TableCell>
                      <TableCell className="px-0 py-8" width="10%">
                        <TableSortLabel
                          active={sortingField === 'display'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("isDisplay", sortingOrder)}
                        >
                          Display
                        </TableSortLabel>

                      </TableCell>
                      <TableCell className="px-0 py-8" width="12%">
                        <TableSortLabel
                          active={sortingField === 'createdDate'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("createdDate", sortingOrder)}
                        >
                          Created Date
                        </TableSortLabel>

                      </TableCell>
                      <TableCell className="px-0 py-8">
                        Action
                    </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {commentsList && commentsList !== [] ? commentsList
                      //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((commentsUpdate, index) => {
                        const isItemSelected = this.isSelected(
                          commentsUpdate.token
                        );
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={commentsUpdate.token}
                            selected={isItemSelected}
                          >
                            <TableCell
                              onClick={(event) =>
                                this.handleClick(event, commentsUpdate.token)
                              }
                              className="p-0"
                            >
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                              {/* <FormControlLabel control={<Checkbox />} /> */}
                            </TableCell>
                            <TableCell
                              onClick={(event) =>
                                this.handleClick(event, commentsUpdate.token)
                              }
                              className="p-0"
                            >
                              {page * rowsPerPage + index + 1}

                            </TableCell>
                            <TableCell
                              id={labelId}
                              className="ellipse p-0"
                              onClick={(event) =>
                                this.handleClick(event, commentsUpdate.token)
                              }
                            >
                              {commentsUpdate.newsId}
                            </TableCell>
                            <TableCell
                              id={labelId}
                              className="ellipse p-0"
                              onClick={(event) =>
                                this.handleClick(event, commentsUpdate.token)
                              }
                            >
                              {commentsUpdate.userName}
                            </TableCell>
                            <TableCell
                              className="ellipse p-0"
                              onClick={(event) =>
                                this.handleClick(event, commentsUpdate.token)
                              }
                            >
                              {commentsUpdate.emailId}
                            </TableCell>
                            <TableCell
                              className="ellipse p-0"
                              onClick={(event) =>
                                this.handleClick(event, commentsUpdate.token)
                              }
                            >
                              {commentsUpdate.comment}
                            </TableCell>
                            <TableCell className="ellipse p-0">
                            <Switch
                              onClick={() => this.changeStatus(commentsUpdate.token, commentsUpdate.display)}
                              name="display"
                              color="secondary"
                              checked={commentsUpdate.display}
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                          </TableCell>
                           
                            <TableCell
                              className="ellipse p-0"
                              onClick={(event) =>
                                this.handleClick(event, commentsUpdate.token)
                              }
                            >
                              {commentsUpdate.createdDate}
                            </TableCell>
                            <TableCell className="p-0">
                              <IconButton className="p-8">
                                <Icon
                                  onClick={() =>
                                    this.setReadModel(commentsUpdate)
                                  }
                                >
                                  <VisibilityIcon />
                                </Icon>
                              </IconButton>
                              
                            </TableCell>
                          </TableRow>
                        );
                      }) : <h1>
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
              message={
                "are you sure want to delete " +
                selected.length +
                " comments?"
              }
              toggle={this.deleteCommentsClicked}
              onYesClick={() =>
                this.yesDeleteClicked(this.state.deleteCommentsClicked)
              }
              onNoClick={this.noDeleteClicked}
            />
          </div>
          <div>
            <Dialog
              open={openReadModal}
              aria-labelledby="customized-dialog-title"
              fullWidth="true"
              onClose={this.handleClose}
            >
              <DialogTitle id="customized-dialog-title">User Comments</DialogTitle>
              <DialogContent dividers>
                <Grid container spacing={3}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      className="mb-16 w-100"
                      label="User Name"
                      type="text"
                      name="userName"
                      value={userName}
                      disabled={true}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                      }}

                    />
                    <TextField
                      className="mb-16 w-100"
                      label="Comments Date"
                      type="text"
                      name="createdDate"
                      value={createdDate}
                      disabled={true}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DateRange />
                          </InputAdornment>
                        ),
                      }}

                    />
                   


                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                     
                  <TextField
                      className="mb-16 w-100"
                      label="User Email"
                      type="text"
                      name="emailId"
                      value={emailId}
                      disabled={true}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                      }}

                    />
                    
                  <TextField
                      className="mb-16 w-100"
                      label="newsId"
                      type="text"
                      name="newsId"
                      value={newsId}
                      disabled={true}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Description />
                          </InputAdornment>
                        ),
                      }}

                    />
                   
                  </Grid>
                </Grid>
                <TextField
                  className="mb-16 w-100"
                  label="Comment"
                  type="text"
                  name="comment"
                  value={comment}
                  disabled={true}

                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Subject />
                      </InputAdornment>
                    ),
                  }}

                />

                <DialogActions className="p-0" style={{ display: "block" }}>
                  <div className="flex flex-end">

                   
                  </div>
                </DialogActions>


              </DialogContent>
            </Dialog>
           
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  const { commentsList } = state.comments;
  return {
    commentsList,
  };
};

export default connect(mapStateToProps, { setLoader, commentsListApi })(comments);
