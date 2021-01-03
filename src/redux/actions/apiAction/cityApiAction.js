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
  export const addCityApi = async (data) => {
    const createCity = await api(
      "city/addCity",
      data,
      "post"
    );
    if (createCity) {
      return createCity;
    }
  };
  
  export const updateCityApi = async (data) => {
    const updateCity = await api(
      `city/updateCity`,
      data,
      "put"
    );
    if (updateCity) {
      return updateCity;
    }
  };
 