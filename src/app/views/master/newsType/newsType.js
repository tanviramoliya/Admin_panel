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
  Radio,
  TableContainer,
  TextField,
  InputAdornment,
  TableSortLabel
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import ConfirmationDialog from "components/matx/ConfirmationDialog";
import { status } from '../../../../utility/config';
import { toastr } from 'react-redux-toastr';
import { Search } from "@material-ui/icons";
import SimpleReactValidator from "simple-react-validator";

class newsType extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }
  state = {
    newsTypeList: [],
    count: "",
    sortingField: "createdDate",
    sortingOrder: "asc",
    keyword: "",
    rowsPerPage: 10,
    page: 0,
    deleteModal: false,
    deleteNewsTypeToken: null,
    openModal: false,
    newsTypeName: "",
    newsTypeToken: "",
    isActive: "active",
    type: "new",
  };
  componentDidMount = async () => {
    await this.newsTypeList();
  };
  newsTypeList = async () => {
    const { rowsPerPage, page, sortingField, sortingOrder, keyword } = this.state;
    let data = {
      keyword: keyword,
      pageSize: rowsPerPage,
      pageNo: page,
      field: sortingField,
      order: sortingOrder
    }
    await this.props.newsTypeListApi(data);
    this.setState({ newsTypeList: this.props.newsTypeList.result, count: this.props.newsTypeList.count })
  };

  handleSearchKeyword = async (event) => {
    await this.setState({ keyword: event.target.value });
    this.newsTypeList();
  }
  handleSortingOrder = async (fieldName, order) => {

    await this.setState({ sortingField: fieldName, sortingOrder: order === 'asc' ? 'desc' : 'asc' });
    this.newsTypeList();

  }
  handleChangePage = async (event, newPage) => {
    await this.setState({ page: newPage });
    this.newsTypeList();
  };
  handleChangeRowsPerPage = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    this.newsTypeList();
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
        isActive: data.isActive ? 'active' : 'notActive'
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
      isActive: "active"
    });
    this.validator.hideMessageFor("newsTypeName");

  };
  AddNewsType = async () => {
    const { type, newsTypeName, isActive } = this.state;
    if (type === "new") {
      if (
        this.validator.allValid()

      ) {
        let data = {
          newsTypeName: newsTypeName,
          isActive: isActive === 'active' ? true : false
        };
        const createNewsType = await addNewsTypeApi(data);
        if (createNewsType) {
          if (createNewsType.status === status.success) {
            if (createNewsType.data.code === status.success) {
              toastr.success(createNewsType.data.message);
              this.newsTypeList();
              this.setState({
                newsTypeName: "",
                openModal: false,
                newsTypeToken: "",
                type: "new",
                isActive: "active"
              });
              this.validator.hideMessageFor("newsTypeName");

            } else {
              toastr.warning(createNewsType.data.message);
            }
          } else {
            toastr.error(createNewsType.data.message);
          }
        }
        // this.props.setLoader(false);

      }
      else {
        this.validator.showMessages();
      }
    }
  };
  UpdateNewsType = async () => {
    const { type, newsTypeName, newsTypeToken, isActive } = this.state;
    if (type === "edit") {
      if (
        this.validator.allValid()

      ) {
        let data = {
          newsTypeName: newsTypeName,
          newsTypeToken: newsTypeToken,
          isActive: isActive === 'active' ? true : false
        };
        const updateNewsType = await updateNewsTypeApi(data);
        if (updateNewsType) {
          if (updateNewsType.status === status.success) {
            if (updateNewsType.data.code === status.success) {
              toastr.success(updateNewsType.data.message);
              this.newsTypeList();
              this.setState({
                newsTypeName: "",
                openModal: false,
                newsTypeToken: "",
                type: "new",
                isActive: "active"
              });
              this.validator.hideMessageFor("newsTypeName");

            } else {
              toastr.warning(updateNewsType.data.message);
            }
          } else {
            toastr.error(updateNewsType.data.message);
          }
        }
        // this.props.setLoader(false);

      }
    }
    else {
      this.validator.showMessages();
    }
  };
  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { page,
      rowsPerPage,
      sortingOrder,
      keyword,
      sortingField, count, newsTypeList, newsTypeName, type, openModal, isActive } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Master", path: "master/newsType" },
              { name: "NEWS Type" },
            ]}
          />
        </div>
        <div className="py-12" >
          <Card elevation={6} className="px-24 pt-12 h-100">
            <div className="flex flex-middle flex-space-between pb-12">
              <div className="card-title">News Type Infromation</div>
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
                  Add News type
            </Button>
              </div>
            </div>

            <TableContainer style={{ maxHeight: "465px" }}>
              <Table style={{ whiteSpace: "pre" }} stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0 py-8">Sr.No</TableCell>
                    <TableCell className="px-0 py-8">
                      <TableSortLabel
                        active={sortingField === 'newsTypeName'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("newsTypeName", sortingOrder)}
                      >
                        NEWS Type
                      </TableSortLabel></TableCell>
                    <TableCell className="px-0 py-8">
                      <TableSortLabel
                        active={sortingField === 'isActive'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("isActive", sortingOrder)}
                      >
                        Active/Not Active
                      </TableSortLabel></TableCell>
                    <TableCell className="px-0 py-8">
                      <TableSortLabel
                        active={sortingField === 'createdDate'}
                        direction={sortingOrder}
                        onClick={() => this.handleSortingOrder("createdDate", sortingOrder)}
                      >
                        Created Date
                      </TableSortLabel></TableCell>
                    <TableCell className="px-0 py-8">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newsTypeList && newsTypeList !== [] ? newsTypeList
                    //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(
                      (newsType, index) => (
                        <TableRow key={index}>
                          <TableCell className="p-0">
                            {page * rowsPerPage + index + 1}

                          </TableCell>
                          <TableCell className="p-0">
                            {newsType.newsTypeName}
                          </TableCell>
                          <TableCell className="p-0" >
                            {newsType.isActive ?
                              (<small className="border-radius-4 bg-primary text-white px-8 py-2 ">
                                Active
              </small>) :
                              (<small className="border-radius-4 bg-error text-white px-8 py-2 ">
                                Not Active
                </small>)
                            }
                          </TableCell>
                          <TableCell className="p-0">
                            {newsType.createdDate}
                          </TableCell>
                          <TableCell className="p-0">
                            <IconButton className="p-8">
                              <Icon color="primary" onClick={() => this.setModel("edit", newsType)}>edit</Icon>
                            </IconButton>
                            <IconButton className="p-8">
                              <Icon color="error" onClick={() => this.deleteNewsTypeClicked(newsType.newsTypeToken)}>delete</Icon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )) : <h1>
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
                "aria-label": "Previous Page"
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page"
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
            message={"are you sure want to delete this News Type?"}
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
                <TextField
                  className="mb-16 w-100"
                  label="News Type"
                  onChange={this.handleChange}
                  type="text"
                  name="newsTypeName"
                  value={newsTypeName}
                  placeholder="Enter News Type"
                  variant="outlined"

                  error={this.validator.message(
                    "newsTypeName",
                    newsTypeName,
                    "required"
                  )}
                  helperText={this.validator.message(
                    "newsTypeName",
                    newsTypeName,
                    "required"
                  )}
                  onBlur={() => this.validator.showMessageFor("newsTypeName")}
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
