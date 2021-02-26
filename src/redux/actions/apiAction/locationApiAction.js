import { getCountryList } from "../index";
import { api } from "../../../api/api";
import { toastr } from "react-redux-toastr";
import qs from "qs";

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


