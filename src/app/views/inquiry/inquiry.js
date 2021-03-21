import React, { Component } from "react";
import { inquiryListApi, deleteInquiryApi, submitReplyApi } from "../../../redux/actions/index";
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
  Typography,
  Tooltip,
  IconButton,
  Chip,
  Toolbar,
  Icon,
  DialogActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  TableSortLabel
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ReplyIcon from "@material-ui/icons/Reply";
import VisibilityIcon from '@material-ui/icons/Visibility';
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { connect } from "react-redux";
import { green } from "@material-ui/core/colors";
import { GroupAdd, TextFormat, Search } from "@material-ui/icons";
import RichTextEditor from "components/matx/RichTextEditor";
import { ValidatorForm } from "react-material-ui-form-validator";
import TextValidator from "react-material-ui-form-validator/lib/TextValidator";

class inquiry extends Component {
  state = {
    inquiryList: [],
    count: "",
    sortingField: "inquiryDate",
    sortingOrder: "asc",
    keyword: "",
    rowsPerPage: 10,
    page: 0,
    deleteModal: false,
    deleteInquiryToken: null,
    selected: [],
    userName: "",
    emailId: "",
    token: "",
    subject: "",
    message: "",
    contactNumber: "",
    read: false,
    openReadModal: false,
    openReplyModal: false,
    replyMessage: undefined,
    replySubject: undefined,
  };

  componentDidMount = async () => {
    await this.getInquiryList();
  };
  getInquiryList = async () => {
    const { rowsPerPage, page, sortingField, sortingOrder, keyword } = this.state;
    let data = {
      keyword: keyword,
      pageSize: rowsPerPage,
      pageNo: page,
      field: sortingField,
      order: sortingOrder
    }
    await this.props.inquiryListApi(data);
    this.setState({ inquiryList: this.props.inquiryList.result, count: this.props.inquiryList.count });
  };
  handleSearchKeyword = async (event) => {
    await this.setState({ keyword: event.target.value });
    this.getInquiryList();
  }
  handleSortingOrder = async (fieldName, order) => {

    await this.setState({ sortingField: fieldName, sortingOrder: order === 'asc' ? 'desc' : 'asc' });
    this.getInquiryList();

  }
  handleChangePage = async (event, newPage) => {
    await this.setState({ page: newPage });
    this.getInquiryList();
  };
  handleChangeRowsPerPage = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    this.getInquiryList();
  };


  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  //to delete Category
  deleteInquiryClicked = async (token) => {
    if (token) {
      this.setState({ deleteInquiryToken: token });
    }
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  };

  yesDeleteClicked = async () => {
    //call delete Api
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteInquiryToken: null,
      selected: [],
    });
    // this.props.setLoader(true);
    const deleteInquiry = await deleteInquiryApi(this.state.deleteInquiryToken);
    if (deleteInquiry && deleteInquiry.data.code === status.success) {
      await this.getInquiryList();
      toastr.success(deleteInquiry.data.message);
    } else if (deleteInquiry && deleteInquiry.data.code === status.badRequest) {
      toastr.warning(deleteInquiry.data.message);
    } else {
      toastr.error(deleteInquiry.data.message);
    }
    // this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteInquiryToken: null,
      selected: [],
    });
  };
  setReadModel = (data) => {
    console.log(data);
    this.setState({ openReadModal: true });
    this.setState({
      userName: data.userName,
      emailId: data.emailId,
      token: data.token,
      subject: data.subject,
      message: data.message,
      contactNumber: data.contactNumber,
      replyMessage: data.inquiryReply !== null ? data.inquiryReply.replyMessage : null,
      replySubject: data.inquiryReply !== null ? data.inquiryReply.subject : null,
      read: data.read
    });
  };
  setReplyModel = (data) => {
    console.log("DATA", data);
    this.setState({ openReplyModal: true });
    this.setState({
      userName: data.userName,
      emailId: data.emailId,
      token: data.token,
      subject: data.subject,
      message: data.message,
      contactNumber: data.contactNumber,
      read: data.read
    });
  };
  //for close a modal
  handleClose = () => {
    this.setState({
      openReadModal: false,
      openReplyModal: false,
      userName: "",
      emailId: "",
      token: "",
      subject: "",
      message: "",
      contactNumber: "",
      read: false
    });
  };
  replySubmit = async () => {
    const { replyMessage, replySubject, token } = this.state;
    if (!replyMessage) {
      toastr.error("replyMessage is required");
      return;
    }
    if (!replySubject) {
      toastr.error("replySubject is required");
      return;
    }


    // this.props.setLoader(true);
    // this.setState({
    //   addOrg: false,
    // });
    let data = {

      replyMessage: replyMessage,
      subject: replySubject,
      inquiryToken: token
    };
    const submitReply = await submitReplyApi(data);
    if (submitReply) {
      if (submitReply.status === status.success) {
        if (submitReply.data.code === status.success) {
          toastr.success(submitReply.data.message);
          this.getInquiryList();
          this.setState({
            openReadModal: false,
            openReplyModal: false,
            userName: "",
            emailId: "",
            token: "",
            subject: "",
            message: "",
            replyMessage: undefined,
            replySubject: undefined,
            contactNumber: "",
            read: false

          });
        } else {
          toastr.warning(submitReply.data.message);
        }
      } else {
        toastr.error(submitReply.data.message);
      }

      // this.props.setLoader(false);

    }
  };




  //all checked
  handleSelectAllClick = (event) => {
    console.log(" Called");
    const { inquiryList } = this.state;
    if (event.target.checked) {
      const newSelecteds = inquiryList ? inquiryList.map((n) => n.token) : null;
      this.setState({ selected: newSelecteds });
      console.log("In ALL selected", newSelecteds);
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
    console.log(newSelected);
  };

  render() {
    const {
      page,
      rowsPerPage,
      sortingOrder,
      keyword,
      sortingField, count,
      inquiryList,
      selected,
      userName,
      emailId,
      subject,
      message,
      contactNumber,
      openReadModal,
      openReplyModal,
      replyMessage,
      replySubject,
      read,
    } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Inquiry", path: "/inquiry" }]} />
        </div>
        <div className="py-12">
          <Card elevation={6} className="px-24 pt-12 h-100">
            <div className="flex flex-middle flex-space-between pb-12">
              <div className="card-title">

                {selected.length > 0 ? (
                  <span>{selected.length} rows selected</span>
                ) : (
                    <span>Inquiry Information</span>

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
                      onClick={() => this.deleteInquiryClicked(selected)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                ) : (
                    <Tooltip title="Delete" style={{ padding: "12px" }}>
                      <Chip
                        variant="outlined"
                        color="secondary"
                        label={inquiryList.length + " Inquiries"}
                      />
                    </Tooltip>
                  )}
              </div>
            </div>
            <TableContainer style={{ maxHeight: "465px" }}>
              <Table style={{ whiteSpace: "pre" }} stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0 py-8">
                      <Checkbox style={{ paddingTop: 0, paddingBottom: 0 }}
                        indeterminate={
                          selected.length > 0 &&
                          selected.length < inquiryList.length
                        }
                        checked={
                          inquiryList.length > 0 &&
                          selected.length === inquiryList.length
                        }
                        onChange={this.handleSelectAllClick}
                        inputProps={{ "aria-label": "select all desserts" }}
                      />
                      {/* <FormControlLabel control={<Checkbox onChange={this.handleSelectAllClick} />} /> */}
                    </TableCell>
                    <TableCell className="px-0 py-8" width="5%">
                      Sr.No
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
                    <TableCell className="px-0 py-8" width="20%">
                      <TableSortLabel
                        active={sortingField === 'subject'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("subject", sortingOrder)}
                      >
                        Subject
                      </TableSortLabel>

                    </TableCell>
                    <TableCell className="px-0 py-8" width="23%">
                      <TableSortLabel
                        active={sortingField === 'message'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("message", sortingOrder)}
                      >
                        Message
                      </TableSortLabel>
                    </TableCell>
                    <TableCell className="px-0 py-8" width="15%">
                      <TableSortLabel
                        active={sortingField === 'emailId'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("emailId", sortingOrder)}
                      >
                        User Email                      
                        </TableSortLabel>

                    </TableCell>
                    <TableCell className="px-0 py-8" width="10%">
                    <TableSortLabel
                        active={sortingField === 'contactNumber'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("contactNumber", sortingOrder)}
                      >
                         Contact Number                     
                        </TableSortLabel>
                     
                    </TableCell>
                    <TableCell className="px-0 py-8" width="8%">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {inquiryList && inquiryList !== [] ? inquiryList
                    //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((inquiryUpdate, index) => {
                      const isItemSelected = this.isSelected(
                        inquiryUpdate.token
                      );
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={inquiryUpdate.token}
                          selected={isItemSelected}
                        >
                          <TableCell
                            onClick={(event) =>
                              this.handleClick(event, inquiryUpdate.token)
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
                              this.handleClick(event, inquiryUpdate.token)
                            }
                            className="p-0"
                          >
                                                      {page * rowsPerPage + index + 1}

                          </TableCell>
                          <TableCell
                            id={labelId}
                            className="ellipse p-0"
                            onClick={(event) =>
                              this.handleClick(event, inquiryUpdate.token)
                            }
                          >
                            {inquiryUpdate.userName}
                          </TableCell>
                          <TableCell
                            className="ellipse p-0"
                            onClick={(event) =>
                              this.handleClick(event, inquiryUpdate.token)
                            }
                          >
                            {inquiryUpdate.subject}
                          </TableCell>
                          <TableCell
                            className="ellipse p-0"
                            onClick={(event) =>
                              this.handleClick(event, inquiryUpdate.token)
                            }
                          >
                            {inquiryUpdate.message}
                          </TableCell>
                          <TableCell
                            className="ellipse p-0"
                            onClick={(event) =>
                              this.handleClick(event, inquiryUpdate.token)
                            }
                          >
                            {inquiryUpdate.emailId}
                          </TableCell>
                          <TableCell
                            className="ellipse p-0"
                            onClick={(event) =>
                              this.handleClick(event, inquiryUpdate.token)
                            }
                          >
                            {inquiryUpdate.contactNumber}
                          </TableCell>
                          <TableCell className="p-0">
                            <IconButton className="p-8">
                              <Icon
                                onClick={() =>
                                  this.setReadModel(inquiryUpdate)
                                }
                              >
                                <VisibilityIcon />
                              </Icon>
                            </IconButton>
                            <IconButton className="p-8"
                              
                              onClick={() => this.setReplyModel(inquiryUpdate)
                              }
                              disabled={inquiryUpdate.read}
                            >
                              <Icon color={inquiryUpdate.read ? "" : "primary"}>send</Icon>
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
              " inquiries?"
            }
            toggle={this.deleteInquiryClicked}
            onYesClick={() =>
              this.yesDeleteClicked(this.state.deleteInquiryToken)
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
            <DialogTitle id="customized-dialog-title">User Inquiry</DialogTitle>
            <DialogContent dividers>
              <TableContainer>
                <TableBody>
                  <TableRow>
                    <TableCell
                      width="10%"
                      style={{ paddingRight: "10px", fontWeight: "bold" }}
                    >
                      UserName
                    </TableCell>
                    <TableCell width="60%">{userName}</TableCell>
                    <TableCell
                      width="10%"
                      style={{ paddingRight: "10px", fontWeight: "bold" }}
                    >
                      Date
                    </TableCell>
                    <TableCell width="20%">{Date.now()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      width="5%"
                      style={{ paddingRight: "10px", fontWeight: "bold" }}
                    >
                      EmailId
                    </TableCell>
                    <TableCell width="45%">{emailId}</TableCell>
                    <TableCell
                      width="5%"
                      style={{ paddingRight: "10px", fontWeight: "bold" }}
                    >
                      ContactNo
                    </TableCell>
                    <TableCell width="45%">{contactNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingRight: "10px", fontWeight: "bold" }}
                    >
                      Subject
                    </TableCell>
                    <TableCell colSpan={3}>{subject}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingRight: "10px", fontWeight: "bold" }}
                    >
                      Message
                    </TableCell>
                    <TableCell style={{ wordBreak: "break-word" }} colSpan={3}>
                      {message}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  {(replySubject !== null && replyMessage !== null) ?
                    <>
                      <TableRow>
                        <TableCell
                          style={{ paddingRight: "10px", fontWeight: "bold" }}
                        >
                          Replied Subject
                    </TableCell>
                        <TableCell colSpan={3}>{replySubject}</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ paddingRight: "10px", fontWeight: "bold" }}
                        >
                          Replied Message
                    </TableCell>
                        <TableCell style={{ wordBreak: "break-word" }} colSpan={3}>
                          {replyMessage}
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow> </> : null}
                </TableBody>
              </TableContainer>
            </DialogContent>
            {
              read ? null :
                <DialogActions>
                  <IconButton
                    className="p-8"
                    onClick={() => this.setState({ openReplyModal: true })}
                  >
                    <Icon color="primary">send</Icon>
                  </IconButton>
                </DialogActions>

            }

          </Dialog>
          <Dialog
            open={openReplyModal}
            aria-labelledby="customized-dialog-title"
            fullWidth="true"
          >
            <DialogTitle id="customized-dialog-title">
              <ReplyIcon color="primary" /> Send Reply
            </DialogTitle>
            <DialogContent dividers>
              <TableRow>
                <TableCell
                  width="10%"
                  style={{ paddingRight: "10px", fontWeight: "bold" }}
                >
                  UserName
                </TableCell>
                <TableCell width="40%" style={{ wordBreak: "break-word" }}>
                  {userName}
                </TableCell>
                <TableCell
                  width="10%"
                  style={{ paddingRight: "10px", fontWeight: "bold" }}
                >
                  To
                </TableCell>
                <TableCell width="40%" style={{ wordBreak: "break-word" }}>
                  {emailId}
                </TableCell>
              </TableRow>
              <ValidatorForm
                ref="form"
                onSubmit={this.replySubmit}
                onError={(errors) => null}
              >
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  className="mb-16 w-100"
                  label="Subject"
                  onChange={this.handleChange}
                  type="text"
                  name="replySubject"
                  value={replySubject}
                  error={replySubject === ""}
                  helperText={
                    replySubject === "" ? "this field is required" : ""
                  }
                />
                <TextField
                  error={replyMessage === ""}
                  id="outlined-basic"
                  multiline
                  rows={6}
                  variant="outlined"
                  className="mb-16 w-100"
                  label="Reply message"
                  onChange={this.handleChange}
                  type="textarea"
                  name="replyMessage"
                  value={replyMessage}
                  helperText={
                    replyMessage === "" ? "this field is required" : ""
                  }
                />


                <DialogActions style={{ paddingRight: "24px" }}>
                  <Button onClick={this.handleClose} variant="outlined">
                    Cancel
              </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    endIcon={<Icon>send</Icon>}
                  >
                    Send
              </Button>
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
  const { inquiryList } = state.inquiry;
  return {
    inquiryList,
  };
};

export default connect(mapStateToProps, { inquiryListApi })(inquiry);
