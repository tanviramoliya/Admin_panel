import React, { Component } from "react";
import { Breadcrumb, SimpleCard } from "../../../../components/matx/index";

import { countryListApi, deleteCountryApi } from "../../../../redux/actions/index";
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


class country extends Component{
  state = {
    countryList: [],
    rowsPerPage : 5,
    page : 0,
    deleteModal : false,
    deleteCountryId : null
  };
  componentDidMount = async () => {
    await this.getCountryListFunc();
  };
  getCountryListFunc = async () => {
    console.log('IN FUnction..')
    await this.props.countryListApi();
    this.setState({ countryList : this.props.countryList})
  };
     handleChangePage = (event, newPage) => {
      this.setState({ page : newPage})
    };  
     handleChangeRowsPerPage = event => {
       this.setState({ rowsPerPage : event.target.value})
    };
    deleteCountryClicked = () => {
      this.setState({ deleteModal : !this.state.deleteModal , deleteCountryId : null})
    }
  render(){
    const { page , rowsPerPage , countryList} = this.state;
    console.log("C LIST:",countryList)
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Master", path: "/country" },
              { name: "Country" },
            ]}
          />
        </div>
        <div className="py-12" />
        <SimpleCard title="Country Information">
        <div className="w-100 overflow-auto">
      <Table style={{ whiteSpace: "pre" }}>
        <TableHead>
          <TableRow>
          <TableCell className="px-0">ID</TableCell>
            <TableCell className="px-0">Country Name</TableCell>
            <TableCell className="px-0">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countryList
            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map
            ((country, index) => (
              <TableRow key={index}>
                <TableCell className="px-0 capitalize" align="left">
                  {index}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {country.countryName}
                </TableCell>
                <TableCell className="px-0">
                  <IconButton>
                    <Icon color="primary">edit</Icon>
                  </IconButton>
                  <IconButton>                   
                    <Icon color="error" onClick={() => this.setState({deleteModal : true})}>delete</Icon>
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
            onConfirmDialogClose={this.deleteCountryClicked}
            open={this.state.deleteModal}
            title = "Delete Confirmation"
            text = {"R you sure want to delete this country?"}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { countryList } = state.country;
  console.log(" C lISt in props",countryList);
  return {
    countryList
  };
};

export default connect(mapStateToProps, { countryListApi })(country);
