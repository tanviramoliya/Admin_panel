import React, { Component } from "react";
import { Breadcrumb } from "../../../../components/matx/index";

import { newsTypeListApi, deleteNewsTypeApi, addNewsTypeApi, updateNewsTypeApi } from "../../../../redux/actions/index";
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
  Radio
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { status } from '../../../../utility/config';
import { toastr } from 'react-redux-toastr';

class newsType extends Component{
  state = {
    newsTypeList: [],
    rowsPerPage : 5,
    page : 0,
    deleteModal : false,
    deleteNewsTypeToken : null,
    openModal: false,
    newsTypeName: "",
    newsTypeToken: "",
    isActive : "active",
    type: "new",
  };
  componentDidMount = async () => {
    await this.newsTypeList();
  };
  newsTypeList = async () => {
    await this.props.newsTypeListApi();
    this.setState({ newsTypeList : this.props.newsTypeList})
  };
     handleChangePage = (event, newPage) => {
      this.setState({ page : newPage})
    };  
     handleChangeRowsPerPage = event => {
       this.setState({ rowsPerPage : event.target.value})
    };

    //to delete NewsType
  deleteNewsTypeClicked = async (token) => {
    if (token) {
      this.setState({ deleteNewsTypeToken: token });
    }
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  };

  yesDeleteClicked = async () => {
    //call delete Api
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteNewsTypeToken: null,
    });
    // this.props.setLoader(true);
    const deleteNewsType = await deleteNewsTypeApi(this.state.deleteNewsTypeToken);
    if (deleteNewsType && deleteNewsType.data.code === status.success) {
      await this.newsTypeList();
      toastr.success(deleteNewsType.data.message);
    } else {
      toastr.error(deleteNewsType.data.message);
    }
    // this.props.setLoader(false);
  };

  noDeleteClicked = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteNewsTypeToken: null,
    });
  };
  // for open a modal
  setModel = (type, data) => {
    this.setState({ openModal: true, type: type });
    if (type === "edit") {
      this.setState({
        newsTypeName: data.newsTypeName,
        newsTypeToken: data.newsTypeToken,
        isActive : data.isActive ? 'active' : 'notActive'
      });
    }
  };
  //for close a modal
  handleClose = () => {
    this.setState({
      openModal: false,
      newsTypeName: "",
      type: "new",
      newsTypeToken: "",
      isActive : "active"
    });
  };
  AddNewsType = async () => {
    const { type, newsTypeName ,isActive} = this.state;
    if (type === "new") {
      if (!newsTypeName) {
        toastr.error("News type is required");
        return;
      }
      // this.props.setLoader(true);
      // this.setState({
      //   addOrg: false,
      // });
      let data = {
        newsTypeName: newsTypeName,
        isActive : isActive === 'active' ? true : false
      };
      const createNewsType = await addNewsTypeApi(data);
      if (createNewsType) {
        if (createNewsType.status === status.success) {
          if (createNewsType.data.code === status.success) {
            toastr.success(createNewsType.data.message);
            this.newsTypeList();
          } else {
            toastr.warning(createNewsType.data.message);
          }
        } else {
          toastr.error(createNewsType.data.message);
        }
      }
      // this.props.setLoader(false);
      this.setState({
        newsTypeName: "",
        openModal: false,
        newsTypeToken: "",
        type: "new",
        isActive : "active"
      });
    }
  };
  UpdateNewsType = async () => {
    const { type, newsTypeName, newsTypeToken,isActive } = this.state;
    if (type === "edit") {
      if (!newsTypeName) {
        toastr.error("News Type is required");
        return;
      }
      // this.props.setLoader(true);
      // this.setState({
      //   addOrg: false,
      // });
      let data = {
        newsTypeName: newsTypeName,
        newsTypeToken: newsTypeToken,
        isActive : isActive === 'active' ? true : false
      };
      const updateNewsType = await updateNewsTypeApi(data);
      if (updateNewsType) {
        if (updateNewsType.status === status.success) {
          if (updateNewsType.data.code === status.success) {
            toastr.success(updateNewsType.data.message);
            this.newsTypeList();
          } else {
            toastr.warning(updateNewsType.data.message);
          }
        } else {
          toastr.error(updateNewsType.data.message);
        }
      }
      // this.props.setLoader(false);
      this.setState({
        newsTypeName: "",
        openModal: false,
        newsTypeToken: "",
        type: "new",
        isActive : "active"
      });
    }
  };
  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };
  render(){
    const { page , rowsPerPage , newsTypeList, newsTypeName, type, openModal, isActive} = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Master", path: "/country" },
              { name: "NEWS Type" },
            ]}
          />
        </div>
        <div className="py-12" />
        <Card elevation={6} className="px-24 py-20 h-100">
          <div className="flex flex-middle flex-space-between">
            <div className="card-title">News Type Infromation</div>
            <Button
              className="capitalize text-white bg-circle-primary"
              onClick={() => this.setModel("new")}
            >
              Add News type
            </Button>
          </div>
        <div className="w-100 overflow-auto">
      <Table style={{ whiteSpace: "pre" }}>
        <TableHead>
          <TableRow>
          <TableCell className="px-0">No</TableCell>
            <TableCell className="px-0">NEWS Type</TableCell>
            <TableCell className="px-0">Active/Not Active</TableCell>
            <TableCell className="px-0">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newsTypeList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map
            ((newsType, index) => (
              <TableRow key={index}>
                <TableCell className="px-0 capitalize" align="left">
                  {index + 1}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {newsType.newsTypeName}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                {newsType.isActive ?
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
                    <Icon color="primary" onClick={() => this.setModel("edit", newsType)}>edit</Icon>
                  </IconButton>
                  <IconButton>                   
                    <Icon color="error" onClick={() => this.deleteNewsTypeClicked(newsType.newsTypeToken)}>delete</Icon>
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
        count={newsTypeList.length}
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
            message = {"R you sure want to delete this News Type?"}
            toggle={this.deleteNewsTypeClicked}
            onYesClick={() => this.yesDeleteClicked(this.state.deleteNewsTypeToken)}
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
              {type === "new" ? "Add a New News Type" : "Edit News Type"}
            </DialogTitle>
            <DialogContent>
              <ValidatorForm
                ref="form"
                onSubmit={type === "new" ? this.AddNewsType : this.UpdateNewsType}
                onError={(errors) => null}
              >
                <TextValidator
                  variant="outlined"
                  className="mb-16"
                  label="News Type"
                  onChange={this.handleChange}
                  type="text"
                  name="newsTypeName"
                  value={newsTypeName}
                  validators={["required", "minStringLength: 2"]}
                  errorMessages={["this field is required"]}
                  style={{width: "-webkit-fill-available"}}
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
  const { newsTypeList } = state.newsType;
  return {
    newsTypeList
  };
};

export default connect(mapStateToProps, { newsTypeListApi })(newsType);
