export const GET_COUNTRY_LIST = "GET_COUNTRY_LIST";
export const GET_COUNTRY = "GET_COUNTRY";
export const ADD_COUNTRY = "ADD_COUNTRY";
export const DELETE_COUNTRY = "DELETE_COUNTRY";
export const UPDATE_COUNTRY = "UPDATE_COUNTRY";

export const getCountryList = (value) => {
  return {
    type: GET_COUNTRY_LIST,
    payload: value,
  };
};
