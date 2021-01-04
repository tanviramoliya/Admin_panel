import React, { Component } from "react";
import { Breadcrumb } from "../../../../components/matx/index";

import {
  stateListApi,
  deleteStateApi,
  addStateApi,
  updateStateApi,
  countryListApi,
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
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { status } from "../../../../utility/config";
import { toastr } from "react-redux-toastr";

class state extends Component {
  state = {
    stateList: [],
    countryList: [],
    rowsPerPage: 5,
    page: 0,
    deleteModal: false,
    deleteStateToken: null,
    openModal: false,
    stateName: "",
    stateToken: "",
    type: "new",
    countryName : "",
    countryToken: ""
  };
  componentDidMount = async () => {
    await this.getStateList();
    await this.getCountryList();
  };
  getStateList = async () => {
    await this.props.stateListApi();
    this.setState({ stateList: this.props.stateList });
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
    if (deleteState && deleteState.data.code === status.success) {
      await this.getStateList();
      toastr.success(deleteState.data.message);
    } else {
      toastr.error(deleteState.data.message);
    }
    // this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteStateToken: null,
    });
  };
  // for open a modal
  setModel = (type, data) => {
    this.setState({ openModal: true, type: type });
    if (type === "edit") {
      this.setState({
        stateName: data.stateName,
        stateToken: data.stateToken,
        countryName : data.countryName,
        countryToken : data.countryToken
      });
    }
  };
  //for close a modal
  handleClose = () => {
    this.setState({
      openModal: false,
      stateName: "",
      type: "new",
      stateToken: "",
      countryName: "",
      countryToken : ""
    });
  };
  AddState = async () => {
    const { type, stateName , countryToken} = this.state;
    if (type === "new") {
      if(!countryToken){
        toastr.error("Country name is required");
        return;
      }
      if (!stateName) {
        toastr.error("State name is required");
        return;
      }
      // this.props.setLoader(true);
      // this.setState({
      //   addOrg: false,
      // });
      let data = {
        stateName: stateName,
        countryToken : countryToken
      };
      const createState = await addStateApi(data);
      if (createState) {
        if (createState.status === status.success) {
          if (createState.data.code === status.success) {
            toastr.success(createState.data.message);
            this.getStateList();
          } else {
            toastr.warning(createState.data.message);
          }
        } else {
          toastr.error(createState.data.message);
        }
      }
      // this.props.setLoader(false);
      this.setState({
        countryName: "",
        openModal: false,
        countryToken: "",
        type: "new",
        stateName: "",
        stateToken :""
      });
    }
  };
  UpdateState = async () => {
    const { type, stateName, stateToken, countryToken } = this.state;
    if (type === "edit") {
      if (!countryToken) {
        toastr.error("Country name is required");
        return;
      }
      // this.props.setLoader(true);
      // this.setState({
      //   addOrg: false,
      // });
      let data = {
        stateName: stateName,
        countryToken: countryToken,
        stateToken : stateToken
      };
      const updateState = await updateStateApi(data);
      if (updateState) {
        if (updateState.status === status.success) {
          if (updateState.data.code === status.success) {
            toastr.success(updateState.data.message);
            this.getStateList();
          } else {
            toastr.warning(updateState.data.message);
          }
        } else {
          toastr.error(updateState.data.message);
        }
      }
      // this.props.setLoader(false);
      this.setState({
        countryName: "",
        openModal: false,
        countryToken: "",
        type: "new",
        stateToken: "",
        stateName :""
      });
    }
  };
  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.name, event.target.value);
  };
  handleChangeCountry = (countryData) => {
    this.setState({ countryName : countryData.countryName, countryToken : countryData.countryToken})
  }
  render() {
    const {
      page,
      rowsPerPage,
      stateList,
      openModal,
      stateName,
      type,
      countryList,
      countryName
    } = this.state;
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
        <Card elevation={6} className="px-24 py-20 h-100">
          <div className="flex flex-middle flex-space-between">
            <div className="card-title">State Infromation</div>
            <Button
              className="capitalize text-white bg-circle-primary"
              onClick={() => this.setModel("new")}
            >
              Add State
            </Button>
          </div>
          <div className="w-100 overflow-auto">
            <Table style={{ whiteSpace: "pre" }}>
              <TableHead>
                <TableRow>
                  <TableCell className="px-0">No</TableCell>
                  <TableCell className="px-0">Country Name</TableCell>
                  <TableCell className="px-0">State Name</TableCell>
                  <TableCell className="px-0">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stateList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((state, index) => (
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
                          <Icon
                            color="primary"
                            onClick={() => this.setModel("edit", state)}
                          >
                            edit
                          </Icon>
                        </IconButton>
                        <IconButton>
                          <Icon
                            color="error"
                            onClick={() =>
                              this.deleteStateClicked(state.stateToken)
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
              count={stateList.length}
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
            message={"Make sure related cities also be deleted?"}
            toggle={this.deleteStateClicked}
            onYesClick={() =>
              this.yesDeleteClicked(this.state.deleteStateToken)
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
              {type === "new" ? "Add a New State" : "Edit State"}
            </DialogTitle>
            <DialogContent>
              <ValidatorForm
                ref="form"
                onSubmit={type === "new" ? this.AddState : this.UpdateState}
                onError={(errors) => null}
              >
                <FormControl style={{ width: "-webkit-fill-available"}} error={countryName === ""} variant="outlined">
                  <InputLabel htmlFor="grouped-select" id="country">Country</InputLabel>
                  <Select name="countryName" labelId="country" value={countryName} label="Country">
                  {countryList.map((country, index) => {
                        return (
                          <MenuItem value={country.countryName} key={index}
                          onClick={() =>this.handleChangeCountry(country)}>
                            {country.countryName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                </FormControl>
                <div style={{marginTop : "25px"}}>
                <TextValidator
                className="mb-16"
                  label="State Name"
                  onChange={this.handleChange}
                  type="text"
                  name="stateName"
                  value={stateName}
                  validators={["required", "minStringLength: 2"]}
                  errorMessages={["this field is required"]}
                  style={{width: "-webkit-fill-available"}}
                  variant="outlined"
                />
                </div>
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
  const { stateList, stateName } = state.state;
  const { countryList } = state.country;
  return {
    stateList,
    countryList,
  };
};

export default connect(mapStateToProps, {
  stateListApi,
  addStateApi,
  updateStateApi,
  countryListApi,
})(state);
