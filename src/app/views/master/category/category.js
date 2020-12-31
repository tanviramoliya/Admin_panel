import React, { Component } from "react";
import { Breadcrumb, SimpleCard } from "../../../../components/matx/index";

import { categoryListApi, deleteCategoryApi } from "../../../../redux/actions/index";
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

class category extends Component{
  state = {
    categoryList: [],
    rowsPerPage : 5,
    page : 0,
    deleteModal : false,
    deleteCategoryToken : null
  };
  componentDidMount = async () => {
    await this.categoryList();
  };
  categoryList = async () => {
    await this.props.categoryListApi();
    this.setState({ categoryList : this.props.categoryList})
  };
     handleChangePage = (event, newPage) => {
      this.setState({ page : newPage})
    };  
     handleChangeRowsPerPage = event => {
       this.setState({ rowsPerPage : event.target.value})
    };

    //to delete Category
  deleteCategoryClicked = async (token) => {
    if (token) {
      this.setState({ deleteCategoryToken: token });
    }
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  };

  yesDeleteClicked = async () => {
    //call delete Api
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteCategoryToken: null,
    });
    // this.props.setLoader(true);
    const deleteCategory = await deleteCategoryApi(this.state.deleteCategoryToken);
    if (deleteCategory && deleteCategory.status === status.success) {
      await this.categoryList();
      // toastr.success('category deleted successfully');
    } else {
      // toastr.error('Deletion Failed');
    }
    // this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteCategoryToken: null,
    });
  };
  render(){
    const { page , rowsPerPage , categoryList} = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Master", path: "/master/country" },
              { name: "Category" },
            ]}
          />
        </div>
        <div className="py-12" />
        <SimpleCard title="Category Information">
        <div className="w-100 overflow-auto">
      <Table style={{ whiteSpace: "pre" }}>
        <TableHead>
          <TableRow>
          <TableCell className="px-0">ID</TableCell>
            <TableCell className="px-0">Category Name</TableCell>
            <TableCell className="px-0">Active/Not Active</TableCell>
            <TableCell className="px-0">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categoryList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map
            ((category, index) => (
              <TableRow key={index}>
                <TableCell className="px-0 capitalize" align="left">
                  {index}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {category.categoryName}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                {category.isActive ?
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
                    <Icon color="error" onClick={() => this.deleteCategoryClicked(category.categoryToken)}>delete</Icon>
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
        count={categoryList.length}
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
            message = {"R you sure want to delete this category?"}
            toggle={this.deleteCategoryClicked}
            onYesClick={() => this.yesDeleteClicked(this.state.deleteCategoryToken)}
            onNoClick={this.noDeleteClicked}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { categoryList } = state.category;
  return {
    categoryList
  };
};

export default connect(mapStateToProps, { categoryListApi })(category);
