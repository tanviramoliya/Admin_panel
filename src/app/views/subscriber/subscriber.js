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
  TableSortLabel,
  TextField,
  InputAdornment
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { connect } from "react-redux";
import { Search } from "@material-ui/icons";
import AccessDeniedPage from "../sessions/accessdeniedPage";


class subscriber extends Component {
  state = {
    subscriberList: [],
    count: "",
    sortingField: "subscriptionDate",
    sortingOrder: "asc",
    keyword: "",
    rowsPerPage: 10,
    page: 0,
    deleteModal: false,
    deleteSubscriberToken: null,
    selected: [],
    order: "asc",
    orderBy: "",
    setOrder: "",
    sertOrderby: "",
    permission: true,
    perData : JSON.parse(localStorage.getItem("permission"))[6]


  };


  componentDidMount = async () => {
    const { perData } = this.state;
    if (perData.key === 'Subscription' && perData.value === "N/A") {
      this.setState({ permission: false });
      return false;
    }
    await this.getSubscriberList();
  };
  getSubscriberList = async () => {
    const { rowsPerPage, page, sortingField, sortingOrder, keyword } = this.state;
    let data = {
      keyword: keyword,
      pageSize: rowsPerPage,
      pageNo: page,
      field: sortingField,
      order: sortingOrder
    }
    await this.props.subscriberListApi(data);
    this.setState({ subscriberList: this.props.subscriberList.result, count: this.props.subscriberList.count });
  };

  handleSearchKeyword = async (event) => {
    await this.setState({ keyword: event.target.value });
    this.getSubscriberList();
  }
  handleSortingOrder = async (fieldName, order) => {

    await this.setState({ sortingField: fieldName, sortingOrder: order === 'asc' ? 'desc' : 'asc' });
    this.getSubscriberList();

  }
  handleChangePage = async (event, newPage) => {
    await this.setState({ page: newPage });
    this.getSubscriberList();
  };
  handleChangeRowsPerPage = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    this.getSubscriberList();
  };


  //to delete Category
  deleteSubscriberClicked = async (token) => {
    const { perData } = this.state;
    if (perData.key === 'Subscription' && perData.value === "RW") {
    if (token) {
      this.setState({ deleteSubscriberToken: token });
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
    const { page,
      rowsPerPage,
      sortingOrder,
      keyword,
      sortingField, count, subscriberList, selected, permission } = this.state;
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
              routeSegments={[{ name: "Subscriber", path: "/subscriber" }]}
            />
          </div>
          <div className="py-12">
            <Card elevation={6} className="px-24 pt-12 h-100">
              <div className="flex flex-middle flex-space-between pb-12">
                <div className="card-title">

                  {selected.length > 0 ? (
                    <span> {selected.length} rows selected</span>
                  ) : (
                      <span>Subscription Information</span>
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
                        onClick={() => this.deleteSubscriberClicked(selected)}
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
                          label={subscriberList.length + " Subscribers"}
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
                      <TableCell className="px-0 py-8" width="15%">
                        <TableSortLabel>Sr.No</TableSortLabel>
                      </TableCell>
                      <TableCell className="px-0 py-8" width="30%" >
                        <TableSortLabel
                          active={sortingField === 'userName'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("userName", sortingOrder)}
                        >
                          User Name
                      </TableSortLabel>
                      </TableCell>
                      <TableCell className="px-0 py-8" width="30%">

                        <TableSortLabel
                          active={sortingField === 'emailId'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("emailId", sortingOrder)}
                        >
                          User Email
                      </TableSortLabel>
                      </TableCell>
                      <TableCell className="px-0 py-8" width="20%">
                        <TableSortLabel
                          active={sortingField === 'subscriptionDate'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("subscriptionDate", sortingOrder)}
                        >
                          Subscription Date
                      </TableSortLabel>

                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {subscriberList && subscriberList !== [] ? subscriberList
                      //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                              {page * rowsPerPage + index + 1}

                            </TableCell>
                            <TableCell
                              id={labelId}
                              className="p-0"
                            >
                              {subscriberUpdate.userName}
                            </TableCell>
                            <TableCell
                              className="p-0" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
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
}
const mapStateToProps = (state) => {
  const { subscriberList } = state.subscriber;
  return {
    subscriberList,
  };
};

export default connect(mapStateToProps, { subscriberListApi })(subscriber);
