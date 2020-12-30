import {
    getCityList,
  } from "../index";
  import { api } from '../../../api/api';

  export const cityListApi = () => {
    return async (dispatch) => {
      await api('city/getAllCity', {}, 'get')
        .then((res) => {
          dispatch(getCityList(res.data.data));
        })
        .catch((error) => {
          console.log(error)
          // toastr.error('Can not able to get City list');
        });
    };
  };
  export const deleteCityApi = async (id) => {
    const deleteCity = await api(`city/deleteCity?cityToken=${id}`, {}, 'delete');
    if (deleteCity) {
      return deleteCity;
    }
  };
 