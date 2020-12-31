import React, { Component } from "react";
import { Breadcrumb, SimpleCard } from "../../../../components/matx/index";

import { cityListApi ,deleteCityApi} from "../../../../redux/actions/index";
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
import { toastr } from 'react-redux-toastr';

class city extends Component{
  state = {
    cityList: [],
    rowsPerPage : 5,
    page : 0,
    deleteModal : false,
    deleteCityToken : null
  };
  componentDidMount = async () => {
    await this.getCityList();
  };
  getCityList = async () => {
    await this.props.cityListApi();
    this.setState({ cityList : this.props.cityList})
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

  render(){
    const { page , rowsPerPage , cityList} = this.state;
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
        <SimpleCard title="City Information">
        <div className="w-100 overflow-auto">
      <Table style={{ whiteSpace: "pre" }}>
        <TableHead>
          <TableRow>
            <TableCell className="px-0">ID</TableCell>
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
                    <Icon color="primary">edit</Icon>
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
        </SimpleCard>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { cityList } = state.city;
  return {
    cityList
  };
};

export default connect(mapStateToProps, { cityListApi })(city);
