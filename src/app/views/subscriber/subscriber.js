import React, { Component } from "react";
import {
  subscriberListApi,
  deleteSubscriberApi,
} from "../../../redux/actions/index";
import { status } from "../../../utility/config";
import { toastr } from "react-redux-toastr";
import { Breadcrumb } from "../../../components/matx/Breadcrumb";
import {
  Card, Button, Table,
  TableHead, TableRow, TableCell, TableBody,TablePagination, TableContainer
} from "@material-ui/core";
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { connect } from "react-redux";
class subscriber extends Component {
  state = {
    subscriberList: [],
    rowsPerPage: 8,
    page: 0,
    deleteModal: false,
    deleteSubscriberToken: null,
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
    });
  };

  render() {
    const {
      page,
      rowsPerPage,
      subscriberList,
    } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Subscriber", path: "/subscriber" },

            ]}
          />
        </div>
        <div className="py-12">
        <Card elevation={6} className="px-24 pt-20 h-100">
            <div className="flex flex-middle flex-space-between pb-12">
              <div className="card-title">Subscriber Infromation</div>
              <Button
                className="capitalize text-white bg-circle-primary"
                style={{visibility : "hidden"}}
              >
                Add News Update
                  </Button>
            </div>
            <TableContainer style={{ maxHeight: "405px" }}>
              <Table style={{ whiteSpace: "pre" }} stickyHeader >
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0" width="15%">No</TableCell>
                    <TableCell className="px-0" width="30%">User Name</TableCell>
                    <TableCell className="px-0" width="30%">User Email</TableCell>
                    <TableCell className="px-0" width="20%">Subscription Date</TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {subscriberList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((subscriberUpdate, index) => (
                      <TableRow key={index} >
                        <TableCell className="px-0" style={{padding:"12.5px"}} align="left">
                          {index + 1}
                        </TableCell>
                        <TableCell className="px-0" style={{padding:"12.5px"}} align="left">
                          {subscriberUpdate.userName}
                        </TableCell>
                        <TableCell className="px-0"  style={{padding:"12.5px"}} align="left">
                          {subscriberUpdate.emailId}
                        </TableCell>
                        <TableCell className="px-0"  style={{padding:"12.5px"}} align="left">
                          {subscriberUpdate.subscriptionDate}
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
              count={subscriberList.length}
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
            message={"are you sure want to delete selected subscriber?"}
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
    subscriberList
  };
};

export default connect(mapStateToProps, { subscriberListApi })(
  subscriber
);