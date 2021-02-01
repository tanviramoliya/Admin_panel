import React, { Component } from "react";
import {
  inquiryListApi,
  deleteInquiryApi,
} from "../../../redux/actions/index";
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
  Avatar
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { connect } from "react-redux";
import { green } from "@material-ui/core/colors";
import { GroupAdd, TextFormat } from "@material-ui/icons";
import RichTextEditor from "components/matx/RichTextEditor";
import { ValidatorForm } from "react-material-ui-form-validator";
import TextValidator from "react-material-ui-form-validator/lib/TextValidator";

class inquiry extends Component {
  state = {
    inquiryList: [],
    rowsPerPage: 8,
    page: 0,
    type: "read",
    deleteModal: false,
    deleteInquiryToken: null,
    selected: [],
    openReadModal:false,
    openReplyModal:false
  };

  componentDidMount = async () => {
    await this.getInquiryList();
  };
  getInquiryList = async () => {
    await this.props.inquiryListApi();
    this.setState({ inquiryList: this.props.inquiryList });
  };
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };
  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
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
    const deleteInquiry = await deleteInquiryApi(
      this.state.deleteInquiryToken
    );
    if (deleteInquiry && deleteInquiry.data.code === status.success) {
      await this.getInquiryList();
      toastr.success(deleteInquiry.data.message);
    } else if (
      deleteInquiry &&
      deleteInquiry.data.code === status.badRequest
    ) {
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
  setReadModel = (type, data) => {
    this.setState({ openReadModal: true, type: type });
    if (type === "read") {
      this.setState({
        userName: data.userName,
        emailId: data.emailId,
        token: data.token,
        subject: data.subject,
        message: data.message,
        contactNumber: data.contactNumber,

      });
    }
  };
  setReplyModel = (type, data) => {
    this.setState({ openReplyModal: true, type: type });
    if (type === "read") {
      this.setState({
        userName: data.userName,
        emailId: data.emailId,
        token: data.token,
        subject: data.subject,
        message: data.message,
        contactNumber: data.contactNumber,

      });
    }
  };
  //for close a modal
  handleClose = () => {
    this.setState({
      openReadModal:false,
      openReplyModal:false,
      userName: "",
      emailId: "",
      token: "",
      subject: "",
      message: "",
      contactNumber: "",
      type:"read"
    });
  };
  //all checked
  handleSelectAllClick = (event) => {
    console.log(" Called");
    const { inquiryList } = this.state;
    if (event.target.checked) {
      const newSelecteds = inquiryList.map((n) => n.token);
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
    
    const { page, rowsPerPage, inquiryList, selected,
      userName,
      emailId,
      subject,
      message,
      contactNumber,
      type,
      openReadModal,
      openReplyModal } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[{ name: "Inquiry", path: "/inquiry" }]}
          />
        </div>
        <div className="py-12">
          <Card elevation={6} className="px-24 pt-20 h-100">
            <div className="flex flex-middle flex-space-between pb-12">
              <Toolbar >
                {selected.length > 0 ? (
                  <Typography color="error" variant="h6" component="div">
                    {selected.length} rows selected
                </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle" component="div">
                      Inquiry Information
                </Typography>
                  )}
                {selected.length > 0 ? (
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="delete"
                      onClick={() => this.deleteInquiryClicked(selected)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                ) : (
                    <Tooltip title="Delete" style=
                      {{ padding: "12px" }}>
                      <Chip
                        variant="outlined"
                        color="secondary"
                        label={inquiryList.length + " Inquiries"}
                      />
                    </Tooltip>
                  )}
              </Toolbar>
            </div>
            <TableContainer style={{ maxHeight: "405px" }}>
              <Table style={{ whiteSpace: "pre" }} stickyHeader>
                <TableHead >
                  <TableRow >
                    <TableCell className="p-0">
                      <Checkbox
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
                    <TableCell className="px-0" width="5%">
                      Sr.No
                    </TableCell>
                    <TableCell className="px-0" width="15%">
                      User Name
                    </TableCell>
                    <TableCell className="px-0" width="20%">
                      Subject
                    </TableCell>
                    <TableCell className="px-0" width="23%">
                      Message
                    </TableCell>
                    <TableCell className="px-0" width="15%">
                      User Email
                    </TableCell>
                    <TableCell className="px-0" width="10%">
                      Contact Number
                    </TableCell>
                    <TableCell className="px-0" width="8%">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody >
                  {inquiryList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                          <TableCell className="p-0"  onClick={(event) =>
                                this.handleClick(event, inquiryUpdate.token)
                              } >
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                             
                            />
                            {/* <FormControlLabel control={<Checkbox />} /> */}
                          </TableCell>
                          <TableCell
                            className="p-0"
                            onClick={(event) =>
                              this.handleClick(event, inquiryUpdate.token)
                            }>
                            {index + 1}
                          </TableCell>
                          <TableCell
                            id={labelId}
                            className="p-0"  onClick={(event) =>
                              this.handleClick(event, inquiryUpdate.token)
                            } style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                          >
                            {inquiryUpdate.userName}
                          </TableCell>
                          <TableCell
                            className="p-0"  onClick={(event) =>
                              this.handleClick(event, inquiryUpdate.token)
                            } style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                          >
                            {inquiryUpdate.subject}
                          </TableCell>
                          <TableCell
                            className="p-0"  onClick={(event) =>
                              this.handleClick(event, inquiryUpdate.token)
                            } style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                          >
                            {inquiryUpdate.message}

                          </TableCell>
                          <TableCell
                            className="p-0"  onClick={(event) =>
                              this.handleClick(event, inquiryUpdate.token)
                            } style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                          >
                            {inquiryUpdate.emailId}
                          </TableCell>
                          <TableCell
                            className="p-0"  onClick={(event) =>
                              this.handleClick(event, inquiryUpdate.token)
                            }
                          >
                            {inquiryUpdate.contactNumber}
                          </TableCell>
                          <TableCell
                            className="p-0"
                          ><IconButton className="p-8">
                              <Icon style={{ color: "#f44336" }}
                                onClick={() => this.setReadModel("read", inquiryUpdate)}>
                                more_vert</Icon>
                            </IconButton>
                            <IconButton className="p-8" onClick={() => this.setReplyModel("read", inquiryUpdate)}>
                              <Icon color="primary">send</Icon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              className="px-16"
              rowsPerPageOptions={[8, 16, 24]}
              component="div"
              count={inquiryList.length}
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
          <Dialog
            open={openReadModal}
            aria-labelledby="customized-dialog-title"
            fullWidth="true"
          >
            <DialogTitle id="customized-dialog-title">User Inquiry
            </DialogTitle>
            <DialogContent dividers>
              <table border="1">
                <tr>
                  <td >UserName </td>
                  <td>{userName} </td>
                  <td >Date </td>
                  <td>23-01-21</td>
                </tr>
                  
                <tr>
                  <td>EmailId</td>
                  <td><Chip
                    avatar={<Avatar>D</Avatar>}
                    label={emailId}
                    color="primary"
                    variant="outlined"
                    size="small"
                  /> </td>
                  <td>contactNo</td>
            <td>{contactNumber}</td>
                </tr>
                <tr>
                  <td>Subject </td>
                  <td colSpan="3">{subject} </td>
                </tr>
                <tr>
                  <td >Message</td>
                  <td colSpan="3">{message} </td>
                </tr>

              </table>
              
             
            </DialogContent>
            
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
                        </Button>
                        <IconButton className="p-8" onClick={() => this.setReplyModel("read","")}>
                              <Icon color="primary">send</Icon>
                            </IconButton>
            </DialogActions>

          </Dialog>
          <Dialog
            open={openReplyModal}
            aria-labelledby="customized-dialog-title"
            fullWidth="true"
          >
            <DialogTitle id="customized-dialog-title">Send Reply 
            </DialogTitle>
            <DialogContent dividers>
            same model ma send valu model thy to karvanu ..
            <table border="1">
              <tr>
                <td>UserName </td>
            <td>{userName}</td>
            <td>To </td>
  <td>{emailId}</td>
              </tr>
              </table>
              avi rit na be value show karvani ...<br></br>
              1) subject text field.<br></br>
              2) reply textArea field.
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
                        </Button>

            </DialogActions>

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
