import React, { Component } from "react";
import { Breadcrumb } from "../../../../components/matx/index";

import {
  subCategoryListApi,
  deleteSubCategoryApi,
  addSubCategoryApi,
  updateSubCategoryApi,
  categoryListApi,
  categoryNameListApi
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
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  TableContainer,
  TextField,
  InputAdornment,
  TableSortLabel,
  FormHelperText,
  Chip
} from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";

import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { status } from "../../../../utility/config";
import { toastr } from "react-redux-toastr";
import { Search, Error } from "@material-ui/icons";
import SimpleReactValidator from "simple-react-validator";
import AccessDeniedPage from "../../sessions/accessdeniedPage";
import { setLoader } from "../../../../redux/actions/loaderAction/loaderAction";
import { red } from "@material-ui/core/colors";

class subCategory extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }
  state = {
    subCategoryList: [],
    count: "",
    sortingField: "createdDate",
    sortingOrder: "desc",
    keyword: "",
    rowsPerPage: 10,
    page: 0,
    deleteModal: false,
    deleteSubCategoryToken: null,
    categoryNameList: [],
    openModal: false,
    subCategoryName: "",
    subCategoryToken: "",
    type: "new",
    categoryName: "",
    categoryToken: "",
    isActive: "active",
    permission: true,
    perData: JSON.parse(localStorage.getItem("permission"))[8]

  };
  componentDidMount = async () => {
    const { perData } = this.state;
    if (perData.key === 'Master' && perData.value === "N/A") {
      this.setState({ permission: false });
      return false;
    }
    await this.subCategoryList();
    await this.categoryList();
  };
  subCategoryList = async () => {
    const { rowsPerPage, page, sortingField, sortingOrder, keyword } = this.state;
    let data = {
      keyword: keyword,
      pageSize: rowsPerPage,
      pageNo: page,
      field: sortingField,
      order: sortingOrder
    }
    await this.props.subCategoryListApi(data);
    this.setState({ subCategoryList: this.props.subCategoryList.result, count: this.props.subCategoryList.count });
  };
  categoryList = async () => {
    await this.props.categoryNameListApi();
    this.setState({ categoryNameList: this.props.categoryNameList });
  };
  handleSearchKeyword = async (event) => {
    await this.setState({ keyword: event.target.value });
    this.subCategoryList();
  }
  handleSortingOrder = async (fieldName, order) => {

    await this.setState({ sortingField: fieldName, sortingOrder: order === 'asc' ? 'desc' : 'asc' });
    this.subCategoryList();

  }
  handleChangePage = async (event, newPage) => {
    await this.setState({ page: newPage });
    this.subCategoryList();
  };
  handleChangeRowsPerPage = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    this.subCategoryList();
  };


  //to delete SubCategory
  deleteSubCategoryClicked = async (token) => {
    const { perData } = this.state;
    if (perData.key === 'Master' && perData.value === "RW") {
      if (token) {
        this.setState({ deleteSubCategoryToken: token });
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
      deleteSubCategoryToken: null,
    });
    this.props.setLoader(true);
    const deleteSubCategory = await deleteSubCategoryApi(
      this.state.deleteSubCategoryToken
    );
    if (deleteSubCategory && deleteSubCategory.data.code === status.success) {
      await this.subCategoryList();
      toastr.success(deleteSubCategory.data.message);
    } else if (
      deleteSubCategory &&
      deleteSubCategory.data.code === status.badRequest
    ) {
      toastr.warning(deleteSubCategory.data.message);
    } else {
      toastr.error(deleteSubCategory.data.message);
    }
    this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteSubCategoryToken: null,
    });
  };
  // for open a modal
  setModel = (type, data) => {
    const { perData } = this.state;
    if (perData.key === 'Master' && perData.value === "RW") {

      this.setState({ openModal: true, type: type });
      if (type === "edit") {
        this.setState({
          subCategoryName: data.subCategoryName,
          subCategoryToken: data.subCategoryToken,
          categoryName: data.categoryName,
          categoryToken: data.categoryToken,
          isActive: data.isActive ? "active" : "notActive"
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
      subCategoryName: "",
      type: "new",
      subCategoryToken: "",
      categoryName: "",
      categoryToken: "",
      isActive: "active"
    });
    this.validator.hideMessageFor("categoryName");
    this.validator.hideMessageFor("subCategoryName");
  };
  AddSubCategory = async () => {
    const {
      type,
      subCategoryName,
      categoryToken,
      isActive
    } = this.state;
    if (type === "new") {
      if (
        this.validator.allValid()

      ) {
        let data = {
          subCategoryName: subCategoryName,
          categoryToken: categoryToken,
          isActive: isActive === "active" ? true : false
        };
        this.props.setLoader(true);
        const createSubCategory = await addSubCategoryApi(data);
        if (createSubCategory) {
          if (createSubCategory.status === status.success) {
            if (createSubCategory.data.code === status.success) {
              toastr.success(createSubCategory.data.message);
              this.subCategoryList();

              this.setState({
                categoryName: "",
                openModal: false,
                categoryToken: "",
                type: "new",
                subCategoryName: "",
                subCategoryToken: "",
                isActive: "active"
              });
              this.validator.hideMessageFor("categoryName");
              this.validator.hideMessageFor("subCategoryName");
            } else {
              toastr.warning(createSubCategory.data.message);
            }
          } else {
            toastr.error(createSubCategory.data.message);
          }
        }
        this.props.setLoader(false);
      }
      else {
        this.validator.showMessages();
      }
    }
  };
  UpdateSubCategory = async () => {
    const {
      type,
      subCategoryName,
      subCategoryToken,
      categoryToken,
      isActive
    } = this.state;
    if (type === "edit") {
      if (
        this.validator.allValid()

      ) {
        let data = {
          subCategoryName: subCategoryName,
          categoryToken: categoryToken,
          subCategoryToken: subCategoryToken,
          isActive: isActive === "active" ? true : false
        };
        this.props.setLoader(true);
        const updateSubCategory = await updateSubCategoryApi(data);
        if (updateSubCategory) {
          if (updateSubCategory.status === status.success) {
            if (updateSubCategory.data.code === status.success) {
              toastr.success(updateSubCategory.data.message);

              this.subCategoryList();

              this.setState({
                categoryName: "",
                openModal: false,
                categoryToken: "",
                type: "new",
                subCategoryToken: "",
                subCategoryName: "",
                isActive: "active"
              });
              this.validator.hideMessageFor("categoryName");
              this.validator.hideMessageFor("subCategoryName");
            } else {
              toastr.warning(updateSubCategory.data.message);
            }
          } else {
            toastr.error(updateSubCategory.data.message);
          }
        }
        this.props.setLoader(false);
      }
    } else {
      this.validator.showMessages();
    }
  };
  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChangeCategory = (categoryData) => {
    this.setState({
      categoryName: categoryData.categoryName,
      categoryToken: categoryData.categoryToken,
    });
  };
  render() {
    const {
      page,
      rowsPerPage,
      sortingOrder,
      keyword,
      sortingField, count,
      subCategoryList,
      openModal,
      subCategoryName,
      type,
      categoryNameList,
      categoryName,
      isActive,
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
                { name: "Master", path: "/master/subcountry" },
                { name: "Sub Category" },
              ]}
            />
          </div>
          <div className="py-12" >
            <Card elevation={6} className="px-24 pt-12 h-100">
              <div className="flex flex-middle flex-space-between pb-12">
                <div className="card-title">Sub Category Information</div>
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
                    Add Sub Category
            </Button>
                </div>
              </div>
              <TableContainer >
                <Table style={{ whiteSpace: "pre" }} stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className="px-0 py-8" width="10%">Sr.No</TableCell>
                      <TableCell className="px-0 py-8" width="25%">
                        <TableSortLabel
                          active={sortingField === 'categoryName'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("categoryName", sortingOrder)}
                        >
                          Category Name
                      </TableSortLabel></TableCell>
                      <TableCell className="px-0 py-8" width="25%">
                        <TableSortLabel
                          active={sortingField === 'subCategoryName'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("subCategoryName", sortingOrder)}
                        >
                          SubCategory Name
                      </TableSortLabel></TableCell>
                      <TableCell className="px-0 py-8" width="15%">
                        <TableSortLabel
                          active={sortingField === 'isActive'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("isActive", sortingOrder)}
                        >
                          Active/Not Active
                   </TableSortLabel></TableCell>
                      <TableCell className="px-0 py-8" width="15%">
                        <TableSortLabel
                          active={sortingField === 'createdDate'}
                          direction={sortingOrder}
                          onClick={() => this.handleSortingOrder("createdDate", sortingOrder)}
                        >
                          Created Date
                        </TableSortLabel>

                      </TableCell>
                      <TableCell className="px-0 py-8">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subCategoryList && subCategoryList !== [] ? subCategoryList
                      // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((subCategory, index) => (
                        <TableRow key={index}>
                          <TableCell className="p-0" >
                            {page * rowsPerPage + index + 1}

                          </TableCell>
                          <TableCell className="p-0">
                            {subCategory.categoryName}
                          </TableCell>
                          <TableCell className="p-0">
                            {subCategory.subCategoryName}
                          </TableCell>
                          <TableCell className="p-0">
                            {subCategory.isActive ? (
                              <small className="border-radius-4 bg-primary text-white px-8 py-2 ">
                                Active
                          </small>
                            ) : (
                                <small className="border-radius-4 bg-error text-white px-8 py-2 ">
                                  Not Active
                          </small>
                              )}
                          </TableCell>
                          <TableCell className="p-0">
                            {subCategory.createdDate}
                          </TableCell>

                          <TableCell className="p-0">
                            <IconButton className="p-8">
                              <Icon
                                color="primary"
                                onClick={() => this.setModel("edit", subCategory)}
                              >
                                edit
                          </Icon>
                            </IconButton>
                            <IconButton className="p-8">
                              <Icon
                                color="error"
                                onClick={() =>
                                  this.deleteSubCategoryClicked(
                                    subCategory.subCategoryToken
                                  )
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
              message={"R you sure want to delete this Subcategory?"}
              toggle={this.deleteSubCategoryClicked}
              onYesClick={() =>
                this.yesDeleteClicked(this.state.deleteSubCategoryToken)
              }
              onNoClick={this.noDeleteClicked}
            />
          </div>
          <div>
            <Dialog
              open={openModal}
              //  onClose={this.handleClose}
              // aria-labelledby="form-dialog-title"
              fullWidth={true}
            >
              <DialogTitle id="form-dialog-title">
                {type === "new" ? "Add New Sub Category" : "Edit Sub Category"}
              </DialogTitle>
              <DialogContent>
                <ValidatorForm
                  ref="form"
                  onSubmit={
                    type === "new" ? this.AddSubCategory : this.UpdateSubCategory
                  }
                  onError={(errors) => null}
                >
                  <FormControl className="mb-16 w-100" variant="outlined" error={this.validator.message(
                    "categoryName",
                    categoryName,
                    "required"
                  )}>
                    <InputLabel id="categoryName">
                      Category
                  </InputLabel>
                    <Select
                      labelId="categoryName"
                      label="Category"
                      id="categoryName"
                      name="categoryName"
                      value={categoryName}
                      onChange={this.handleChange}
                      displayEmpty
                      onBlur={() => this.validator.showMessageFor("categoryName")}
                    >
                      {categoryNameList.map((category, index) => {
                        return (
                          <MenuItem value={category.categoryName} key={index} onClick={() => this.handleChangeCategory(category)}>
                            <div style={{ alignItems: "center", display: "flex" }}>
                              <div className={category.isActive ? "activeDot" : "inActiveDot"}></div>
                              <div className="pl-4">{category.categoryName}</div>
                            </div>
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText style={{ color: 'red' }}>{this.validator.message(
                      "categoryName",
                      categoryName,
                      "required"
                    )}</FormHelperText>
                  </FormControl>


                  <TextField
                    className="mb-16 w-100"
                    label="Sub Category Name"
                    onChange={this.handleChange}
                    type="text"
                    name="subCategoryName"
                    value={subCategoryName}
                    placeholder="Enter Sub category name"
                    variant="outlined"

                    error={this.validator.message(
                      "subCategoryName",
                      subCategoryName,
                      "required"
                    )}
                    helperText={this.validator.message(
                      "subCategoryName",
                      subCategoryName,
                      "required"
                    )}
                    onBlur={() => this.validator.showMessageFor("subCategoryName")}
                  />


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
                  <DialogActions className="p-0" style={{ display: "block" }}>
                    <div className="flex flex-middle flex-space-between">
                      <div>
                        <Chip variant="outlined" style={{ color: red[500] }} label="Changes are also affected on News" icon={<Error style={{ color: red[500] }} />} />

                      </div>
                      <div>
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
                      </div>
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
  const { subCategoryList } = state.subCategory;
  const { categoryList, categoryNameList } = state.category;
  return {
    subCategoryList,
    categoryList,
    categoryNameList
  };
};

export default connect(mapStateToProps, {
  setLoader,
  subCategoryListApi,
  categoryListApi,
  categoryNameListApi
})(subCategory);
