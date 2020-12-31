import React, { Component } from "react";
import { Breadcrumb, SimpleCard } from "../../../../components/matx/index";

import { newsTypeListApi, deleteNewsTypeApi } from "../../../../redux/actions/index";
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

class newsType extends Component{
  state = {
    newsTypeList: [],
    rowsPerPage : 5,
    page : 0,
    deleteModal : false,
    deleteNewsTypeToken : null
  };
  componentDidMount = async () => {
    await this.newsTypeList();
  };
  newsTypeList = async () => {
    await this.props.newsTypeListApi();
    this.setState({ newsTypeList : this.props.newsTypeList})
  };
     handleChangePage = (event, newPage) => {
      this.setState({ page : newPage})
    };  
     handleChangeRowsPerPage = event => {
       this.setState({ rowsPerPage : event.target.value})
    };

    //to delete NewsType
  deleteNewsTypeClicked = async (token) => {
    if (token) {
      this.setState({ deleteNewsTypeToken: token });
    }
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  };

  yesDeleteClicked = async () => {
    //call delete Api
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteNewsTypeToken: null,
    });
    // this.props.setLoader(true);
    const deleteNewsType = await deleteNewsTypeApi(this.state.deleteNewsTypeToken);
    if (deleteNewsType && deleteNewsType.status === status.success) {
      await this.newsTypeList();
      // toastr.success('News Type deleted successfully');
    } else {
      // toastr.error('Deletion Failed');
    }
    // this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteNewsTypeToken: null,
    });
  };
  render(){
    const { page , rowsPerPage , newsTypeList} = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Master", path: "/country" },
              { name: "NEWS Type" },
            ]}
          />
        </div>
        <div className="py-12" />
        <SimpleCard title="NEWS Type Information">
        <div className="w-100 overflow-auto">
      <Table style={{ whiteSpace: "pre" }}>
        <TableHead>
          <TableRow>
          <TableCell className="px-0">ID</TableCell>
            <TableCell className="px-0">NEWS Type</TableCell>
            <TableCell className="px-0">Active/Not Active</TableCell>
            <TableCell className="px-0">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newsTypeList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map
            ((newsType, index) => (
              <TableRow key={index}>
                <TableCell className="px-0 capitalize" align="left">
                  {index + 1}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {newsType.newsTypeName}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                {newsType.isActive ?
               ( <small className="border-radius-4 bg-primary text-white px-8 py-2 ">
                Active
              </small>) :
              (<small className="border-radius-4 bg-error text-white px-8 py-2 ">
                Not Active
                </small>)
                  }
                </TableCell>
                <TableCell className="px-0">
                  <IconButton>
                    <Icon color="primary">edit</Icon>
                  </IconButton>
                  <IconButton>                   
                    <Icon color="error" onClick={() => this.deleteNewsTypeClicked(newsType.newsTypeToken)}>delete</Icon>
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
        count={newsTypeList.length}
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
            message = {"R you sure want to delete this News Type?"}
            toggle={this.deleteNewsTypeClicked}
            onYesClick={() => this.yesDeleteClicked(this.state.deleteNewsTypeToken)}
            onNoClick={this.noDeleteClicked}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { newsTypeList } = state.newsType;
  return {
    newsTypeList
  };
};

export default connect(mapStateToProps, { newsTypeListApi })(newsType);
