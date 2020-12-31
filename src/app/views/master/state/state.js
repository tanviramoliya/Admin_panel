import React, { Component } from "react";
import { Breadcrumb, SimpleCard } from "../../../../components/matx/index";

import { stateListApi, deleteStateApi } from "../../../../redux/actions/index";
import { connect } from "react-redux";
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  TablePagination
} from "@material-ui/core";
import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { status } from '../../../../utility/config';

class state extends Component{
  state = {
    stateList: [],
    rowsPerPage : 5,
    page : 0,
    deleteModal : false,
    deleteStateToken : null
  };
  componentDidMount = async () => {
    await this.getStateList();
  };
  getStateList = async () => {
    await this.props.stateListApi();
    this.setState({ stateList : this.props.stateList})
  };
     handleChangePage = (event, newPage) => {
      this.setState({ page : newPage})
    };  
     handleChangeRowsPerPage = event => {
       this.setState({ rowsPerPage : event.target.value})
    };

    //to delete state
    deleteStateClicked = async (token) => {
    if (token) {
      this.setState({ deleteStateToken: token });
    }
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  };

  yesDeleteClicked = async () => {
    //call delete Api
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteStateToken: null,
    });
    // this.props.setLoader(true);
    const deleteState = await deleteStateApi(this.state.deleteStateToken);
    if (deleteState && deleteState.status === status.success) {
      await this.getStateList();
      // toastr.success('State deleted successfully');
    } else {
      // toastr.error('Deletion Failed');
    }
    // this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteStateToken: null,
    });
  };
  render(){
    const { page , rowsPerPage , stateList} = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Master", path: "/master/country" },
              { name: "State" },
            ]}
          />
        </div>
        <div className="py-12" />
        <SimpleCard title="State Information">
        <div className="w-100 overflow-auto">
      <Table style={{ whiteSpace: "pre" }}>
        <TableHead>
          <TableRow>
            <TableCell className="px-0">ID</TableCell>
            <TableCell className="px-0">Country Name</TableCell>
            <TableCell className="px-0">State Name</TableCell>
            <TableCell className="px-0">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stateList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map
            ((state, index) => (
              <TableRow key={index}>
                <TableCell className="px-0 capitalize" align="left">
                  {index + 1}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {state.countryName}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {state.stateName}
                </TableCell>
                <TableCell className="px-0">
                  <IconButton>
                    <Icon color="primary">edit</Icon>
                  </IconButton>
                  <IconButton>                   
                    <Icon color="error" onClick={() => this.deleteStateClicked(state.stateToken)}>delete</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        className="px-16"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={stateList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page"
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page"
        }}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
    </div>
        </SimpleCard>
        <div>
          <ConfirmationDialog
            open={this.state.deleteModal}
            title = "Delete Confirmation"
            message = {"R you sure want to delete this state?"}
            toggle={this.deleteStateClicked}
            onYesClick={() => this.yesDeleteClicked(this.state.deleteStateToken)}
            onNoClick={this.noDeleteClicked}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { stateList } = state.state;
  return {
    stateList
  };
};

export default connect(mapStateToProps, { stateListApi })(state);
