import {
    getStateList,getStateListByCountry
  } from "../index";
  import { api } from '../../../api/api';

  export const stateListApi = () => {
    return async (dispatch) => {
      await api('state/getAll', {}, 'get')
        .then((res) => {
          dispatch(getStateList(res.data.data));
        })
        .catch((error) => {
          console.log(error)
          // toastr.error('Can not able to get lesson list');
        });
    };
  };
  
  export const deleteStateApi = async (id) => {
    const deleteState = await api(`state/deleteState?stateToken=${id}`, {}, 'delete');
    if (deleteState) {
      return deleteState;
    }
  };
  export const addStateApi = async (data) => {
    const createState = await api(
      "state/addState",
      data,
      "post"
    );
    if (createState) {
      return createState;
    }
  };
  
  export const updateStateApi = async (data) => {
    const updateState = await api(
      `state/updateState`,
      data,
      "put"
    );
    if (updateState) {
      return updateState;
    }
  };
  export const getStateByCountryApi = (country) => {
    return async (dispatch) => {
      await api(`state/getByCountry?countryToken=${country}`,{},
      "get")
        .then((res) => {
          dispatch(getStateListByCountry(res.data.data));
        })
        .catch((error) => {
          console.log(error)
          // toastr.error('Can not able to get lesson list');
        });
    };
  };