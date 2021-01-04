import React, { Component } from "react";
import { Breadcrumb } from "../../../../components/matx/index";

import {
  countryListApi,
  deleteCountryApi,
  addCountryApi,
  updateCountryApi,
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
  DialogActions
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { status } from "../../../../utility/config";
import { toastr } from "react-redux-toastr";

class country extends Component {
  state = {
    countryList: [],
    rowsPerPage: 5,
    page: 0,
    deleteModal: false,
    deleteCountryToken: null,
    openModal: false,
    countryName: "",
    countryToken: "",
    type: "new",
  };
  componentDidMount = async () => {
    await this.getCountryList();
  };
  getCountryList = async () => {
    await this.props.countryListApi();
    this.setState({ countryList: this.props.countryList });
  };
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };
  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  //to delete Country
  deleteCountryClicked = async (token) => {
    if (token) {
      this.setState({ deleteCountryToken: token });
    }
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  };

  yesDeleteClicked = async () => {
    //call delete Api
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteCountryToken: null,
    });
    // this.props.setLoader(true);
    const deleteCountry = await deleteCountryApi(this.state.deleteCountryToken);
    if (deleteCountry && deleteCountry.data.code === status.success) {
      await this.getCountryList();
      toastr.success(deleteCountry.data.message);
    } else {
      toastr.error(deleteCountry.data.message);
    }
    // this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteCountryToken: null,
    });
  };
  // for open a modal
  setModel = (type, data) => {
    this.setState({ openModal: true, type: type });
    if (type === "edit") {
      this.setState({
        countryName: data.countryName,
        countryToken: data.countryToken,
      });
    }
  };
  //for close a modal
  handleClose = () => {
    this.setState({
      openModal: false,
      countryName: "",
      type: "new",
      countryToken: "",
    });
  };
  AddCountry = async () => {
    const { type, countryName } = this.state;
    if (type === "new") {
      if (!countryName) {
        toastr.error("Country name is required");
        return;
      }
      // this.props.setLoader(true);
      // this.setState({
      //   addOrg: false,
      // });
      let data = {
        countryName: countryName,
      };
      const createCountry = await addCountryApi(data);
      if (createCountry) {
        if (createCountry.status === status.success) {
          if (createCountry.data.code === status.success) {
            toastr.success(createCountry.data.message);
            this.getCountryList();
          } else {
            toastr.warning(createCountry.data.message);
          }
        } else {
          toastr.error(createCountry.data.message);
        }
      }
      // this.props.setLoader(false);
      this.setState({
        countryName: "",
        openModal: false,
        countryToken: "",
        type: "new",
      });
    }
  };
  UpdateCountry = async () => {
    const { type, countryName, countryToken } = this.state;
    if (type === "edit") {
      if (!countryName) {
        toastr.error("Country name is required");
        return;
      }
      // this.props.setLoader(true);
      // this.setState({
      //   addOrg: false,
      // });
      let data = {
        countryName: countryName,
        countryToken: countryToken,
      };
      const updateCountry = await updateCountryApi(data);
      if (updateCountry) {
        if (updateCountry.status === status.success) {
          if (updateCountry.data.code === status.success) {
            toastr.success(updateCountry.data.message);
            this.getCountryList();
          } else {
            toastr.warning(updateCountry.data.message);
          }
        } else {
          toastr.error(updateCountry.data.message);
        }
      }
      // this.props.setLoader(false);
      this.setState({
        countryName: "",
        openModal: false,
        countryToken: "",
        type: "new",
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
      countryList,
      openModal,
      countryName,
      type,
    } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Country" }]} />
        </div>
        <div className="py-12" />
        <Card elevation={6} className="px-24 py-20 h-100">
          <div className="flex flex-middle flex-space-between">
            <div className="card-title">Country Infromation</div>
            <Button
              className="capitalize text-white bg-circle-primary"
              onClick={() => this.setModel("new")}
            >
              Add Country
            </Button>
          </div>
          <div className="w-100 overflow-auto">
            <Table style={{ whiteSpace: "pre" }}>
              <TableHead>
                <TableRow>
                  <TableCell className="px-0">No</TableCell>
                  <TableCell className="px-0">Country Name</TableCell>
                  <TableCell className="px-0">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countryList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((country, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-0 capitalize" align="left">
                        {index + 1}
                      </TableCell>
                      <TableCell className="px-0 capitalize" align="left">
                        {country.countryName}
                      </TableCell>
                      <TableCell className="px-0">
                        <IconButton>
                          <Icon
                            color="primary"
                            onClick={() => this.setModel("edit", country)}
                          >
                            edit
                          </Icon>
                        </IconButton>
                        <IconButton>
                          <Icon
                            color="error"
                            onClick={() =>
                              this.deleteCountryClicked(country.countryToken)
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
              count={countryList.length}
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
            message={"Make sure related states & cities also be deleted?"}
            toggle={this.deleteCountryClicked}
            onYesClick={() =>
              this.yesDeleteClicked(this.state.deleteCountryToken)
            }
            onNoClick={this.noDeleteClicked}
          />
        </div>
        <div>
          <Dialog
            open={openModal}
            //  onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth={true}
          >
            <DialogTitle id="form-dialog-title">
              {type === "new" ? "Add a New Country" : "Edit Country"}
            </DialogTitle>
            <DialogContent>
              <ValidatorForm
                ref="form"
                onSubmit={type === "new" ? this.AddCountry : this.UpdateCountry}
                onError={(errors) => null}
              >
                <TextValidator
                  className="mb-16"
                  label="Country Name"
                  onChange={this.handleChange}
                  type="text"
                  name="countryName"
                  value={countryName}
                  validators={["required", "minStringLength: 2"]}
                  errorMessages={["this field is required"]}
                  style={{width: "-webkit-fill-available"}}
                  variant="outlined"
                />
                <DialogActions>
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
  const { countryList, countryName } = state.country;
  return {
    countryList,
    countryName,
  };
};

export default connect(mapStateToProps, { countryListApi, addCountryApi })(
  country
);
