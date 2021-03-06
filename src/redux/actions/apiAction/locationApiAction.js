import { getCountryList,getStateList,getCityList } from "../index";
import { api } from "../../../api/api";


export const countryListApi = () => {
  return async (dispatch) => {
    await api("location/country/getAll", {}, "get")
      .then((res) => {
        dispatch(getCountryList(res.data.data));
      })
      .catch((error) => {
        console.log(error);
        // toastr.error('Can not able to get lesson list');
      });
  };
};
export const stateListApi = (value) => {
  return async (dispatch) => {
    await api(  `location/state/getByCountry?country=${value}`, {}, 'get')
      .then((res) => {
        dispatch(getStateList(res.data.data));
      })
      .catch((error) => {
        console.log(error)
        // toastr.error('Can not able to get lesson list');
      });
  };
};
export const cityListApi = (value) => {
  return async (dispatch) => {
    await api(  `location/city/getByState?state=${value}`, {}, 'get')
      .then((res) => {
        dispatch(getCityList(res.data.data));
      })
      .catch((error) => {
        console.log(error)
        // toastr.error('Can not able to get lesson list');
      });
  };
};


