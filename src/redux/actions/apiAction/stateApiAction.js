import {
    getStateList,
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
 