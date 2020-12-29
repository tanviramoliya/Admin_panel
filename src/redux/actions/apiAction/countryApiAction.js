import {
    getCountryList,
  } from "../index";
  import { api } from '../../../api/api';

  export const countryListApi = () => {
    return async (dispatch) => {
      await api('country/getAllCountry', {}, 'get')
        .then((res) => {
          dispatch(getCountryList(res.data.data));
        })
        .catch((error) => {
          console.log(error)
          // toastr.error('Can not able to get lesson list');
        });
    };
  };
  
  export const deleteCountryApi = async (id) => {
    const deleteCountry = await api(`country/deleteCountry?countryToken=${id}`, {}, 'delete');
    if (deleteCountry) {
      return deleteCountry;
    }
  };