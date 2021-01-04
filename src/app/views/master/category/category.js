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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { status } from "../../../../utility/config";
import { toastr } from "react-redux-toastr";

class category extends Component {
  state = {
    categoryList: [],
    rowsPerPage: 5,
    page: 0,
    deleteModal: false,
    deleteCategoryToken: null,
    openModal: false,
    categoryName: "",
    categoryToken: "",
    isActive: "active",
    type: "new",
    serialNo: 1,
  };
  componentDidMount = async () => {
    await this.categoryList();
  };
  categoryList = async () => {
    await this.props.categoryListApi();
    this.setState({ categoryList: this.props.categoryList });
  };
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };
  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
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
    this.setState({ openModal: true, type: type });
    if (type === "edit") {
      this.setState({
        categoryName: data.categoryName,
        categoryToken: data.categoryToken,
        isActive: data.isActive ? "active" : "notActive",
        serialNo: data.serialNo,
      });
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
          } else {
            toastr.warning(createCategory.data.message);
          }
        } else {
          toastr.error(createCategory.data.message);
        }
      }
      // this.props.setLoader(false);
      this.setState({
        categoryName: "",
        openModal: false,
        categoryToken: "",
        type: "new",
        isActive: "active",
        serialNo: 1,
      });
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
          } else {
            toastr.warning(updateCategory.data.message);
          }
        } else {
          toastr.error(updateCategory.data.message);
        }
      }
      // this.props.setLoader(false);
      this.setState({
        categoryName: "",
        openModal: false,
        categoryToken: "",
        type: "new",
        isActive: "active",
        serialNo: 1,
      });
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
      categoryList,
      categoryName,
      type,
      openModal,
      isActive,
      serialNo,
    } = this.state;
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
        <Card elevation={6} className="px-24 py-20 h-100">
          <div className="flex flex-middle flex-space-between">
            <div className="card-title">Category Infromation</div>
            <Button
              className="capitalize text-white bg-circle-primary"
              onClick={() => this.setModel("new")}
            >
              Add Category
            </Button>
          </div>
          <div className="w-100 overflow-auto">
            <Table style={{ whiteSpace: "pre" }}>
              <TableHead>
                <TableRow>
                  <TableCell className="px-0">No</TableCell>
                  <TableCell className="px-0">Category Name</TableCell>
                  <TableCell className="px-0">Serial No</TableCell>
                  <TableCell className="px-0">Active/Not Active</TableCell>
                  <TableCell className="px-0">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((category, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-0 capitalize" align="left">
                        {index + 1}
                      </TableCell>
                      <TableCell className="px-0 capitalize" align="left">
                        {category.categoryName}
                      </TableCell>
                      <TableCell className="px-0 capitalize" align="left">
                        <small className="border-radius-4 bg-secondary text-white px-8 py-2 ">
                          {category.serialNo}
                        </small>
                      </TableCell>
                      <TableCell className="px-0 capitalize" align="left">
                        {category.isActive ? (
                          <small className="border-radius-4 bg-primary text-white px-8 py-2 ">
                            Active
                          </small>
                        ) : (
                          <small className="border-radius-4 bg-error text-white px-8 py-2 ">
                            Not Active
                          </small>
                        )}
                      </TableCell>
                      <TableCell className="px-0">
                        <IconButton>
                          <Icon
                            color="primary"
                            onClick={() => this.setModel("edit", category)}
                          >
                            edit
                          </Icon>
                        </IconButton>
                        <IconButton>
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
                "aria-label": "Previous Page",
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page",
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </div>
        </Card>
        <div>
          <ConfirmationDialog
            open={this.state.deleteModal}
            title="Delete Confirmation"
            message={"R you sure want to delete this category?"}
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
                    value={serialNo}
                    onChange={this.handleChange}
                    variant="outlined"
                  />
                </FormControl>
                <div style={{ marginTop : "25px"}}>
                <TextValidator
                  className="mb-16 w-300"
                  label="Category"
                  onChange={this.handleChange}
                  type="text"
                  name="categoryName"
                  value={categoryName}
                  validators={["required", "minStringLength: 2"]}
                  errorMessages={["this field is required"]}
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

const mapStateToProps = (state) => {
  const { categoryList } = state.category;
  return {
    categoryList,
  };
};

export default connect(mapStateToProps, { categoryListApi })(category);
