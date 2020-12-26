import React, { Component } from "react";
import { Breadcrumb, SimpleCard } from "../../../../components/matx/index";

import { cityListApi } from "../../../../redux/actions/index";
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


class city extends Component{
  state = {
    cityList: [],
    rowsPerPage : 5,
    page : 0
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
                  {index}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {city.title}
                </TableCell>
                <TableCell className="px-0">
                  <IconButton>
                    <Icon color="primary">edit</Icon>
                  </IconButton>
                  <IconButton>                   
                    <Icon color="error">delete</Icon>
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
