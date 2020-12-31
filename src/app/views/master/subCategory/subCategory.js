import React, { Component } from "react";
import { Breadcrumb, SimpleCard } from "../../../../components/matx/index";

import { subCategoryListApi , deleteSubCategoryApi} from "../../../../redux/actions/index";
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

class subCategory extends Component{
  state = {
    subCategoryList: [],
    rowsPerPage : 5,
    page : 0,
    deleteModal : false,
    deleteSubCategoryToken : null
  };
  componentDidMount = async () => {
    await this.subCategoryList();
  };
  subCategoryList = async () => {
    await this.props.subCategoryListApi();
    this.setState({ subCategoryList : this.props.subCategoryList})
  };
     handleChangePage = (event, newPage) => {
      this.setState({ page : newPage})
    };  
     handleChangeRowsPerPage = event => {
       this.setState({ rowsPerPage : event.target.value})
    };

      //to delete SubCategory
  deleteSubCategoryClicked = async (token) => {
    if (token) {
      this.setState({ deleteSubCategoryToken: token });
    }
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  };

  yesDeleteClicked = async () => {
    //call delete Api
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteSubCategoryToken: null,
    });
    // this.props.setLoader(true);
    const deleteSubCategory = await deleteSubCategoryApi(this.state.deleteSubCategoryToken);
    if (deleteSubCategory && deleteSubCategory.status === status.success) {
      await this.subCategoryList();
      // toastr.success('Sub category deleted successfully');
    } else {
      // toastr.error('Deletion Failed');
    }
    // this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteSubCategoryToken: null,
    });
  };
  render(){
    const { page , rowsPerPage , subCategoryList} = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Master", path: "/master/country" },
              { name: "Sub Category" },
            ]}
          />
        </div>
        <div className="py-12" />
        <SimpleCard title="Sub Category Information">
        <div className="w-100 overflow-auto">
      <Table style={{ whiteSpace: "pre" }}>
        <TableHead>
          <TableRow>
          <TableCell className="px-0">ID</TableCell>
            <TableCell className="px-0">Category Name</TableCell>
            <TableCell className="px-0">SubCategory Name</TableCell>
            <TableCell className="px-0">Active/Not Active</TableCell>
            <TableCell className="px-0">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subCategoryList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map
            ((subCategory, index) => (
              <TableRow key={index}>
                <TableCell className="px-0 capitalize" align="left">
                  {index}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {subCategory.categoryName}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {subCategory.subCategoryName}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                {subCategory.isActive ?
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
                    <Icon color="error"  onClick={() => this.deleteSubCategoryClicked(subCategory.subCategoryToken)}>delete</Icon>
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
        count={subCategoryList.length}
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
            message = {"R you sure want to delete this Subcategory?"}
            toggle={this.deleteSubCategoryClicked}
            onYesClick={() => this.yesDeleteClicked(this.state.deleteSubCategoryToken)}
            onNoClick={this.noDeleteClicked}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { subCategoryList } = state.subCategory;
  return {
    subCategoryList
  };
};

export default connect(mapStateToProps, { subCategoryListApi })(subCategory);
