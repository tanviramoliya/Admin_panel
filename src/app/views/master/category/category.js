import React, { Component } from "react";
import { Breadcrumb } from "../../../../components/matx/index";

import {
  categoryListApi,
  deleteCategoryApi,
  addCategoryApi,
  updateCategoryApi,
} from "../../../../redux/actions/index";
import { connect } from "react-redux";
import {
  Button,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  TextField,
  TableContainer,
  InputAdornment,
  TableSortLabel,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { status } from "../../../../utility/config";
import { toastr } from "react-redux-toastr";
import { Search } from "@material-ui/icons";
import AccessDeniedPage from "../../sessions/accessdeniedPage";


class category extends Component {
  state = {
    categoryList: [],
    count: "",
    sortingField: "createdDate",
    sortingOrder: "asc",
    keyword: "",
    rowsPerPage: 10,
    page: 0,
    deleteModal: false,
    deleteCategoryToken: null,
    openModal: false,
    categoryName: "",
    categoryToken: "",
    isActive: "active",
    type: "new",
    serialNo: 1,
    permission: true,
    perData: JSON.parse(localStorage.getItem("permission"))[8]


  };
  componentDidMount = async () => {
    const { perData } = this.state;
    if (perData.key === 'Master' && perData.value === "N/A") {
      this.setState({ permission: false });
      return false;
    }
    await this.getCategoryList();
  };
  getCategoryList = async () => {
    const { rowsPerPage, page, sortingField, sortingOrder, keyword } = this.state;
    let data = {
      keyword: keyword,
      pageSize: rowsPerPage,
      pageNo: page,
      field: sortingField,
      order: sortingOrder
    }
    await this.props.categoryListApi(data);
    this.setState({ categoryList: this.props.categoryList.result, count: this.props.categoryList.count });
  };
  handleSearchKeyword = async (event) => {
    await this.setState({ keyword: event.target.value });
    this.getCategoryList();
  }
  handleSortingOrder = async (fieldName, order) => {
    await this.setState({ sortingField: fieldName, sortingOrder: order === 'asc' ? 'desc' : 'asc' });
    this.getCategoryList();
  }
  handleChangePage = async (event, newPage) => {
    await this.setState({ page: newPage });
    this.getCategoryList();
  };
  handleChangeRowsPerPage = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    this.getCategoryList();
  };

  //to delete Category
  deleteCategoryClicked = async (token) => {
    const { perData } = this.state;
    if (perData.key === 'Master' && perData.value === "RW") {

      if (token) {
        this.setState({ deleteCategoryToken: token });
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
      deleteCategoryToken: null,
    });
    // this.props.setLoader(true);
    const deleteCategory = await deleteCategoryApi(
      this.state.deleteCategoryToken
    );
    if (deleteCategory && deleteCategory.data.code === status.success) {
      await this.categoryList();
      toastr.success(deleteCategory.data.message);
    } else if (
      deleteCategory &&
      deleteCategory.data.code === status.badRequest
    ) {
      toastr.warning(deleteCategory.data.message);
    } else {
      toastr.error(deleteCategory.data.message);
    }
    // this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteCategoryToken: null,
    });
  };
  // for open a modal
  setModel = (type, data) => {
    const { perData } = this.state;
    if (perData.key === 'Master' && perData.value === "RW") {

      this.setState({ openModal: true, type: type });
      if (type === "edit") {
        this.setState({
          categoryName: data.categoryName,
          categoryToken: data.categoryToken,
          isActive: data.isActive ? "active" : "notActive",
          serialNo: data.serialNo,
        });
      }
    }
    else {
      toastr.error("Access Denied!")
    }
  };
  //for close a modal
  handleClose = () => {
    this.setState({
      openModal: false,
      categoryName: "",
      type: "new",
      categoryToken: "",
      isActive: "active",
      serialNo: 1,
    });
  };
  AddCategory = async () => {
    const { type, categoryName, isActive, serialNo } = this.state;
    if (type === "new") {
      if (!categoryName) {
        toastr.error("Category is required");
        return;
      }
      // this.props.setLoader(true);
      // this.setState({
      //   addOrg: false,
      // });
      let data = {
        categoryName: categoryName,
        isActive: isActive === "active" ? true : false,
        serialNo: serialNo,
      };
      const createCategory = await addCategoryApi(data);
      if (createCategory) {
        if (createCategory.status === status.success) {
          if (createCategory.data.code === status.success) {
            toastr.success(createCategory.data.message);
            this.categoryList();
            this.setState({
              categoryName: "",
              openModal: false,
              categoryToken: "",
              type: "new",
              isActive: "active",
              serialNo: 1,
            });
          } else {
            toastr.warning(createCategory.data.message);
          }
        } else {
          toastr.error(createCategory.data.message);
        }
      }
      // this.props.setLoader(false);

    }
  };
  UpdateCategory = async () => {
    const {
      type,
      categoryName,
      categoryToken,
      isActive,
      serialNo,
    } = this.state;
    if (type === "edit") {
      if (!categoryName) {
        toastr.error("Catetgory is required");
        return;
      }
      // this.props.setLoader(true);
      // this.setState({
      //   addOrg: false,
      // });
      let data = {
        categoryName: categoryName,
        categoryToken: categoryToken,
        isActive: isActive === "active" ? true : false,
        serialNo: serialNo,
      };
      const updateCategory = await updateCategoryApi(data);
      if (updateCategory) {
        if (updateCategory.status === status.success) {
          if (updateCategory.data.code === status.success) {
            toastr.success(updateCategory.data.message);
            this.categoryList();
            this.setState({
              categoryName: "",
              openModal: false,
              categoryToken: "",
              type: "new",
              isActive: "active",
              serialNo: 1,
            });
          } else {
            toastr.warning(updateCategory.data.message);
          }
        } else {
          toastr.error(updateCategory.data.message);
        }
      }
      // this.props.setLoader(false);

    }
  };
  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {
      page,
      rowsPerPage,
      sortingOrder,
      keyword,
      sortingField, count,
      categoryList,
      categoryName,
      type,
      openModal,
      isActive,
      serialNo,
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
            <Breadcrumb
              routeSegments={[
                { name: "Master", path: "/master/country" },
                { name: "Category" },
              ]}
            />
          </div>
          <div className="py-12" >
            <Card elevation={6} className="px-24 pt-12 h-100">
              <div className="flex flex-middle flex-space-between pb-12">
                <div className="card-title">Category Information</div>
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
                  <Button
                    className="capitalize text-white bg-circle-primary"
                    onClick={() => this.setModel("new")}
                  >
                    Add Category
            </Button>
                </div>
              </div>
              <TableContainer style={{ maxHeight: "405px" }}>
                <Table style={{ whiteSpace: "pre" }} stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className="px-0 py-8" width="15%">

                        Sr.No</TableCell>
                      <TableCell className="px-0 py-8" width="30%">
                        <TableSortLabel
                          active={sortingField === 'categoryName'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("categoryName", sortingOrder)}
                        >
                          Category Name
                      </TableSortLabel>
                      </TableCell>
                      <TableCell className="px-0 py-8" width="20%">
                        <TableSortLabel
                          active={sortingField === 'serialNo'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("serialNo", sortingOrder)}
                        >
                          Serial No
                      </TableSortLabel>
                      </TableCell>
                      <TableCell className="px-0 py-8" width="20%">
                        <TableSortLabel
                          active={sortingField === 'isActive'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("isActive", sortingOrder)}
                        >
                          Active/Not Active
                      </TableSortLabel>
                      </TableCell>
                      <TableCell className="px-0 py-8" width="20%">
                        <TableSortLabel
                          active={sortingField === 'createdDate'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("createdDate", sortingOrder)}
                        >
                          Created Date
                      </TableSortLabel>
                      </TableCell>

                      <TableCell className="px-0 py-8" >Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {console.log(categoryList)}
                    {categoryList && categoryList !== [] ? categoryList
                      //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((category, index) => (
                        <TableRow key={index}>
                          <TableCell className="p-0" >
                            {page * rowsPerPage + index + 1}

                          </TableCell>
                          <TableCell className="p-0">
                            {category.categoryName}
                          </TableCell>
                          <TableCell className="p-0">
                            <small className="border-radius-4 bg-secondary text-white px-8 py-2 ">
                              {category.serialNo}
                            </small>
                          </TableCell>
                          <TableCell className="p-0">
                            {category.isActive ? (
                              <small className="border-radius-4 bg-primary text-white px-8 py-2 ">
                                Active
                          </small >
                            ) : (
                                <small className="border-radius-4 bg-error text-white px-8 py-2 ">
                                  Not Active
                          </small>
                              )}
                          </TableCell>
                          <TableCell className="p-0">
                            <IconButton className="p-8">
                              <Icon
                                color="primary"
                                onClick={() => this.setModel("edit", category)}
                              >
                                edit
                          </Icon>
                            </IconButton>
                            <IconButton className="p-8">
                              <Icon
                                color="error"
                                onClick={() =>
                                  this.deleteCategoryClicked(category.categoryToken)
                                }
                              >
                                delete
                          </Icon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )) :
                      <h1>
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
              message={"are you sure want to delete this category?"}
              toggle={this.deleteCategoryClicked}
              onYesClick={() =>
                this.yesDeleteClicked(this.state.deleteCategoryToken)
              }
              onNoClick={this.noDeleteClicked}
            />
          </div>
          <div>
            <Dialog
              open={openModal}
              aria-labelledby="form-dialog-title"
              fullWidth={true}
            >
              <DialogTitle id="form-dialog-title">
                {type === "new" ? "Add a Category" : "Edit Category"}
              </DialogTitle>
              <DialogContent>
                <ValidatorForm
                  ref="form"
                  onSubmit={
                    type === "new" ? this.AddCategory : this.UpdateCategory
                  }
                  onError={(errors) => null}
                >
                  <FormControl
                    style={{ width: "-webkit-fill-available" }}
                    error={!serialNo}
                  >
                    <TextField
                      label="Serial No"
                      InputProps={{ inputProps: { min: "1", max: "99" } }}
                      type="number"
                      name="serialNo"
                      value={serialNo}
                      onChange={this.handleChange}
                      variant="outlined"
                    />
                  </FormControl>
                  <div style={{ marginTop: "25px" }}>
                    <TextValidator
                      className="mb-16 w-300"
                      label="Category"
                      onChange={this.handleChange}
                      type="text"
                      name="categoryName"
                      value={categoryName}
                      validators={["required", "minStringLength: 2"]}
                      errorMessages={["this field is required", "category name more then 2 character"]}
                      style={{ width: "-webkit-fill-available" }}
                      variant="outlined"
                    />
                  </div>
                  <RadioGroup
                    value={isActive}
                    name="isActive"
                    onChange={this.handleChange}
                    row
                  >
                    <FormControlLabel
                      value={"active"}
                      control={<Radio color="secondary" />}
                      label="Active"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value={"notActive"}
                      control={<Radio color="secondary" />}
                      label="Not Active"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                  <DialogActions className="p-0">
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                  </Button>
                    {type === "new" ? (
                      <Button color="primary" type="submit">
                        Add
                    </Button>
                    ) : (
                        <Button color="primary" type="submit">
                          Save
                    </Button>
                      )}
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
  const { categoryList } = state.category;
  return {
    categoryList
  };
};

export default connect(mapStateToProps, { categoryListApi })(category);
