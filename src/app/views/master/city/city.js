import React, { Component } from "react";
import { Breadcrumb } from "../../../../components/matx/index";

import { cityListApi ,deleteCityApi, addCityApi, updateCityApi, stateListApi} from "../../../../redux/actions/index";
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
import { status } from '../../../../utility/config';
import { toastr } from 'react-redux-toastr';

class city extends Component{
  state = {
    cityList: [],
    stateList: [],
    rowsPerPage : 5,
    page : 0,
    deleteModal : false,
    deleteCityToken : null,
    openModal: false,
    cityName: "",
    cityToken: "",
    type: "new",
    stateName : "",
    stateToken: ""
  };
  componentDidMount = async () => {
    await this.getCityList();
    await this.getStateList();
  };
  getCityList = async () => {
    await this.props.cityListApi();
    this.setState({ cityList : this.props.cityList})
  };
  getStateList = async () => {
    await this.props.stateListApi();
    this.setState({ stateList: this.props.stateList });
  };
     handleChangePage = (event, newPage) => {
      this.setState({ page : newPage})
    };  
     handleChangeRowsPerPage = event => {
       this.setState({ rowsPerPage : event.target.value})
    };

    
    //to delete City
  deleteCityClicked = async (token) => {
    if (token) {
      this.setState({ deleteCityToken: token });
    }
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  };

  yesDeleteClicked = async () => {
    //call delete Api
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteCityToken: null,
    });
    // this.props.setLoader(true);
    const deleteCity = await deleteCityApi(this.state.deleteCityToken);
    if (deleteCity && deleteCity.data.code === status.success) {
      await this.getCityList();
      toastr.success(deleteCity.data.message);
    } else {
      toastr.error(deleteCity.data.message);
    }
    // this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteCityToken: null,
    });
  };
  // for open a modal
  setModel = (type, data) => {
    this.setState({ openModal: true, type: type });
    if (type === "edit") {
      this.setState({
        stateName: data.stateName,
        stateToken: data.stateToken,
        cityName : data.cityName,
        cityToken : data.cityToken
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
      cityName: "",
      cityToken : ""
    });
  };
  AddCity = async () => {
    const { type, cityName , stateToken} = this.state;
    if (type === "new") {
      if(!stateToken){
        toastr.error("State name is required");
        return;
      }
      if (!cityName) {
        toastr.error("City name is required");
        return;
      }
      // this.props.setLoader(true);
      // this.setState({
      //   addOrg: false,
      // });
      let data = {
        cityName: cityName,
        stateToken : stateToken
      };
      const createCity = await addCityApi(data);
      if (createCity) {
        if (createCity.status === status.success) {
          if (createCity.data.code === status.success) {
            toastr.success(createCity.data.message);
            this.getCityList();
          } else {
            toastr.warning(createCity.data.message);
          }
        } else {
          toastr.error(createCity.data.message);
        }
      }
      // this.props.setLoader(false);
      this.setState({
        stateName: "",
        openModal: false,
        stateToken: "",
        type: "new",
        cityName: "",
        cityToken :""
      });
    }
  };
  UpdateCity = async () => {
    const { type, cityName, cityToken, stateToken } = this.state;
    if (type === "edit") {
      if (!stateToken) {
        toastr.error("State name is required");
        return;
      }
      // this.props.setLoader(true);
      // this.setState({
      //   addOrg: false,
      // });
      let data = {
        cityName: cityName,
        stateToken: stateToken,
        cityToken : cityToken
      };
      const updateCity = await updateCityApi(data);
      if (updateCity) {
        if (updateCity.status === status.success) {
          if (updateCity.data.code === status.success) {
            toastr.success(updateCity.data.message);
            this.getCityList();
          } else {
            toastr.warning(updateCity.data.message);
          }
        } else {
          toastr.error(updateCity.data.message);
        }
      }
      // this.props.setLoader(false);
      this.setState({
        stateName: "",
        openModal: false,
        stateToken: "",
        type: "new",
        cityName: "",
        cityToken :""
      });
    }
  };
  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChangeState = (stateData) => {
    this.setState({ stateName : stateData.stateName, stateToken : stateData.stateToken})
  }

  render(){
    const { page , rowsPerPage , cityList,openModal,
      cityName,
      type,
      stateList,
      stateName} = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Master", path: "/master/country" },
              { name: "City" },
            ]}
          />
        </div>
        <div className="py-12" />
        <Card elevation={6} className="px-24 py-20 h-100">
          <div className="flex flex-middle flex-space-between">
            <div className="card-title">City Infromation</div>
            <Button
              className="capitalize text-white bg-circle-primary"
              onClick={() => this.setModel("new")}
            >
              Add City
            </Button>
          </div>
        <div className="w-100 overflow-auto">
      <Table style={{ whiteSpace: "pre" }}>
        <TableHead>
          <TableRow>
            <TableCell className="px-0">No</TableCell>
            <TableCell className="px-0">State Name</TableCell>
            <TableCell className="px-0">City Name</TableCell>
            <TableCell className="px-0">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cityList  ?
            cityList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map
            ((city, index) => (
              <TableRow key={index}>
                <TableCell className="px-0 capitalize" align="left">
                  {index + 1}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {city.stateName}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {city.cityName}
                </TableCell>
                <TableCell className="px-0">
                  <IconButton>
                    <Icon color="primary" onClick={() => this.setModel("edit", city)}>edit</Icon>
                  </IconButton>
                  <IconButton>                   
                    <Icon color="error"  onClick={() => this.deleteCityClicked(city.cityToken)}>delete</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            )) : <div>No City Added there!</div>}
        </TableBody>
      </Table>

      <TablePagination
        className="px-16"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={cityList.length}
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
    </Card>
        <div>
          <ConfirmationDialog
            open={this.state.deleteModal}
            title = "Delete Confirmation"
            message = {"R you sure want to delete this city?"}
            toggle={this.deleteCityClicked}
            onYesClick={() => this.yesDeleteClicked(this.state.deleteCityToken)}
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
              {type === "new" ? "Add a New City" : "Edit city"}
            </DialogTitle>
            <DialogContent>
              <ValidatorForm
                ref="form"
                onSubmit={type === "new" ? this.AddCity : this.UpdateCity}
                onError={(errors) => null}
              >
                <FormControl style={{ width: "-webkit-fill-available"}} error={stateName === ""} variant="outlined" >
                  <InputLabel htmlFor="grouped-select" id="state">State</InputLabel>
                  <Select name="stateName" labelId="state" value={stateName} label="State">
                  {stateList.map((state, index) => {
                        return (
                          <MenuItem value={state.stateName} key={index}
                          onClick={() =>this.handleChangeState(state)}>
                            {state.stateName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                </FormControl>
                <div style={{marginTop : "25px"}}>
                <TextValidator
                  className="mb-16"
                  label="City Name"
                  onChange={this.handleChange}
                  type="text"
                  name="cityName"
                  value={cityName}
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
  const { cityList } = state.city;
  const { stateList } = state.state;
  return {
    cityList,
    stateList
  };
};

export default connect(mapStateToProps, { cityListApi , stateListApi })(city);
