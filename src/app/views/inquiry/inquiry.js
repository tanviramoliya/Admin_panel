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
  TableSortLabel,
  Grid
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ReplyIcon from "@material-ui/icons/Reply";
import VisibilityIcon from '@material-ui/icons/Visibility';
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { connect } from "react-redux";
import { green } from "@material-ui/core/colors";
import { GroupAdd, TextFormat, Search, Person, Email, DateRange, Phone, Subject, Message } from "@material-ui/icons";
import RichTextEditor from "components/matx/RichTextEditor";
import { ValidatorForm } from "react-material-ui-form-validator";
import TextValidator from "react-material-ui-form-validator/lib/TextValidator";
import "./style.css";
import SimpleReactValidator from "simple-react-validator";
import AccessDeniedPage from "../sessions/accessdeniedPage";


class inquiry extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }
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
    inquiryDate: "",

    read: false,
    openReadModal: false,
    openReplyModal: false,
    replyMessage: "",
    replySubject: "",
    permission: true,
    perData: JSON.parse(localStorage.getItem("permission"))[7]

  };

  componentDidMount = async () => {
    const { perData } = this.state;
    if (perData.key === 'Inquiry' && perData.value === "N/A") {
      this.setState({ permission: false });
      return false;
    }
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
    const { perData } = this.state;
    if (perData.key === 'Inquiry' && perData.value === "RW") {

      if (token) {
        this.setState({ deleteInquiryToken: token });
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
    const { perData } = this.state;
    if (perData.key === 'Inquiry' && (perData.value === "RW" || perData.value === "RO")) {

      this.setState({ openReadModal: true });
      this.setState({
        userName: data.userName,
        emailId: data.emailId,
        token: data.token,
        subject: data.subject,
        message: data.message,
        contactNumber: data.contactNumber,
        inquiryDate: data.inquiryDate,
        replyMessage: data.inquiryReply !== null ? data.inquiryReply.replyMessage : null,
        replySubject: data.inquiryReply !== null ? data.inquiryReply.subject : null,
        read: data.read
      });
    } else {
      toastr.error("Access Denied!")
    }
  };
  setReplyModel = (data) => {
    const { perData } = this.state;
    if (perData.key === 'Inquiry' && perData.value === "RW") {

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
    } else {
      toastr.error("Access Denied!")
    }
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
      replyMessage: "",
      replySubject: ""
      //read: false
    });
    this.validator.hideMessageFor("replyMessage");
    this.validator.hideMessageFor("replySubject");

  };
  replySubmit = async () => {
    const { replyMessage, replySubject, token } = this.state;
    if (
      this.validator.allValid()

    ) {
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
              replyMessage: "",
              replySubject: "",
              contactNumber: "",
              read: false

            });
            this.validator.hideMessageFor("replyMessage");
            this.validator.hideMessageFor("replySubject");
          } else {
            toastr.warning(submitReply.data.message);
          }
        } else {
          toastr.error(submitReply.data.message);
        }

        // this.props.setLoader(false);

      }
    }
    else {
      this.validator.showMessages();
    }
  };
  handleReadToSend = () => {
    const { perData, read } = this.state;
    if (read) {
      if(perData.key === 'Inquiry' && perData.value === "RO") {
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
    const { inquiryList } = this.state;
    if (event.target.checked) {
      const newSelecteds = inquiryList ? inquiryList.map((n) => n.token) : null;
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
      inquiryDate,
      openReadModal,
      openReplyModal,
      replyMessage,
      replySubject,
      read,
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
                      <TableCell className="px-0 py-8" width="5%">
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
                      <TableCell className="px-0 py-8" width="13%">
                        <TableSortLabel
                          active={sortingField === 'userName'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("userName", sortingOrder)}
                        >
                          User Name
                      </TableSortLabel>
                      </TableCell>
                      <TableCell className="px-0 py-8" width="18%">
                        <TableSortLabel
                          active={sortingField === 'subject'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("subject", sortingOrder)}
                        >
                          Subject
                      </TableSortLabel>

                      </TableCell>
                      <TableCell className="px-0 py-8" width="22%">
                        <TableSortLabel
                          active={sortingField === 'message'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("message", sortingOrder)}
                        >
                          Message
                      </TableSortLabel>
                      </TableCell>
                      <TableCell className="px-0 py-8" width="16%">
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
                      <TableCell className="px-0 py-8" width="10%">
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


                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      className="mb-16 w-100"
                      label="Inquiry Data"
                      type="text"
                      name="inquiryDate"
                      value={inquiryDate}
                      disabled={true}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DateRange />
                          </InputAdornment>
                        ),
                      }}

                    />
                    <TextField
                      className="mb-16 w-100"
                      label="User Contact Number"
                      type="text"
                      name="contactNumber"
                      value={contactNumber}
                      disabled={true}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone />
                          </InputAdornment>
                        ),
                      }}

                    />
                  </Grid>
                </Grid>
                <TextField
                  className="mb-16 w-100"
                  label="Subject"
                  type="text"
                  name="subject"
                  value={subject}
                  disabled={true}

                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Subject />
                      </InputAdornment>
                    ),
                  }}

                />
                <TextField
                  className="mb-16 w-100"
                  label="message"
                  type="text"
                  multiline
                  name="message"
                  value={message}
                  disabled={true}

                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Message />
                      </InputAdornment>
                    ),
                  }}

                />

                <DialogActions className="p-0" style={{ display: "block" }}>
                  <div className="flex flex-end">

                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      endIcon={!read ? <Icon>send</Icon> : <Icon>visibility</Icon>}
                      onClick={this.handleReadToSend}
                    >
                      {!read ? "Send Reply" : "View Reply"}
                    </Button>
                  </div>
                </DialogActions>


              </DialogContent>
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


                  </Grid>
                </Grid>
                <ValidatorForm
                  ref="form"
                  onSubmit={this.replySubmit}
                  onError={(errors) => null}
                >

                  <TextField
                    className="mb-16 w-100"
                    label="Reply Subject"
                    onChange={this.handleChange}
                    type="text"
                    name="replySubject"
                    value={replySubject}
                    placeholder="Enter Subject"
                    variant={!read ? "outlined" : "standard"}
                    disabled={!read ? false : true}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Subject />
                        </InputAdornment>
                      ),
                    }}
                    error={this.validator.message(
                      "replySubject",
                      replySubject,
                      "required"
                    )}
                    helperText={this.validator.message(
                      "replySubject",
                      replySubject,
                      "required"
                    )}
                    onBlur={() => this.validator.showMessageFor("replySubject")}
                  />

                  <TextField
                    className="mb-16 w-100"
                    label="Reply Message"
                    onChange={this.handleChange}
                    type="text"
                    multiline

                    name="replyMessage"
                    value={replyMessage}
                    placeholder="Enter Reply Message"
                    variant={!read ? "outlined" : "standard"}
                    disabled={!read ? false : true}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Message />
                        </InputAdornment>
                      ),
                    }}

                    error={this.validator.message(
                      "replyMessage",
                      replyMessage,
                      "required"
                    )}
                    helperText={this.validator.message(
                      "replyMessage",
                      replyMessage,
                      "required"
                    )}
                    onBlur={() => this.validator.showMessageFor("replyMessage")}
                  />

                  <DialogActions className="p-0" style={{ display: "block" }}>
                    <div className="flex flex-end">
                      <Button onClick={this.handleClose} className="mr-8" variant="outlined">
                        Cancel
                    </Button>
                      {read ? null :
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            endIcon={<Icon>send</Icon>}
                          >
                            Send
                      </Button>
                        </>
                      }
                    </div>
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
  const { inquiryList } = state.inquiry;
  return {
    inquiryList,
  };
};

export default connect(mapStateToProps, { inquiryListApi })(inquiry);
