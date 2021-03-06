import React, { Component } from "react";
import {
  subscriberListApi,
  deleteSubscriberApi,
} from "../../../redux/actions/index";
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
  TableSortLabel
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { connect } from "react-redux";

class subscriber extends Component {
  state = {
    subscriberList: [],
    rowsPerPage: 8,
    page: 0,
    deleteModal: false,
    deleteSubscriberToken: null,
    selected: [],
    order:"asc",
    orderBy:"",
    setOrder:"",
    sertOrderby:"",

  };


  componentDidMount = async () => {
    await this.getSubscriberList();
  };
  getSubscriberList = async () => {
    await this.props.subscriberListApi();
    this.setState({ subscriberList: this.props.subscriberList });
  };
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };
  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  //to delete Category
  deleteSubscriberClicked = async (token) => {
    if (token) {
      this.setState({ deleteSubscriberToken: token });
    }
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  };

  yesDeleteClicked = async () => {
    //call delete Api
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteSubscriberToken: null,
      selected: [],
    });
    // this.props.setLoader(true);
    const deleteSubscriber = await deleteSubscriberApi(
      this.state.deleteSubscriberToken
    );
    if (deleteSubscriber && deleteSubscriber.data.code === status.success) {
      await this.getSubscriberList();
      toastr.success(deleteSubscriber.data.message);
    } else if (
      deleteSubscriber &&
      deleteSubscriber.data.code === status.badRequest
    ) {
      toastr.warning(deleteSubscriber.data.message);
    } else {
      toastr.error(deleteSubscriber.data.message);
    }
    // this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteSubscriberToken: null,
      selected: [],
    });
  };
  //all checked
  handleSelectAllClick = (event) => {
    console.log(" Called");
    const { subscriberList } = this.state;
    if (event.target.checked) {
      const newSelecteds = subscriberList ? subscriberList.map((n) => n.userToken) : null;
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
    const { page, rowsPerPage, subscriberList, selected } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[{ name: "Subscriber", path: "/subscriber" }]}
          />
        </div>
        <div className="py-12">
          <Card elevation={6} className="px-24 pt-20 h-100">
            <div className="flex flex-middle flex-space-between pb-12">
            <div className="card-title">

              {selected.length > 0 ? (
                <Typography color="error" variant="h6" >
                  {selected.length} rows selected
                </Typography>
              ) : (
                <Typography variant="h6" >
                  Subscription Information
                </Typography>
              )}
              </div>
              {selected.length > 0 ? (
                <Tooltip title="Delete" >
                  <IconButton
                    aria-label="delete" className="p-0"
                    onClick={() => this.deleteSubscriberClicked(selected)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Delete"   style=
                {{padding : "12px"}}>
                  <Chip                  
                    variant="outlined"
                    color="secondary"
                    label={subscriberList.length + " Subscribers"}
                  />
                </Tooltip>
              )}
              
              </div>
            <TableContainer style={{ maxHeight: "405px" }}>
              <Table style={{ whiteSpace: "pre" }}  stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="p-0">
                      <Checkbox 
                        indeterminate={
                          selected.length > 0 &&
                          selected.length < subscriberList.length
                        }
                        checked={
                          subscriberList.length > 0 &&
                          selected.length === subscriberList.length
                        }
                        onChange={this.handleSelectAllClick}
                        inputProps={{ "aria-label": "select all desserts" }}
                      />
                      {/* <FormControlLabel control={<Checkbox onChange={this.handleSelectAllClick} />} /> */}
                    </TableCell>
                    <TableCell className="px-0" width="15%">
                      <TableSortLabel>Sr.No</TableSortLabel>
                    </TableCell>
                    <TableCell className="px-0" width="30%" >
                      User Name
                    </TableCell>
                    <TableCell className="px-0" width="30%">
                      User Email
                    </TableCell>
                    <TableCell className="px-0" width="20%">
                      Subscription Date
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {subscriberList && subscriberList === [] ? subscriberList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((subscriberUpdate, index) => {
                      const isItemSelected = this.isSelected(
                        subscriberUpdate.userToken
                      );
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          onClick={(event) =>
                            this.handleClick(event, subscriberUpdate.userToken)
                          }
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={subscriberUpdate.userToken}
                          selected={isItemSelected}
                        >
                          <TableCell className="p-0">
                            <Checkbox 
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                            {/* <FormControlLabel control={<Checkbox />} /> */}
                          </TableCell>
                          <TableCell
                            className="p-0"
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell
                            id={labelId}
                            className="p-0"
                          >
                            {subscriberUpdate.userName}
                          </TableCell>
                          <TableCell
                            className="p-0" style={{textOverflow:"ellipsis",overflow:"hidden",whiteSpace: "nowrap"}}>
                            {subscriberUpdate.emailId}
                          </TableCell>
                          <TableCell
                            className="p-0"
                          >
                            {subscriberUpdate.subscriptionDate}
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
              rowsPerPageOptions={[8, 16, 24]}
              component="div"
              count={subscriberList ? subscriberList.length : 0}
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
              " subscriber(s)?"
            }
            toggle={this.deleteSubscriberClicked}
            onYesClick={() =>
              this.yesDeleteClicked(this.state.deleteSubscriberToken)
            }
            onNoClick={this.noDeleteClicked}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { subscriberList } = state.subscriber;
  return {
    subscriberList,
  };
};

export default connect(mapStateToProps, { subscriberListApi })(subscriber);
