import { getCountryList } from "../index";
import { api } from "../../../api/api";
import { toastr } from "react-redux-toastr";
import qs from "qs";

export const countryListApi = () => {
  return async (dispatch) => {
    await api("country/getAllCountry", {}, "get")
      .then((res) => {
        dispatch(getCountryList(res.data.data));
      })
      .catch((error) => {
        console.log(error);
        // toastr.error('Can not able to get lesson list');
      });
  };
};

export const deleteCountryApi = async (id) => {
  const deleteCountry = await api(
    `country/deleteCountry?countryToken=${id}`,
    {},
    "delete"
  );
  if (deleteCountry) {
    return deleteCountry;
  }
};
export const addCountryApi = async (data) => {
  const createCountry = await api(
    "country/addCountry",
    data,
    "post"
  );
  if (createCountry) {
    return createCountry;
  }
};

export const updateCountryApi = async (data) => {
  const updateCountry = await api(
    `country/updateCountry`,
    data,
    "put"
  );
  if (updateCountry) {
    return updateCountry;
  }
};